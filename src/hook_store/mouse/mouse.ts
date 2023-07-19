import { useRef, useEffect, useState } from "react";

const useMouse = (): [
  {
    x: number;
    y: number;
    elementX: number;
    elementY: number;
    elementPositionX: number;
    elementPositionY: number;
  },
  React.RefObject<HTMLDivElement>
] => {
  const [state, setState] = useState({
    x: 0,
    y: 0,
    elementX: 0,
    elementY: 0,
    elementPositionX: 0,
    elementPositionY: 0,
  });

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMousemove = (e: any) => {
      const { clientX, clientY } = e;
      const element = ref.current;
      if (element) {
        const { left, top } = element.getBoundingClientRect();

        setState({
          x: clientX,
          y: clientY,
          elementX: clientX - left,
          elementY: clientY - top,
          elementPositionX: left,
          elementPositionY: top,
        });
      }
    };
    document.addEventListener("mousemove", handleMousemove);

    return () => {
      document.removeEventListener("mousemove", handleMousemove);
    };
  }, []);

  return [state, ref];
};
export default useMouse;
