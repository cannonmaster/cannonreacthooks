import { useState } from "react";
import { useClickAway } from "@cannonui/reacthooks";

const TestUseClickedAway = () => {
  const isClickedOutside = (e: any) => {
    setClickStatus(true);
  };
  const ref = useClickAway(isClickedOutside);
  const [clickStatus, setClickStatus] = useState(false);
  return (
    <>
      <div
        ref={ref}
        style={{ width: "300px", height: "200px", backgroundColor: "cyan" }}
      >
        click to see if clicked outside
      </div>
      <div>{clickStatus ? "clicked away" : ""}</div>
    </>
  );
};

export default TestUseClickedAway;
