import { useEffect, useRef } from "react";

const useCacaheServerImage = () => {
  const localCache = useRef<Cache | null>(null);
  const timeoutId = useRef<any>(null);
  const ricId = useRef<ReturnType<typeof requestIdleCallback> | null>(null);
  useEffect(() => {
    return () => {
      localCache.current = null;
      if (ricId.current !== null) {
        ricId.current = null;
      }
      if (timeoutId.current !== null) {
        timeoutId.current = null;
      }
    };
  }, []);
  const deleteFromCache = async (url: string) => {
    const cache = await getCache();
    if (!cache) return;
    try {
      await localCache.current?.delete(url);
    } catch (e) {
      console.error("delete cache failed", e);
    }
  };

  const getFromCache = async (
    url: string
  ): Promise<Blob | null | undefined> => {
    const cache = await getCache();
    if (!cache) return;
    try {
      const image = await localCache.current?.match(url);
      if (image === undefined) {
        const image = await invalidateCache(url);
        return image;
      } else {
        if ("requestIdleCallback" in window) {
          ricId.current = requestIdleCallback(
            () => {
              invalidateCache(url);
            },
            { timeout: 5000 }
          );
        } else {
          timeoutId.current = setTimeout(() => {
            invalidateCache(url);
          }, 5000);
        }
        return await image.blob();
      }
    } catch (e) {
      console.error("cacahe the image failed", e);
      return Promise.reject(e);
    }
  };

  const invalidateCache = async (url: string) => {
    const cache = await getCache();
    if (!cache) return;
    try {
      const res = await fetch(url);
      const image = await res.blob();
      addToCache(url, image);
      return image;
    } catch (e) {
      console.error("err fetching data from server", e);
    }
  };

  const addToCache = async (url: string, image: Blob) => {
    const cache = await getCache();
    if (!cache) return;
    try {
      localCache.current?.put(url, new Response(image));
    } catch (e) {
      console.error("add to cache failed", e);
    }
  };
  const getCache = async () => {
    if ("caches" in window) {
      if (!localCache.current) {
        try {
          localCache.current = await caches.open("cannon-reacthooks-image");
          return localCache.current;
        } catch (e) {
          console.error("cache connection failed", e);
        }
      }
      return localCache.current;
    }
    return null;
  };
  return {
    invalidateCache,
    deleteFromCache,
    getFromCache,
    addToCache,
  };
};
export default useCacaheServerImage;
