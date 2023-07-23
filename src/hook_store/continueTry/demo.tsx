import { useState } from "react";
import useContinueTry from "./continueTry";

const TestUseContinueTry = () => {
  const [count, setCount] = useState<number>(0);
  const fn = () => {
    console.log("count: " + count);
    return count > 10;
  };
  const resolve = useContinueTry(fn, 1000);
  const handleClick = () => {
    setCount((count) => count + 1);
  };
  return (
    <div>
      <button onClick={handleClick}>Click 11 times to resolve</button>
      <div>Clicked: {count}</div>
      <div>{resolve && <span>resolved</span>}</div>
    </div>
  );
};
export default TestUseContinueTry;
