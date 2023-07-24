import { useState, useEffect } from "react";
import useSafeState from "./safestate";
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
      <button onClick={() => setVisible(false)}>close </button>
      {visible && <ChildCmp />}
    </div>
  );
};

export default TestUseSafeState;
