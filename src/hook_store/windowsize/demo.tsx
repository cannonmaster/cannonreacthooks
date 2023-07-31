import useWindowSize from "./windowsize";

const TestWindowSize = () => {
  const { height, width } = useWindowSize();

  return (
    <>
      <div>window width: {width}</div>
      <div>window height: {height}</div>
    </>
  );
};

export default TestWindowSize;
