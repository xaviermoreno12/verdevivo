import type { APIRoute } from 'astro';
import { urlAbsoluta } from '../lib/sitio.ts';

export const GET: APIRoute = () => {
  const body = [
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${urlAbsoluta('/sitemap-index.xml')}`,
    '',
  ].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain' } });
};
