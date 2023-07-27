import type { ExtendedRequestOptions, ResponseData } from "@hook/_request";
import executeRequest from "@hook/_request/_request";
import { useEffect, useState } from "react";

const usePost = (url: string, config: ExtendedRequestOptions = {}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState<Error | null>(null);
  const [res, setRes] = useState<ResponseData | null>(null);

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

    post();
  }, [url]);

  return {
    err,
    isLoading,
    res,
  };
};
export default usePost;
