import { useEffect, useRef, useState } from "react";
import useLongPress from "./longpress";

const TestUseLongPress = () => {
  const callback = () => {
    console.log("long press detected");
  };

  // Use the setLongPressed function to update the longPressed state
  const { longPressed, element } = useLongPress({
    threshold: 6000,
    callback,
  });

  return (
    <div ref={element}>
      <button>Press and hold</button>
      {longPressed && <span>long pressed</span>}
    </div>
  );
};

export default TestUseLongPress;
