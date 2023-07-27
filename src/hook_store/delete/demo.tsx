import useDelete from "./delete";

const TestUseDelete = () => {
  const { res, err, isLoading } = useDelete("http://localhost:3001/endpoint");

  return (
    <>
      <div>isLoading: {isLoading ? "true" : "false"}</div>
      {err ? <div>Error: {err.message}</div> : <div>no error</div>}
      <div>res: {res ? res.data : ""}</div>
    </>
  );
};

export default TestUseDelete;
