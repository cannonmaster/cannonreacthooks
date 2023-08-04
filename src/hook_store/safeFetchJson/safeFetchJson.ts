import { useState, useEffect } from "react";

const useSafeFetchJson = (url: string, config: RequestInit = {}) => {
  const [res, setRes] = useState<JSON | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [err, setErr] = useState<unknown | null>(null);
  useEffect(() => {
    let isMounted = true;
    const fetData = async () => {
      try {
        const data = await (await fetch(url, config)).json();

        if (isMounted) {
          setRes(data);
          setLoading(false);
        }
      } catch (err) {
        setErr(err);
        if (isMounted) setLoading(false);
      }
    };
    fetData();

    return () => {
      isMounted = false;
    };
  }, [url]);

  return { err, res, loading };
};

export default useSafeFetchJson;
