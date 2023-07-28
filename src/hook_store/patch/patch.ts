import { useEffect, useRef, useState } from "react";
import type { ExtendedRequestOptions, ResponseData } from "@hook/_request";
import executeRequest from "@hook/_request/_request";

const usePatch = (url: string, config: ExtendedRequestOptions = {}) => {
  const [res, setRes] = useState<ResponseData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState<Error | null>(null);
  const { debounce = 0 } = config;
  const reqId = useRef<any>();
  useEffect(() => {
    const patch = async () => {
      try {
        const res = await executeRequest({ ...config, url, method: "PATCH" });
        setIsLoading(false);
        setRes(res);
      } catch (err: any) {
        setIsLoading(false);
        setErr(err);
        throw err;
      }
    };

    if (!debounce) {
      patch();
    } else {
      if (reqId.current) clearTimeout(reqId.current);
      reqId.current = setTimeout(patch, debounce);
    }

    return () => {
      if (reqId.current) clearTimeout(reqId.current);
    };
  }, [url]);

  return {
    res,
    isLoading,
    err,
  };
};
export default usePatch;
