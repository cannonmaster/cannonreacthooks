import { useMediaQuery } from "@cannonui/reacthooks";

const TestUseMediaQuery = () => {
  const isMatch = useMediaQuery("(max-width: 468px)");

  return (
    <div>is match max width 468px: {isMatch ? "matched" : "not match"}</div>
  );
};
export default TestUseMediaQuery;
