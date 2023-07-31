import { useRef, useEffect } from "react";
interface configTypes {
  condition: boolean;
  immediate?: boolean;
  delay?: number;
}
type cbType = () => void;
const useIntervalWhen = (cb: cbType, config: configTypes) => {
  const intervalId = useRef<ReturnType<typeof setInterval> | null>(null);
  const { condition, immediate = true, delay = 100 } = config;
  useEffect(() => {
    if (condition) {
      if (intervalId.current === null) {
        // clearInterval(intervalId.current);
        intervalId.current = setInterval(cb, delay);
      }
    }

    return () => {
      if (intervalId.current) {
        clearInterval(intervalId.current);
        intervalId.current = null;
      }
    };
  }, [cb, condition, delay]);
};

export default useIntervalWhen;
