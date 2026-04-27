const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Max-Age': '86400',
};

// All colleges in the system
const ALL_COLLEGES = [
  'IIIT Gwalior','IIIT Kancheepuram','IIIT Manipur','IIITDM Jabalpur',
  'IIT Bhilai','IIT Bhubaneswar','IIT Dhanbad','IIT Gandhinagar','IIT Guwahati',
  'IIT Hyderabad','IIT Indore','IIT Kanpur','IIT Kharagpur','IIT Madras','IIT Mandi','IIT Palakkad','IIT Patna',
  'MNIT Jaipur','NIT Agartala','NIT Andhra Pradesh','NIT Bhopal','NIT Calicut',
  'NIT Durgapur','NIT Goa','NIT Hamirpur','NIT Jalandhar','NIT Jamshedpur',
  'NIT Kurukshetra','NIT Manipur','NIT Nagaland','NIT Patna',
  'NIT Puducherry','NIT Rourkela','NIT Sikkim','NIT Silchar','NIT Srinagar',
  'NIT Surathkal','NIT Warangal','VNIT Nagpur'
];

// Colleges that have campus photos/videos
const COLLEGES_WITH_MEDIA = ['IIIT Gwalior', 'NIT Nagaland', 'IIT Kharagpur'];

async function embedQuery(ai, query) {
  const result = await ai.run('@cf/baai/bge-m3', { text: [query] });
  return result.data[0];
}

async function vectorSearch(vectorize, queryVector, college, topK = 20) {
  const results = await vectorize.query(queryVector, {
    topK: 100, // fetch up to 100 to ensure college-filtered results exist
    returnMetadata: 'all',
  });
  return (results.matches || []).filter(m => m.metadata?.college === college).slice(0, topK);
}

async function rerank(ai, query, chunks, topK = 8) {
  if (chunks.length === 0) return [];
  try {
    const result = await ai.run('@cf/baai/bge-reranker-base', {
      query,
      contexts: chunks.map(c => ({ text: c.text })),
      top_k: topK,
    });
    const ranked = (result.response || result).map(r => ({
      ...chunks[r.id],
      rerank_score: 1 / (1 + Math.exp(-r.score)),
    }));
    ranked.sort((a, b) => b.rerank_score - a.rerank_score);
    return ranked;
  } catch (e) {
    console.error('Reranker error:', e.message);
    return chunks.slice(0, topK);
  }
}

async function generateAnswer(ai, query, rankedChunks, college) {
  if (rankedChunks.length === 0) {
    return {
      answer: `We don't have specific information about that for ${college} yet. Our team is still collecting data from current students!`,
      method: 'no_data',
    };
  }

  if (rankedChunks[0].rerank_score > 0.95) {
    const extracted = rankedChunks
      .filter(c => c.rerank_score > 0.6)
      .slice(0, 5)
      .map(c => '\u2022 ' + c.text)
      .join('\n');
    return { answer: extracted, method: 'direct_extraction' };
  }

  const context = rankedChunks.map(c => c.text).join('\n\n');
  const response = await ai.run('@cf/google/gemma-3-12b-it', {
    messages: [
      {
        role: 'system',
        content: `You are a helpful assistant on cutoffs.ai that answers questions about ${college} based on real data collected from current students. Answer ONLY using the CONTEXT below.

RULES:
1. Use ONLY facts from CONTEXT. NEVER use your own knowledge.
2. If CONTEXT doesn't have the answer: "We don't have that information yet. Our team is still collecting data from students!"
3. NEVER invent facts. Use exact names, numbers, timings from CONTEXT.
4. Be conversational and helpful. Use short paragraphs.
5. Use bullet points only when listing multiple items (hostels, sports, clubs etc).
6. For greetings like "hi", "hello" — give a brief overview of what info you have about the college.
7. Don't mention "context" or "sources". Don't say "welcome" as if you represent the college.
8. Refer to the college in third person (e.g. "${college} has..." not "We have...").
9. NEVER start with "Hi! I have information about..." or similar preamble. Jump straight into the answer.

CONTEXT:
${context}`
      },
      { role: 'user', content: query }
    ],
    temperature: 0,
    max_tokens: 512,
  });
  return { answer: response.response, method: 'llm_generation' };
}

