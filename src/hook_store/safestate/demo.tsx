import { useState, useEffect } from "react";
import { useSafeState } from "@cannonui/reacthooks";
useState;

const ChildCmp = () => {
  const value = 0;
  const [safeVal, withSetSafeState] = useSafeState<number>(value);

  useEffect(() => {
    setTimeout(() => {
      withSetSafeState((prev) => prev + 1);
    }, 3000);

    return () => {};
  }, []);

  return <div>safe value: {safeVal}</div>;
};
const TestUseSafeState = () => {
  const [visible, setVisible] = useState(true);

  return (
    <div>
      <button onClick={() => setVisible(false)}>
        click to prevent value update after component unmount
      </button>
      {visible && <ChildCmp />}
    </div>
  );
};

export default TestUseSafeState;
