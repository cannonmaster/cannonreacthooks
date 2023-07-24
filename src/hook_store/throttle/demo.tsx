import { useState } from "react";
import useThrottle from "./throttle";

const TestUseThrottle = () => {
  const [value, setValue] = useState(0);

  const throttleValue = useThrottle(value, 2000);
  const handleClick = () => {
    setValue((prev) => prev + 1);
  };
  return (
    <div>
      <button onClick={handleClick}>invoke fn</button>
      <div>value: {value}</div>
      <div>throttle value: {throttleValue}</div>
    </div>
  );
};

export default TestUseThrottle;
