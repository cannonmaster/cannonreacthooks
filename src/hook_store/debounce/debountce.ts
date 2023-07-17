import { useState, useRef, useEffect } from "react";

type optionsType = {
  heading?: boolean;
  trailing?: boolean;
};
const useDebounce = (
  value: any,
  delay: number,
  options: optionsType = { trailing: true }
) => {
  const [valueToDebounce, setDebouncedValue] = useState(value);

  const { heading, trailing } = options;
  const valueRef = useRef(value);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (trailing && heading) {
      const shouldUseTrailing = () => {
        if (valueRef.current !== valueToDebounce)
          setDebouncedValue(valueRef.current);
      };
      timeoutRef.current = setTimeout(shouldUseTrailing, delay);
    } else if (heading) {
      setDebouncedValue(valueRef.current);
      setTimeout(() => {}, delay);
    } else if (trailing) {
      timeoutRef.current = setTimeout(() => {
        if (valueRef.current !== valueToDebounce) {
          setDebouncedValue(valueRef.current);
        }
      }, delay);
    }
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value, delay, heading, trailing]);

  return valueToDebounce;
};
export default useDebounce;
