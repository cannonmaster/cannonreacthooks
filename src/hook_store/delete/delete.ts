import type { ExtendedRequestOptions, ResponseData } from "@hook/_request";
import executeRequest from "@hook/_request/_request";
import { useEffect, useRef, useState } from "react";

const useDelete = (url: string, config: ExtendedRequestOptions = {}) => {
  const [isLoading, setIsLoading] = useState(true);

  const [res, setRes] = useState<ResponseData | null>(null);

  const [err, setErr] = useState<Error | null>(null);
  const { debounce = 0 } = config;
  const reqId = useRef<any>();
  useEffect(() => {
    const deleteRes = async () => {
      try {
        const res = await executeRequest({ ...config, url, method: "DELETE" });
        setIsLoading(false);
        setRes(res);
      } catch (err: any) {
        setIsLoading(false);
        setErr(err);
      }
    };
    if (!debounce) {
      deleteRes();
    } else {
      if (reqId.current) clearTimeout(reqId.current);
      reqId.current = setTimeout(deleteRes, debounce);
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
export default useDelete;
