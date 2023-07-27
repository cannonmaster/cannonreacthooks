import { useState } from "react";

const useToggle = (init: boolean = false) => {
  const [isToggle, setIsToggle] = useState<boolean>(init);
  const toggle = () => {
    setIsToggle(!isToggle);
  };
  const setOff = () => {
    setIsToggle(false);
  };
  const current = () => {
    return isToggle;
  };
  const setOn = () => {
    setIsToggle(true);
  };

  return {
    setOff,
    current,
    toggle,
    setOn,
    isToggle,
  };
};
export default useToggle;
