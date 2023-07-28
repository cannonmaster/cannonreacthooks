import type { ExtendedRequestOptions, ResponseData } from "@hook/_request";
import executeRequest from "@hook/_request/_request";
import { useEffect, useRef, useState } from "react";
useState;

const useStreaming = (url: string, config: ExtendedRequestOptions) => {
  const [isLoading, setIsLoading] = useState(true);
  const [res, setRes] = useState<ResponseData | null>(null);
  const [err, setErr] = useState<Error | null>(null);
  const { debounce = 0 } = config;
  const reqId = useRef<any>();
  useEffect(() => {
    const streaming = async () => {
      try {
        const res = await executeRequest({ ...config, url, method: "GET" });
        setIsLoading(false);
        setRes(res);
      } catch (err: any) {
        setIsLoading(false);
        setErr(err);
      }
    };
    if (!debounce) {
      streaming();
    } else {
      if (reqId.current) clearTimeout(reqId.current);
      reqId.current = setTimeout(streaming, debounce);
    }

    return () => {
      if (reqId.current) clearTimeout(reqId.current);
    };
  }, [url]);

  return {
    err,
    res,
    isLoading,
  };
};
export default useStreaming;
