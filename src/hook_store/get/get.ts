import executeRequest from "@hook/_request";
import type { ResponseData, ExtendedRequestOptions } from "@hook/_request";
import { useEffect, useState } from "react";
const useGet = (url: string, config: ExtendedRequestOptions = {}) => {
  const [res, setRes] = useState<ResponseData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState<Error | null>(null);
  useEffect(() => {
    const get = async () => {
      try {
        const res = await executeRequest({ ...config, url, method: "GET" });

        setRes(res);
        setIsLoading(false);
      } catch (err: any) {
        setIsLoading(false);
        setErr(err);
        throw err;
      }
    };
    get();
  }, [url]);
  return {
    res,
    isLoading,
    err,
  };
};
export type { ResponseData, ExtendedRequestOptions };
export default useGet;
