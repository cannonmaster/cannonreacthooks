import { useState, useEffect } from "react";

const useSse = <T>(url: string) => {
  const [data, setData] = useState<T[]>([]);
  useEffect(() => {
    const es = new EventSource(url);
    es.onmessage = (e) => {
      const patchData = e.data;
      setData((data) => [...data, patchData]);
    };
    es.onerror = (err) => {
      console.error("err occured in sse connection:", err);

      es.close();
    };
    return () => {
      es.close();
    };
  }, []);

  return data;
};
export default useSse;
