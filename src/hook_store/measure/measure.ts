import { useState, type RefObject, useEffect, useRef } from "react";
type measure = [
  rect: {
    width: number;
    height: number;
  },
  ref: RefObject<HTMLDivElement>
];
const useMeasure = (): measure => {
  const ref = useRef<HTMLDivElement>(null);
  const [rect, setRect] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });
  const ob = new ResizeObserver((entries) => {
    for (const entry of entries) {
      const { width, height } = entry.contentRect;
      setRect({
        width,
        height,
      });
    }
  });
  useEffect(() => {
    if (ref.current) {
      ob.observe(ref.current);
    }

    return () => {
      ob.disconnect();
    };
  }, [ref.current]);

  return [rect, ref];
};

export default useMeasure;
