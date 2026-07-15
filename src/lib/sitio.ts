import sitioConfig from '../../sitio.config.json';

export const CONFIG = sitioConfig;
export const SITIO = sitioConfig.sitio;
export const MARCA = sitioConfig.marca;
export const PRODUCTOS = sitioConfig.productos;

// Autor del sitio (acepta objeto {nombre,rol,bio} o string legacy).
export const AUTOR = (typeof (SITIO as any).autor === 'string'
  ? { nombre: (SITIO as any).autor as string, rol: '', bio: '' }
  : (SITIO as any).autor) as { nombre: string; rol?: string; bio?: string };

export const PRODUCTO_DESTACADO =
  PRODUCTOS.find((p) => p.destacado) ?? PRODUCTOS[0];

/** Une el `base` del sitio con una ruta relativa, sin dobles barras. */
export function url(path = '/'): string {
  const base = (SITIO.base || '/').replace(/\/$/, '');
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${base}${p}` || '/';
}

/** URL absoluta (para canonical / OG / schema). */
export function urlAbsoluta(path = '/'): string {
  const dominio = (SITIO.dominio || '').replace(/\/$/, '');
  return `${dominio}${url(path)}`;
}
