import { RefObject, useEffect, useRef, useState } from "react";

const useIdle = (interval: number) => {
  const [isidle, setIsIdle] = useState<boolean>(false);
  useEffect(() => {
    let timeId: ReturnType<typeof setTimeout>;
    const handleUpdateIdle = () => {
      clearTimeout(timeId);
      setIsIdle(false);
      timeId = setTimeout(setIsIdle, interval, true);
    };

    document.addEventListener("mousemove", handleUpdateIdle);
    document.addEventListener("keydown", handleUpdateIdle);
    document.addEventListener("scroll", handleUpdateIdle);
    document.addEventListener("touchstart", handleUpdateIdle);
    return () => {
      clearTimeout(timeId);
      document.removeEventListener("mousemove", handleUpdateIdle);
      document.removeEventListener("mousemove", handleUpdateIdle);
      document.removeEventListener("mousemove", handleUpdateIdle);
      document.removeEventListener("mousemove", handleUpdateIdle);
    };
  }, [interval]);

  return isidle;
};
export default useIdle;
