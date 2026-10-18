import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import SEO, { SITE_URL } from './src/data/seo.js'

const escape = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

// Fill index.html's <title>, description, canonical and social tags for a route.
function withMeta(html, path) {
  const { title, description } = SEO[path]
  const url = SITE_URL + (path === '/' ? '/' : `${path}/`)
  const t = escape(title)
  const d = escape(description)
  return html
    .replace(/\s*<link rel="canonical"[^>]*>/, '')
    .replace(/<title>[^<]*<\/title>/, `<title>${t}</title>\n  <link rel="canonical" href="${url}">`)
    .replace(/(<meta name="description" content=")[^"]*/, `$1${d}`)
    .replace(/(<meta property="og:url" content=")[^"]*/, `$1${url}`)
    .replace(/(<meta property="og:title" content=")[^"]*/, `$1${t}`)
    .replace(/(<meta property="og:description" content=")[^"]*/, `$1${d}`)
    .replace(/(<meta name="twitter:title" content=")[^"]*/, `$1${t}`)
    .replace(/(<meta name="twitter:description" content=")[^"]*/, `$1${d}`)
}

// Emits dist/<route>/index.html for every page in src/data/seo.js. GitHub Pages
// serves these directly, so deep links and refreshes no longer need the
// 404.html redirect, and crawlers/link previews get page-specific tags.
const routeHtml = () => ({
  name: 'route-html',
  apply: 'build',
  transformIndexHtml: { order: 'post', handler: (html) => withMeta(html, '/') },
  generateBundle: {
    order: 'post', // after Vite has added index.html to the bundle
    handler(_, bundle) {
      const index = bundle['index.html']
      if (!index) return
      for (const path of Object.keys(SEO)) {
        if (path === '/') continue
        this.emitFile({ type: 'asset', fileName: `${path.slice(1)}/index.html`, source: withMeta(String(index.source), path) })
      }
    },
  },
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), routeHtml()],
  base: '/',
})
