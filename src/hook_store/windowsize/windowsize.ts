import { useEffect, useState } from "react";

const useWindowSize = () => {
  const [size, setSize] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });
  useEffect(() => {
    const handleWindoweResize = () => {
      setSize({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    };
    window.addEventListener("resize", handleWindoweResize);
    return () => {
      window.removeEventListener("resize", handleWindoweResize);
    };
  }, []);
  return size;
};
export default useWindowSize;
