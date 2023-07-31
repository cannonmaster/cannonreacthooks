import { useState } from "react";
import useIntervalWhen from "./intervalwhen";

const TestUseIntervalWhen = () => {
  const [sec, setSec] = useState(0);
  const [condition, setCondition] = useState(false);
  useIntervalWhen(
    () => {
      setSec((sec) => sec + 0.1);
    },
    { condition }
  );
  return (
    <div>
      <div>sec: {sec}</div>
      <button onClick={() => setCondition(!condition)}>runstop</button>
    </div>
  );
};
export default TestUseIntervalWhen;
