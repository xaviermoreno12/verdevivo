import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import sitio from './sitio.config.json' with { type: 'json' };

// El sitio y el base salen de sitio.config.json (un archivo por sitio de la fábrica).
// En GitHub Pages de proyecto, `base` = "/nombre-repo".
export default defineConfig({
  site: sitio.sitio.dominio,
  base: sitio.sitio.base || '/',
  trailingSlash: 'ignore',
  integrations: [
    mdx(),
    sitemap(),
  ],
  build: {
    // HTML por directorio → URLs limpias e indexables
    format: 'directory',
  },
});
