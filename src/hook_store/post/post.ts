import type { ExtendedRequestOptions, ResponseData } from "@hook/_request";
import executeRequest from "@hook/_request/_request";
import { useEffect, useRef, useState } from "react";

const usePost = (url: string, config: ExtendedRequestOptions = {}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState<Error | null>(null);
  const [res, setRes] = useState<ResponseData | null>(null);
  const { debounce = 0 } = config;
  const reqId = useRef<any>();

  useEffect(() => {
    const post = async () => {
      try {
        const res = await executeRequest({ ...config, url, method: "POST" });
        setRes(res);
        setIsLoading(false);
      } catch (err: any) {
        setErr(err);
        setIsLoading(false);
      }
    };

    if (!debounce) {
      post();
    } else {
      if (reqId.current) clearTimeout(reqId.current);
      reqId.current = setTimeout(post, debounce);
    }

    return () => {
      if (reqId.current) clearTimeout(reqId.current);
    };
  }, [url]);

  return {
    err,
    isLoading,
    res,
  };
};
export default usePost;
