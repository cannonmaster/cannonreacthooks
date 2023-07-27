import type { ResponseData } from "@hook/_request/_request";
import { useRef } from "react";
type HttpHeaders = Record<string, string>;

type BeforeInterceptor = (config: any) => any;
type AfterInterceptor = (response: any) => any;

type CacheData = {
  data: ResponseData;
  expiresAt: number;
};

type RequestConfig = {
  defaultHeaders: HttpHeaders;
  baseUrl: string;
  beforeInterceptors: Set<BeforeInterceptor>;
  cacheSize: number;
  cacheTime: number;
  afterInterceptors: Set<AfterInterceptor>;
  cache: Map<string, CacheData>;
};
type RequestConfigKey = keyof RequestConfig;
const requestConfigContainer: Map<RequestConfigKey, any> = new Map();
requestConfigContainer.set("defaultHeaders", {});
requestConfigContainer.set("baseUrl", "");
requestConfigContainer.set("beforeInterceptors", new Set());
requestConfigContainer.set("cacheSize", 0);
requestConfigContainer.set("cacheTime", 0);
requestConfigContainer.set("afterInterceptors", new Set());
requestConfigContainer.set("cache", new Map());
const requestConfig = () => {
  const config = requestConfigContainer;

  const updateDefaultHeaders = (newHeaders: Record<string, string>) => {
    const headers = config.get("defaultHeaders");
    config.set("defaultHeaders", { ...headers, ...newHeaders });
  };
  const clearDefaultHeaders = () => {
    config.set("defaultHeaders", {});
  };

  const getDefaultHeaders = () => {
    return config.get("defaultHeaders");
  };

  const updateBaseUrl = (baseUrl: string) => {
    config.set("baseUrl", baseUrl);
  };

  const beforeInterceptors = (interceptors: ((config: any) => void)[]) => {
    const beforeInterceptors = config.get("beforeInterceptors");
    for (const interceptor of interceptors) {
      beforeInterceptors.add(interceptor);
    }
  };
  const ejectInterceptors = (interceptor: (config: any) => void) => {
    const beforeInterceptors = config.get("beforeInterceptors");
    beforeInterceptors.delete(interceptor);
  };

  const afterInterceptors = (interceptors: ((responseData: any) => void)[]) => {
    const afterInterceptors = config.get("afterInterceptors");
    for (const interceptor of interceptors) {
      afterInterceptors.add(interceptor);
    }
  };

  const baseUrl = () => {
    return config.get("baseUrl");
  };

  const getConfig = (key: RequestConfigKey) => {
    return config.get(key) ?? undefined;
  };

  const updateRequestCache = (
    url: string,
    res: { data: ResponseData; expiresAt: number }
  ) => {
    config.get("cache").set(url, res);
  };

  const getCurrentCacheSize = () => {
    return config.get("cache").size();
  };

  const getRequestCache = (url: string) => {
    return config.get("cache").get(url);
  };

  const deleteRequestCache = (url: string) => {
    config.get("cache").delete(url);
  };

  const cacheSize = (size: number) => {
    config.set("cacheSize", size);
  };

  const getMaxCacheSize = () => {
    return config.get("cacheSize");
  };

  const updateCacheTime = (time: number) => {
    config.set("cacheTime", time);
  };

  const getCacheTime = () => {
    return config.get("cacheTime");
  };

  const getOldestEntry = () => {
    let oldestExpiration = Infinity;
    let oldestEntry;
    const cachedRequest: Map<string, CacheData> = config.get("cache");
    for (const [url, data] of cachedRequest) {
      if (data.expiresAt < oldestExpiration) {
        oldestExpiration = data.expiresAt;
        oldestEntry = url;
      }
    }
    return oldestEntry;
  };

  return {
    updateCacheTime,
    baseUrl,
    getOldestEntry,
    getCurrentCacheSize,
    updateRequestCache,
    getRequestCache,
    getCacheTime,
    updateDefaultHeaders,
    clearDefaultHeaders,
    updateBaseUrl,
    beforeInterceptors,
    ejectInterceptors,
    afterInterceptors,
    deleteRequestCache,
    cacheSize,
    getMaxCacheSize,
    getDefaultHeaders,
    getConfig,
    requestConfig,
  };
};

export default requestConfig;
