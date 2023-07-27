import { useRef } from "react";

// Create a single instance of the shared object using closure
const defaultHeader = {};

const useDefaultHeader = () => {
  // Use a ref to keep a stable reference to the shared object across renders
  const defaultHeaderRef = useRef<Record<string, string>>(defaultHeader);

  const set = (key: string, val: any) => {
    defaultHeaderRef.current[key] = val;
  };

  const get = (key: string) => {
    return defaultHeaderRef.current[key];
  };

  const getHeaders = () => ({
    ...defaultHeader,
  });

  return {
    get,
    set,
    getHeaders,
  };
};

export default useDefaultHeader;
