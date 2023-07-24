import { usePrevious } from "@cannonui/reacthooks";
import { useState } from "react";
const TestUsePrevious = () => {
  const [value, setValue] = useState<number>(0);
  const previous = usePrevious(value);

  const handleUpdate = () => {
    setValue((value) => value + 1);
  };

  return (
    <>
      <div>previous value: {previous}</div>
      <div>current value: {value}</div>
      <button onClick={handleUpdate}>Update</button>
    </>
  );
};

export default TestUsePrevious;
