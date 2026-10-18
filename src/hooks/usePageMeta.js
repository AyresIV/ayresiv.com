import { useEffect } from 'react';
import SEO, { SITE_URL } from '../data/seo';

// Sets the tab title, meta description and canonical URL for a page while it's
// mounted (src/data/seo.js is the single source; the build bakes the same tags
// into each route's HTML).
export default function usePageMeta(path) {
  useEffect(() => {
    const { title, description } = SEO[path];
    const desc = document.querySelector('meta[name="description"]');
    const canonical = document.querySelector('link[rel="canonical"]');
    const previous = { title: document.title, desc: desc?.content, href: canonical?.href };

    document.title = title;
    if (desc) desc.content = description;
    if (canonical) canonical.href = SITE_URL + (path === '/' ? '/' : `${path}/`);

    return () => {
      document.title = previous.title;
      if (desc) desc.content = previous.desc;
      if (canonical) canonical.href = previous.href;
    };
  }, [path]);
}
