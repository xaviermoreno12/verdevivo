import type { APIRoute } from 'astro';
import { urlAbsoluta } from '../lib/sitio.ts';

// Crawlers de IA (búsqueda generativa) permitidos explícitamente, para poder
// aparecer citados en ChatGPT, Perplexity, Google AI Overviews, Claude, etc.
const BOTS_IA = [
  'GPTBot', 'OAI-SearchBot', 'ChatGPT-User',
  'PerplexityBot', 'Perplexity-User',
  'ClaudeBot', 'Claude-Web', 'anthropic-ai',
  'Google-Extended', 'Applebot-Extended', 'Bingbot', 'CCBot',
];

export const GET: APIRoute = () => {
  const lines = ['User-agent: *', 'Allow: /', ''];
  for (const bot of BOTS_IA) {
    lines.push(`User-agent: ${bot}`, 'Allow: /', '');
  }
  lines.push(`Sitemap: ${urlAbsoluta('/sitemap-index.xml')}`, '');
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain' } });
};
