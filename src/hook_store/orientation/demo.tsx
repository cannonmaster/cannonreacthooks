import useOrientation from "./orientation";

const TestUseOrientation = () => {
  const orientation = useOrientation();

  return <div>orientation: {orientation}</div>;
};
export default TestUseOrientation;
