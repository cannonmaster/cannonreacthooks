import useMediaQuery from "./mediaquery";

const TestUseMediaQuery = () => {
  const isMatch = useMediaQuery("(max-height: 468px)");

  return <div>{isMatch ? "matched" : "not match"}</div>;
};
export default TestUseMediaQuery;
