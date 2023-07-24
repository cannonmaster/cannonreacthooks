import { useRef } from "react";
import { useIdle } from "@cannonui/reacthooks";

const TestUseIdle = () => {
  const element = useRef<HTMLDivElement>(null);
  const isIdle = useIdle(2000);
  return (
    <div>
      <div>is idle: {isIdle ? "true" : "false"}</div>
    </div>
  );
};
export default TestUseIdle;
