import React from "react";
import useNetwork from "./network";

const TestUseNetwork = () => {
  const networkState = useNetwork();

  return (
    <div>
      <h5>Network Status (client side only)</h5>
      <pre>{JSON.stringify(networkState, null, 2)}</pre>
    </div>
  );
};

export default TestUseNetwork;