import { useEffect, useRef, useState } from "react";
import { useLongPress } from "@cannonui/reacthooks";

const TestUseLongPress = () => {
  const callback = () => {
    console.log("long press detected");
  };

  // Use the setLongPressed function to update the longPressed state
  const { longPressed, element } = useLongPress({
    threshold: 3000,
    callback,
  });

  return (
    <div ref={element}>
      <button>Press and hold</button>
      <div>{longPressed && <span>long pressed</span>}</div>
    </div>
  );
};

export default TestUseLongPress;
