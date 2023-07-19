import { useRef, useEffect, useState } from "react";
const useIntersectionObserver = (
  threshold = 1,
  root = null,
  rootMargin = "0%"
) => {
  const ref = useRef<HTMLDivElement>(null);
  const [entry, setEntry] = useState<IntersectionObserverEntry | undefined>(
    undefined
  );

  useEffect(() => {
    const options = {
      threshold,
      root,
      rootMargin,
    };
    const observer = new IntersectionObserver((entries) => {
      setEntry(entries[0]);
    }, options);
    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold, root, rootMargin]);

  return [ref, entry];
};

export default useIntersectionObserver;
