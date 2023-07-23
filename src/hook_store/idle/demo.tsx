import { useRef } from "react";
import useIdle from "./idle";

const TestUseIdle = () => {
  const element = useRef<HTMLDivElement>(null);
  const isIdle = useIdle(2000);
  return (
    <div>
      <div
        style={{ width: "100px", height: "100px", background: "cyan" }}
        ref={element}
      >
        splace mouse here and do not move
      </div>
      <div>is idle: {isIdle ? "true" : "false"}</div>
    </div>
  );
};
export default TestUseIdle;
