'use client';

import { useState, useEffect, useRef } from 'react';
import { sanitizeHTML } from '@/lib/sanitize';
import { getRagCollegeName } from '@/lib/rag-colleges';
import { fetchCollegeChatResponse } from '@/lib/college-rag-chat';

export default function CollegeRagChatPanel({ instituteName }) {
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [chatLoading, setChatLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    setChatMessages([]);
    setChatInput('');
  }, [instituteName]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, chatLoading]);

  const handleChat = async (e) => {
    e.preventDefault();
    if (!chatInput.trim() || chatLoading || !instituteName) return;
    const msg = chatInput.trim();
    setChatMessages((prev) => [...prev, { role: 'user', content: msg }]);
    setChatInput('');
    setChatLoading(true);
    try {
      const data = await fetchCollegeChatResponse({ question: msg, instituteName });
      if (data.type === 'rag') {
        setChatMessages((prev) => [
          ...prev,
          { role: 'ai', content: data.answer || 'No response.', media: data.media || [] },
        ]);
      } else {
        const bodyHtml =
          data.html === true
            ? (data.answer || '')
            : typeof data.html === 'string'
              ? data.html
              : '';
        if (bodyHtml) {
          setChatMessages((prev) => [...prev, { role: 'ai', htmlBody: bodyHtml }]);
        } else {
          setChatMessages((prev) => [...prev, { role: 'ai', content: data.answer || 'No response.' }]);
        }
      }
    } catch {
      setChatMessages((prev) => [...prev, { role: 'ai', content: 'Error. Try again.' }]);
    } finally {
      setChatLoading(false);
    }
  };

  const ragName = getRagCollegeName(instituteName);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-1.5">
        {(ragName
          ? ['How are the hostels?', 'How is mess food?', 'What are the fees?', 'How is WiFi?', 'What sports are there?', 'How to reach?']
          : ['Placements?', 'Best branch?', 'Hostel life?', 'Fees?']
        ).map((q) => (
          <button
            key={q}
            type="button"
            onClick={() => setChatInput(q)}
            className="bg-[#1a1a2e] border border-white/10 rounded-full px-3 py-1 text-[11px] text-gray-400 hover:text-white hover:border-purple-500/30 transition-colors"
          >
            {q}
          </button>
        ))}
      </div>

      {ragName ? (
        <div className="flex items-center gap-1.5 text-[10px] text-green-400/80">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          Live data from students at {ragName}
        </div>
      ) : (
        <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
          <span className="w-1.5 h-1.5 rounded-full bg-gray-500" />
          General AI — no student data yet for this college
        </div>
      )}

      <div className="bg-[#13131a] rounded-xl border border-white/5 overflow-hidden">
        {chatMessages.length > 0 && (
          <div className="p-3 space-y-2.5 max-h-[420px] overflow-y-auto">
            {chatMessages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[90%] rounded-2xl px-3 py-2 text-xs ${
                    msg.role === 'user'
                      ? 'bg-blue-600/20 border border-blue-500/20 text-blue-200 rounded-br-md'
                      : 'bg-[#1e1e28] border border-white/5 text-gray-300 rounded-bl-md'
                  }`}
                >
                  {msg.htmlBody ? (
                    <div dangerouslySetInnerHTML={{ __html: sanitizeHTML(msg.htmlBody) }} />
                  ) : (
                    <div
                      style={{ whiteSpace: 'pre-wrap' }}
                      dangerouslySetInnerHTML={{
                        __html: (msg.content || '').replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>'),
                      }}
                    />
                  )}
                  {msg.media && msg.media.length > 0 && (
                    <div
                      className="mt-2 grid gap-1 rounded-xl overflow-hidden"
                      style={{ gridTemplateColumns: msg.media.length === 1 ? '1fr' : '1fr 1fr' }}
                    >
                      {msg.media.slice(0, 4).map((m, mi) =>
                        m.type === 'video' ? (
                          <video
                            key={mi}
                            src={m.url}
                            className="w-full object-cover rounded-lg"
                            style={{ height: msg.media.length === 1 ? '180px' : '100px' }}
                            controls
                            preload="metadata"
                            playsInline
                            muted
                          />
                        ) : (
                          <img
                            key={mi}
                            src={m.url}
                            alt={m.caption || ''}
                            className="w-full object-cover rounded-lg"
                            style={{ height: msg.media.length === 1 ? '180px' : '100px' }}
                          />
                        )
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {chatLoading && (
              <div className="flex justify-start">
                <div className="bg-[#1e1e28] border border-white/5 rounded-2xl rounded-bl-md px-3 py-2.5">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
        )}

        <form onSubmit={handleChat} className="flex items-center border-t border-white/5">
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder={ragName ? 'Ask about hostel, mess, fees, sports...' : 'Ask anything about this college...'}
            className="flex-1 bg-transparent px-3 py-3 text-xs text-white placeholder-gray-500 outline-none"
          />
          <button type="submit" disabled={chatLoading} className="px-3 py-3 text-blue-400 disabled:opacity-50">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
