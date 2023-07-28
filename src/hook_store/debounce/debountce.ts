import { useState, useRef, useEffect } from "react";

type optionsType = {
  heading?: boolean;
  trailing?: boolean;
  cb: (prev: any) => any;
};
const useDebounce = (value: any, delay: number, options: optionsType) => {
  if (delay === 0) {
    return value;
  }
  const [valueToDebounce, setDebouncedValue] = useState(value);

  const { heading, cb, trailing } = options;
  const valueRef = useRef(value);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      if (trailing || valueRef.current !== valueToDebounce) {
        if (cb) {
          setDebouncedValue(cb(valueRef.current));
        }

        if (!cb) {
          setDebouncedValue(valueRef.current);
        }
      }
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value, delay]);

  return valueToDebounce;
};
export default useDebounce;
