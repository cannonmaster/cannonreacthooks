import { useState, type RefObject, useEffect } from "react";

const useScrolling = (ref: RefObject<HTMLElement>, delay = 150) => {
  const [isScrolling, setIsScrolling] = useState<boolean>(false);

  useEffect(() => {
    if (ref.current) {
      let timeId: ReturnType<typeof setTimeout>;
      const handleScrollEnd = () => {
        setIsScrolling(false);
      };
      const handleScrolling = () => {
        setIsScrolling(true);
        clearTimeout(timeId);
        timeId = setTimeout(handleScrollEnd, delay);
      };

      ref.current.addEventListener("scroll", handleScrolling);

      return () => {
        ref.current?.removeEventListener("scroll", handleScrolling);
      };
    }
  }, [ref]);

  return isScrolling;
};
export default useScrolling;
