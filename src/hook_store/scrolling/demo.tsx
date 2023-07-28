import { useRef } from "react";
import { useScrolling } from "@cannonui/reacthooks";
const TestUseScrolling = () => {
  const element = useRef<HTMLDivElement>(null);
  const isScrolling = useScrolling(element);

  return (
    <div>
      <div
        style={{ height: "100px", width: "200px", overflow: "scroll" }}
        ref={element}
      >
        Scrolling me to test, this is dummy text. this is dummy text. this is
        dummy text. this is dummy text. this is dummy text. this is dummy text.
        this is dummy text. this is dummy text. this is dummy text. this is
        dummy text.
      </div>

      <div>{isScrolling ? "scrolling" : "not scrolling"}</div>
    </div>
  );
};
export default TestUseScrolling;
