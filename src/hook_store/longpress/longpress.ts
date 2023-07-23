import { useEffect, useState, useRef } from "react";

interface longPressProps {
  threshold: number;
  onStart?: () => void;
  onFinish?: () => void;
  callback: (e: HTMLDivElement) => void;
  onCancel?: () => void;
}
const useLongPress = (options: longPressProps) => {
  const { callback, threshold, onFinish, onStart, onCancel } = options;
  const element = useRef<HTMLDivElement>(null);
  const [longPressed, setLongPressed] = useState(false);
  useEffect(() => {
    let timeId: ReturnType<typeof setTimeout>;
    const handleStart = () => {
      if (onStart) onStart();
      setLongPressed(false);
      timeId = setTimeout(() => {
        callback(element.current!);
        setLongPressed(true);
      }, threshold);
    };
    const handleEnd = () => {
      clearTimeout(timeId);
      if (longPressed) {
        onFinish && onFinish();
      } else {
        onCancel && onCancel();
      }
    };
    element.current?.addEventListener("touchstart", handleStart);
    element.current?.addEventListener("touchend", handleEnd);
    element.current?.addEventListener("mousedown", handleStart);
    element.current?.addEventListener("mouseup", handleEnd);

    return () => {
      element.current?.removeEventListener("touchstart", handleStart);
      element.current?.removeEventListener("touchend", handleEnd);
      element.current?.removeEventListener("mouseup", handleStart);
      element.current?.removeEventListener("mousedown", handleEnd);
    };
  }, [threshold, element]);

  return {
    element,
    longPressed,
  };
};
export default useLongPress;
