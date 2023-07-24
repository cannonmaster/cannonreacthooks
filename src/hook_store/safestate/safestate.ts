import { useEffect, useRef, useState } from "react";

const useSafeState = <T>(
  value: T
): [T, (value: T | ((prev: T) => T)) => void] => {
  const [safeState, setSafeState] = useState<T>(value);
  const safe = useRef<boolean>(true);
  useEffect(() => {
    return () => {
      safe.current = false;
    };
  }, []);

  const withSetSafeState = (value: T | ((prev: T) => T)) => {
    if (safe.current) {
      setSafeState(value);
    }
  };

  return [safeState, withSetSafeState];
};
export default useSafeState;
