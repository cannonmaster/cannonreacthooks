import { useEffect, useState } from "react";
import type { ExtendedRequestOptions, ResponseData } from "@hook/_request";
import executeRequest from "@hook/_request/_request";

const usePatch = (url: string, config: ExtendedRequestOptions = {}) => {
  const [res, setRes] = useState<ResponseData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState<Error | null>(null);

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

    patch();
  }, [url]);

  return {
    res,
    isLoading,
    err,
  };
};
export default usePatch;
