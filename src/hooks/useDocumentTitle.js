import { useEffect } from 'react';

// Sets the document (browser tab) title for the lifetime of the component.
export default function useDocumentTitle(title) {
  useEffect(() => {
    const previous = document.title;
    document.title = title;
    return () => {
      document.title = previous;
    };
  }, [title]);
}
