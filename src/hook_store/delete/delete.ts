import type { ExtendedRequestOptions, ResponseData } from "@hook/_request";
import executeRequest from "@hook/_request/_request";
import { useEffect, useState } from "react";

const useDelete = (url: string, config: ExtendedRequestOptions = {}) => {
  const [isLoading, setIsLoading] = useState(true);

  const [res, setRes] = useState<ResponseData | null>(null);

  const [err, setErr] = useState<Error | null>(null);

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

    deleteRes();
  }, [url]);

  return {
    res,
    isLoading,
    err,
  };
};
export default useDelete;
