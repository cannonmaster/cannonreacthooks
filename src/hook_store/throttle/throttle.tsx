import { useState, useRef, useEffect } from "react";

const useThrottle = (value: any, interval = 100) => {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastUpdate = useRef<number>(0);

  useEffect(() => {
    let timeId: ReturnType<typeof setTimeout>;
    if (Date.now() > lastUpdate.current + interval) {
      setThrottledValue(value);
      lastUpdate.current = Date.now();
    } else {
      timeId = setTimeout(() => {
        setThrottledValue(value);
        lastUpdate.current = Date.now();
      }, interval);
    }
    return () => {
      if (timeId) clearTimeout(timeId);
    };
  }, [value, interval]);

  return throttledValue;
};

export default useThrottle;
