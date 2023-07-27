import useGet from "./get";
const TestUseGet = () => {
  const { res, isLoading, err } = useGet("http://localhost:3001");

  return (
    <>
      <div>isLoading: {isLoading ? "true" : "false"}</div>
      {err ? <div>Error: {err.message}</div> : <div>no error</div>}
      <div>res: {res ? res.data : ""}</div>
    </>
  );
};

export default TestUseGet;
