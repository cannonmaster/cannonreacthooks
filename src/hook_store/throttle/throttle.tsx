import { useState, useRef, useEffect } from "react";

const useThrottle = (value: any, interval = 100) => {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastUpdate = useRef<number>(0);

  useEffect(() => {
    let timeId: ReturnType<typeof setTimeout>;
    if (Date.now() > lastUpdate.current + interval) {
      console.log("666");

      setThrottledValue(value);
      lastUpdate.current = Date.now();
    } else {
      console.log(123123123123);
      timeId = setTimeout(() => {
        setThrottledValue(value);
        lastUpdate.current = Date.now();
      }, interval);
      return () => {
        console.log(321321);

        clearTimeout(timeId);
      };
    }
  }, [value, interval]);

  return throttledValue;
};

export default useThrottle;
