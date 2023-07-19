import { useRef, useEffect } from "react";
const useClickAway = (fn: (e: any) => any) => {
  const ref = useRef<HTMLDivElement>(null);
  const handleClick = (e: any) => {
    if (ref.current && !ref.current.contains(e.target)) {
      fn(e);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return ref;
};

export default useClickAway;