async function seedEmbeddings(env, college = null) {
  let query;
  if (college) {
    query = env.DB.prepare("SELECT id, college, section, chunk_text FROM knowledge_chunks WHERE college = ?").bind(college);
  } else {
    query = env.DB.prepare("SELECT id, college, section, chunk_text FROM knowledge_chunks");
  }
  const { results } = await query.all();
  if (!results?.length) return { error: 'No chunks found', count: 0 };

  let inserted = 0;
  for (let i = 0; i < results.length; i += 20) {
    const batch = results.slice(i, i + 20);
    const texts = batch.map(r => r.chunk_text);
    const embedResult = await env.AI.run('@cf/baai/bge-m3', { text: texts });
    const vectors = batch.map((chunk, j) => ({
      id: chunk.id.toString(),
      values: embedResult.data[j],
      metadata: {
        section: chunk.section,
        text: chunk.chunk_text,
        college: chunk.college,
      },
    }));
    await env.VECTORIZE.upsert(vectors);
    inserted += vectors.length;
  }
  return { success: true, count: inserted };
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    if (request.method === 'POST' && (url.pathname === '/chat' || url.pathname === '/')) {
      try {
        const body = await request.json();
        const question = body.question;
        const college = body.college || 'IIT Kharagpur';

        if (!question) {
          return new Response(JSON.stringify({ error: 'question required' }), {
            status: 400, headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
          });
        }

        let chunks = [];
        try {
          const queryVector = await embedQuery(env.AI, question);
          const vectorResults = await vectorSearch(env.VECTORIZE, queryVector, college, 20);
          chunks = vectorResults.map(r => ({
            id: r.id, text: r.metadata?.text || '', section: r.metadata?.section || '', vector_score: r.score,
          })).filter(c => c.text);
        } catch (e) {
          console.error('Vector search failed:', e.message);
        }

        if (chunks.length === 0) {
          const stopWords = ['what','whats','the','is','are','how','much','does','do','can','show','me','like','tell','about','there','any','have','has','this','that','it','a','an','in','on','at','to','for','of','and','or','my','your','i','we','they','please','get','give'];
          // Stem common plurals/variants for better matching
          const stemWord = w => w.replace(/ies$/,'y').replace(/ies$/,'y').replace(/hostels/,'hostel').replace(/halls/,'hall').replace(/rooms/,'room').replace(/clubs/,'club').replace(/fests/,'fest').replace(/s$/,'');
          const words = question.toLowerCase().split(/\s+/)
            .filter(w => w.length > 2 && !stopWords.includes(w))
            .map(stemWord)
            .filter((w, i, arr) => arr.indexOf(w) === i); // dedupe
          if (words.length === 0) words.push(question.toLowerCase().trim());
          const likeClause = words.map(w => `LOWER(chunk_text) LIKE '%${w}%'`).join(' OR ');
          const { results: d1Results } = await env.DB.prepare(
            `SELECT id, section, chunk_text FROM knowledge_chunks WHERE college = ? AND (${likeClause}) LIMIT 15`
          ).bind(college).all();
          chunks = (d1Results || []).map(r => ({
            id: r.id.toString(), text: r.chunk_text, section: r.section, vector_score: 0.5,
          }));
        }

        const qLower = question.toLowerCase();
        const sectionTriggers = {
          'fee_structure': ['fee','fees','tuition','cost','semester fee','hostel fee','how much'],
          'canteen': ['canteen','cafeteria','night canteen','tuck shop'],
          'mess': ['mess','breakfast','lunch','dinner','food','menu','schedule','meal'],
          'wifi': ['wifi','internet','connectivity','lan'],
          'laundry': ['laundry','washing','dhobi','clothes'],
          'attendance': ['attendance','proxy','bunk'],
          'transport': ['transport','reach','airport','railway','station','bus','cab','how to get','directions'],
          'gym': ['gym','workout','fitness','weights'],
          'hostels_boys': ['hostel','hostels','hall of residence','accommodation','room','dorm','dormitory','pg','paying guest','halls','room allotment'],
          'placements': ['placement','salary','ctc','package','recruiter','company','hire','job','lpa','internship','ppo'],
          'academics': ['department','cse','ece','eee','mechanical','civil','chemical','semester','cgpa','grade','exam','professor','faculty'],
          'sports': ['sport','cricket','football','badminton','tennis','basketball','volleyball','swimming','ground','court'],
          'clubs': ['club','society','fest','tech fest','cultural','nss','ncc'],
          'campus': ['campus','gate','entrance','auditorium','library','infrastructure','building'],
        };

        let sectionOverride = null;
        for (const [section, triggers] of Object.entries(sectionTriggers)) {
          if (triggers.some(t => qLower.includes(t))) {
            try {
              const { results: directChunks } = await env.DB.prepare(
                `SELECT id, section, chunk_text FROM knowledge_chunks WHERE college = ? AND section = ? LIMIT 20`
              ).bind(college, section).all();
              if (directChunks && directChunks.length > 0) {
                sectionOverride = section;
                chunks = directChunks.map(r => ({
                  id: r.id.toString(), text: r.chunk_text, section: r.section, vector_score: 0.8,
                }));
                break;
              }
            } catch(e) {}
          }
        }

        let rankedChunks;
        if (sectionOverride) {
          rankedChunks = chunks.slice(0, 8).map(c => ({ ...c, rerank_score: 0.8 }));
        } else {
          rankedChunks = await rerank(env.AI, question, chunks, 8);
        }

        const result = await generateAnswer(env.AI, question, rankedChunks, college);

        // Media matching — only for colleges with media
        const sectionScores = {};
        rankedChunks.forEach(c => {
          sectionScores[c.section] = (sectionScores[c.section] || 0) + (c.rerank_score || 0);
        });
        const sectionKeywords = {
          'academics': ['ece','eee','cse','department','class','lab','library','lecture','building'],
          'gym': ['gym','workout','weight'],
          'mess': ['mess','food','breakfast','lunch','dinner','meal'],
          'sports': ['sport','cricket','football','badminton','tennis','basketball','volleyball','swimming'],
          'hostels_boys': ['hostel','room','hall'],
          'canteen': ['canteen','cafeteria','night canteen'],
          'medical': ['hospital','medical','health'],
          'campus': ['campus','gate','entrance','auditorium'],
        };
        for (const sec of Object.keys(sectionScores)) {
          if (qLower.includes(sec.toLowerCase().replace('_', ' ')) || qLower.includes(sec.toLowerCase())) sectionScores[sec] += 10;
          const keywords = sectionKeywords[sec] || [];
          if (keywords.some(kw => qLower.includes(kw))) sectionScores[sec] += 10;
        }
        const matchedSections = Object.entries(sectionScores).sort((a, b) => b[1] - a[1]).map(e => e[0]);

        let media = [];
        const hasMedia = COLLEGES_WITH_MEDIA.includes(college);
        if (result.method !== 'no_data' && hasMedia && matchedSections.length > 0) {
          // Map query words to caption search terms
          const aliases = {
            gym:['gym','workout','weight','fitness'],
            swimming:['swimming','pool'],cricket:['cricket'],football:['football'],
            badminton:['badminton'],basketball:['basketball'],volleyball:['volleyball'],
            tennis:['tennis'],canteen:['canteen','cafeteria'],hostel:['hostel room','hostel'],
            hostels:['hostel room','hostel'],mess:['mess','food','dining'],hospital:['hospital','medical'],
            library:['library'],ece:['electrical','ece'],eee:['electrical','eee'],
            cse:['computer science','cse'],campus:['campus','gate'],
          };
          const queryWords = qLower.split(/\s+/).filter(w => w.length > 2);
          const captionTerms = [...new Set(queryWords.flatMap(w => aliases[w] || []))];

          // Priority 1: caption match — strict, return max 2
          if (captionTerms.length > 0) {
            const captionClauses = captionTerms.map(() => `LOWER(caption) LIKE ?`).join(' OR ');
            const captionBinds = captionTerms.map(w => `%${w.toLowerCase()}%`);
            try {
              const { results: cMedia } = await env.DB.prepare(
                `SELECT media_type, caption, r2_url, duration_seconds FROM media_assets WHERE college = ? AND (${captionClauses}) ORDER BY RANDOM() LIMIT 2`
              ).bind(college, ...captionBinds).all();
              media = (cMedia || []).map(m => ({ type: m.media_type, caption: m.caption, url: m.r2_url, duration: m.duration_seconds }));
            } catch(e) {}
          }

          // Priority 2: section match — only if no caption match, return max 2
          if (media.length === 0) {
            try {
              const { results: topMedia } = await env.DB.prepare(
                `SELECT media_type, caption, r2_url, duration_seconds FROM media_assets WHERE college = ? AND section = ? ORDER BY RANDOM() LIMIT 2`
              ).bind(college, matchedSections[0]).all();
              media = (topMedia || []).map(m => ({ type: m.media_type, caption: m.caption, url: m.r2_url, duration: m.duration_seconds }));
            } catch(e) {}
          }

          // Top up to 3 only if caption match returned 1 — fetch more from same caption terms
          if (media.length === 1 && captionTerms.length > 0) {
            try {
              const captionClauses2 = captionTerms.map(() => `LOWER(caption) LIKE ?`).join(' OR ');
              const captionBinds2 = captionTerms.map(w => `%${w.toLowerCase()}%`);
              const { results: extraMedia } = await env.DB.prepare(
                `SELECT media_type, caption, r2_url, duration_seconds FROM media_assets WHERE college = ? AND (${captionClauses2}) AND r2_url != ? ORDER BY RANDOM() LIMIT 2`
              ).bind(college, ...captionBinds2, media[0].url).all();
              media = media.concat((extraMedia || []).map(m => ({ type: m.media_type, caption: m.caption, url: m.r2_url, duration: m.duration_seconds })));
            } catch(e) {}
          }
        }

        return new Response(JSON.stringify({
          answer: result.answer, method: result.method, chunks_used: rankedChunks.length,
          top_vector_score: chunks[0]?.vector_score?.toFixed(3),
          top_rerank_score: rankedChunks[0]?.rerank_score?.toFixed(3),
          sections: matchedSections, media, college,
        }), { headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' } });

      } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), {
          status: 500, headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
        });
      }
    }

    if (url.pathname === '/seed') {
      try {
        const college = new URL(request.url).searchParams.get('college');
        const result = await seedEmbeddings(env, college);
        return new Response(JSON.stringify(result), { headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' } });
      } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' } });
      }
    }

    if (url.pathname === '/colleges') {
      const { results } = await env.DB.prepare("SELECT DISTINCT college, COUNT(*) as chunks FROM knowledge_chunks GROUP BY college ORDER BY college").all();
      return new Response(JSON.stringify(results), { headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' } });
    }

    if (request.method === 'GET' && url.pathname === '/') {
      return new Response(getChatHTML(), { headers: { 'Content-Type': 'text/html' } });
    }

    return new Response('Not found', { status: 404 });
  }
};

function getChatHTML() {
  const opts = ALL_COLLEGES.map(c => '<option value="'+c+'">'+c+'</option>').join('');
  return '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>Ask about any College — cutoffs.ai</title><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;background:#0a0a0f;color:#e0e0e0;min-height:100vh;display:flex;flex-direction:column}.header{background:#141420;padding:16px 20px;border-bottom:1px solid #2a2a3e;text-align:center}.header h1{font-size:18px;color:#ff6b35}.header p{font-size:12px;color:#888;margin-top:4px}.cs{margin-top:8px;padding:8px 14px;background:#1a1a2e;color:#e0e0e0;border:1px solid #2a2a3e;border-radius:8px;font-size:13px;width:280px;max-width:90%}.chat{flex:1;overflow-y:auto;padding:16px;max-width:700px;width:100%;margin:0 auto}.msg{margin-bottom:16px;display:flex;gap:10px}.msg.user{justify-content:flex-end}.msg .bubble{max-width:85%;padding:12px 16px;border-radius:16px;font-size:14px;line-height:1.6;white-space:pre-wrap}.msg.user .bubble{background:#ff6b35;color:#fff;border-bottom-right-radius:4px}.msg.bot .bubble{background:#1a1a2e;color:#e0e0e0;border-bottom-left-radius:4px}.msg.bot .avatar{width:32px;height:32px;border-radius:50%;background:#ff6b35;display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0}.input-bar{background:#141420;border-top:1px solid #2a2a3e;padding:12px 16px;display:flex;gap:8px;max-width:700px;width:100%;margin:0 auto}.input-bar input{flex:1;padding:12px 16px;background:#1a1a2e;border:1px solid #2a2a3e;border-radius:24px;color:#e0e0e0;font-size:14px;outline:none}.input-bar input:focus{border-color:#ff6b35}.input-bar button{padding:12px 20px;background:#ff6b35;color:#fff;border:none;border-radius:24px;font-size:14px;font-weight:700;cursor:pointer}.input-bar button:disabled{opacity:.5}.sg{display:flex;flex-wrap:wrap;gap:6px;padding:8px 16px;max-width:700px;margin:0 auto}.sg button{padding:8px 14px;background:#1a1a2e;border:1px solid #2a2a3e;border-radius:20px;color:#888;font-size:12px;cursor:pointer}.sg button:hover{border-color:#ff6b35;color:#ff6b35}.typing{display:none;margin-bottom:16px}.typing .dots{display:inline-flex;gap:4px}.typing .dots span{width:6px;height:6px;background:#ff6b35;border-radius:50%;animation:bounce 1.4s infinite}.typing .dots span:nth-child(2){animation-delay:.2s}.typing .dots span:nth-child(3){animation-delay:.4s}@keyframes bounce{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-8px)}}</style></head><body><div class="header"><h1>🎓 cutoffs.ai — College Guide</h1><p>RAG-powered — Real data from current students across 38+ colleges</p><select class="cs" id="cs" onchange="sw()">'+opts+'</select></div><div class="sg" id="sg"><button onclick="askQ(\'How are hostels for first year?\')">1st Year Hostels</button><button onclick="askQ(\'How is the mess food?\')">Mess Food</button><button onclick="askQ(\'What is the fee structure?\')">Fee Structure</button><button onclick="askQ(\'What sports facilities are there?\')">Sports</button><button onclick="askQ(\'What is the gym like?\')">Gym</button><button onclick="askQ(\'How is the WiFi?\')">WiFi</button><button onclick="askQ(\'What are the fests?\')">Fests</button><button onclick="askQ(\'What clubs are there?\')">Clubs</button><button onclick="askQ(\'How to reach the college?\')">How to Reach</button><button onclick="askQ(\'What places can I visit nearby?\')">Nearby Places</button></div><div class="chat" id="chat"><div class="msg bot"><div class="avatar">🎓</div><div class="bubble">Hey! Select a college above and ask me anything — hostels, mess, fees, campus life, academics, sports, fests, or anything else! Data from real students across 38+ IITs and NITs. 🏛️</div></div></div><div class="msg bot typing" id="typing" style="padding:0 16px;max-width:700px;margin:0 auto"><div class="avatar">🎓</div><div class="bubble"><div class="dots"><span></span><span></span><span></span></div></div></div><div class="input-bar"><input type="text" id="input" placeholder="Ask about hostels, mess, fees, sports, fests..." onkeydown="if(event.key===\'Enter\')send()"><button onclick="send()" id="sendBtn">Ask</button></div><script>const chat=document.getElementById("chat"),input=document.getElementById("input"),typing=document.getElementById("typing"),sendBtn=document.getElementById("sendBtn");let sel=document.getElementById("cs").value;function sw(){sel=document.getElementById("cs").value;chat.innerHTML=\'<div class="msg bot"><div class="avatar">🎓</div><div class="bubble">Switched to \'+sel+\'. Ask me anything!</div></div>\';document.getElementById("sg").style.display="flex"}function askQ(q){input.value=q;send();document.getElementById("sg").style.display="none"}async function send(){const q=input.value.trim();if(!q)return;chat.innerHTML+=\'<div class="msg user"><div class="bubble">\'+esc(q)+"</div></div>";input.value="";sendBtn.disabled=true;typing.style.display="flex";chat.scrollTop=chat.scrollHeight;try{const res=await fetch("/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({question:q,college:sel})});const d=await res.json();typing.style.display="none";let a=d.answer||d.error||"Something went wrong.";a=a.replace(/\\n/g,"<br>").replace(/\\*\\*(.+?)\\*\\*/g,"<strong>$1</strong>");let mh="";if(d.media&&d.media.length>0){const items=d.media.slice(0,4);mh=\'<div style="margin-top:14px;border-radius:12px;overflow:hidden">\';function ri(m,h){if(m.type==="video"){return\'<div class="mi" data-src="\'+m.url+\'" data-type="video" style="position:relative;height:\'+h+\';cursor:pointer;overflow:hidden"><video src="\'+m.url+\'" style="width:100%;height:100%;object-fit:cover;background:#000;pointer-events:none" preload="metadata" playsinline muted></video><div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:40px;height:40px;background:rgba(0,0,0,0.6);border-radius:50%;display:flex;align-items:center;justify-content:center"><div style="width:0;height:0;border-left:14px solid #fff;border-top:8px solid transparent;border-bottom:8px solid transparent;margin-left:3px"></div></div></div>\'}return\'<img class="mi" data-src="\'+m.url+\'" data-type="photo" src="\'+m.url+\'" style="width:100%;height:\'+h+\';object-fit:cover;cursor:pointer;display:block" loading="lazy">\'}if(items.length===1){mh+=ri(items[0],"220px")}else if(items.length===2){mh+=\'<div style="display:grid;grid-template-columns:1fr 1fr;gap:3px">\'+ri(items[0],"180px")+ri(items[1],"180px")+"</div>"}else if(items.length===3){mh+=\'<div style="display:grid;grid-template-columns:1fr 1fr;grid-template-rows:140px 140px;gap:3px"><div style="grid-row:1/3">\'+ri(items[0],"100%")+"</div>"+ri(items[1],"140px")+ri(items[2],"140px")+"</div>"}else{mh+=\'<div style="display:grid;grid-template-columns:1fr 1fr;grid-template-rows:140px 140px;gap:3px">\'+ri(items[0],"140px")+ri(items[1],"140px")+ri(items[2],"140px")+ri(items[3],"140px")+"</div>"}mh+="</div>"}chat.innerHTML+=\'<div class="msg bot"><div class="avatar">🎓</div><div class="bubble">\'+a+mh+"</div></div>"}catch(e){typing.style.display="none";chat.innerHTML+=\'<div class="msg bot"><div class="avatar">🎓</div><div class="bubble">Error. Try again.</div></div>\'}sendBtn.disabled=false;chat.scrollTop=chat.scrollHeight;input.focus()}function esc(t){const d=document.createElement("div");d.textContent=t;return d.innerHTML}function om(src,type){const o=document.createElement("div");o.style.cssText="position:fixed;inset:0;z-index:999;background:rgba(0,0,0,0.95);display:flex;align-items:center;justify-content:center;padding:16px;flex-direction:column";const c=\'<div onclick="event.stopPropagation();this.parentElement.remove()" style="position:absolute;top:12px;right:16px;color:#fff;font-size:32px;cursor:pointer;z-index:1000;width:44px;height:44px;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,0.1);border-radius:50%">&times;</div>\';if(type==="video"){o.innerHTML=c+\'<video src="\'+src+\'" style="max-width:95%;max-height:85vh;border-radius:12px;background:#000" controls autoplay playsinline></video>\'}else{o.innerHTML=c+\'<img src="\'+src+\'" style="max-width:95%;max-height:90vh;border-radius:12px;object-fit:contain">\'}o.onclick=e=>{if(e.target===o)o.remove()};document.body.appendChild(o)}document.addEventListener("click",function(e){const item=e.target.closest(".mi");if(item){om(item.dataset.src,item.dataset.type)}});</script></body></html>';
}
