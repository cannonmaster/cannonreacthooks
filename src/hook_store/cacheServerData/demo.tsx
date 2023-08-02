import { useEffect, useState } from "react";
import useCacheServerData from "./cacheServerData";

const TestUseCacheServerData = () => {
  const [data, setData] = useState<{ [key: string]: any }>({});
  const { getFromCache } = useCacheServerData();
  useEffect(() => {
    const fetchData = async () => {
      const data =
        (await getFromCache<{ [key: string]: any }>(
          "http://localhost:3001/cacheapi"
        )) || {};

      setData(data);
    };

    fetchData();
    setTimeout(() => {
      fetchData();
    }, 3000);
  }, []);

  return <pre>data: {JSON.stringify(data, null, 2)}</pre>;
};
export default TestUseCacheServerData;
