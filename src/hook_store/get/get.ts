import executeRequest from "@hook/_request";
import type { ResponseData, ExtendedRequestOptions } from "@hook/_request";
import { useEffect, useRef, useState } from "react";
const useGet = (url: string, config: ExtendedRequestOptions = {}) => {
  const [res, setRes] = useState<ResponseData | null>(null);
  const cache = useRef<Map<string, any>>(new Map());
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState<Error | null>(null);
  const { debounce = 0 } = config;
  const reqId = useRef<any>();

  useEffect(() => {
    const get = async () => {
      if (cache.current.get(url)) {
        setRes(cache.current.get(url));
        setIsLoading(false);
        return;
      }
      try {
        const res = await executeRequest({ ...config, url, method: "GET" });
        cache.current.set(url, res);
        setRes(res);
        setIsLoading(false);
      } catch (err: any) {
        setIsLoading(false);
        setErr(err);
        throw err;
      }
    };
    // get();
    if (!debounce) {
      get();
    } else {
      if (reqId.current) clearTimeout(reqId.current);
      reqId.current = setTimeout(get, debounce);
    }

    return () => {
      if (reqId.current) clearTimeout(reqId.current);
    };
  });
  return {
    res,
    isLoading,
    err,
  };
};
export type { ResponseData, ExtendedRequestOptions };
export default useGet;
