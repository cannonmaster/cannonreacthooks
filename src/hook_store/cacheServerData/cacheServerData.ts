import { useEffect, useRef, useState } from "react";
const useCacheServerData = () => {
  // const [cache, setCache] = useState<Cache | null>(null);
  const cache = useRef<Cache | null>(null);
  let timeoutId: ReturnType<typeof setTimeout>;
  let ricId: ReturnType<typeof requestIdleCallback>;
  useEffect(() => {
    // if ("caches" in window) {
    //   const setup = async () => {
    //     const c = await caches.open("cannon-reacthooks-data");
    //     cache.current = c;
    //     // setCache(c);
    //   };

    //   setup();
    // }
    return () => {
      cache.current = null;
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      if (ricId) {
        cancelIdleCallback(ricId);
      }
    };
  }, []);

  const getCache = async () => {
    if ("caches" in window) {
      if (!cache.current) {
        const c = await caches.open("cannon-reacthooks-data");
        cache.current = c;
      }
      return cache.current;
    }
    return null;
  };

  const addToCache = async (request: RequestInfo, data: any) => {
    const cache = await getCache();
    if (!cache) return;
    try {
      await cache.put(request, new Response(JSON.stringify(data)));
    } catch (e) {
      console.error("Error adding reponse to cache: ", e);
    }
  };
  const getFromCache = async <T>(
    request: RequestInfo
  ): Promise<T | null | undefined> => {
    const cache = await getCache();
    if (!cache) return;
    try {
      const res = await cache?.match(request);

      if (res) {
        if ("requestIdleCallback" in window) {
          ricId = requestIdleCallback(
            () => {
              invalidateCache(request);
            },
            { timeout: 3000 }
          );
        } else {
          timeoutId = setTimeout(() => {
            invalidateCache(request);
          }, 3000);
        }
        // console.log(res.json());

        return (await res?.clone().json()) || null;
      } else {
        const data = await invalidateCache<T>(request);
        return data;
      }
    } catch (e) {
      console.error("err retrieving response from cache", e);
      return null;
    }
  };
  const deleteFromCache = async (request: RequestInfo) => {
    const cache = await getCache();
    if (!cache) return;
    try {
      await cache.delete(request);
    } catch (e) {
      console.error("err retrieving response from cache", e);
    }
  };
  const invalidateCache = async <T>(request: RequestInfo) => {
    try {
      const response = await fetch(request);
      addToCache(request, await response.clone().json());
      const data = await response.clone().json();
      return data;
    } catch (e) {
      console.error("err fetching data from the server", e);
      return null;
    }
  };
  return {
    addToCache,
    getFromCache,
    deleteFromCache,
    invalidateCache,
  };
};

export default useCacheServerData;
