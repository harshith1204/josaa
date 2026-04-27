'use client';
import DOMPurify from 'isomorphic-dompurify';

const SAFE_CONFIG = {
  ALLOWED_TAGS: ['table','tr','td','th','thead','tbody','div','span','p','strong','b','em','i','br','hr','ul','ol','li','h1','h2','h3','h4','a'],
  ALLOWED_ATTR: ['style','class','colspan','rowspan','href','target'],
  FORBID_TAGS: ['script','iframe','object','embed','form','input'],
  FORBID_ATTR: ['onerror','onclick','onload','onmouseover'],
};

export function sanitizeHTML(html) {
  if (!html) return '';
  return DOMPurify.sanitize(html, SAFE_CONFIG);
}
