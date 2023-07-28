import { useState } from "react";
import { useGet } from "@cannonui/reacthooks";
const TestUseGet = () => {
  const [c, setC] = useState(0);
  const { res, isLoading, err } = useGet("http://localhost:3001", {
    debounce: 3000,
  });

  return (
    <>
      <button onClick={() => setC((prev) => prev + 1)}>click</button>
      <div>isLoading: {isLoading ? "true" : "false"}</div>
      {err ? <div>Error: {err.message}</div> : <div>no error</div>}
      <div>res: {res ? res.data : ""}</div>
    </>
  );
};

export default TestUseGet;
