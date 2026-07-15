import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITIO, PRODUCTOS, urlAbsoluta } from '../lib/sitio.ts';

// llms.txt — estándar emergente que describe el sitio para los modelos de IA
// (qué es, de qué trata y sus mejores páginas), para facilitar que lo citen.
export const GET: APIRoute = async () => {
  const posts = (await getCollection('blog', ({ data }) => !data.draft && data.pubDate.valueOf() <= Date.now()))
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  const lines = [
    `# ${SITIO.nombre}`,
    '',
    `> ${SITIO.descripcion}`,
    '',
    `${SITIO.nombre} es un sitio en español sobre ${SITIO.nicho}, con guías prácticas paso a paso.`,
    '',
    '## Guías',
    ...posts.slice(0, 40).map((p) => `- [${p.data.title}](${urlAbsoluta('/blog/' + p.id)}): ${p.data.description}`),
    '',
    '## Recomendaciones',
    ...PRODUCTOS.map((p) => `- ${p.nombre}: ${p.descripcion_corta}`),
    '',
    '## Más',
    `- [Sobre nosotros](${urlAbsoluta('/sobre-nosotros')})`,
    `- [Contacto](${urlAbsoluta('/contacto')})`,
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
