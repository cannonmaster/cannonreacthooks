import { usePost } from "@cannonui/reacthooks";

const TestUsePost = () => {
  const { res, err, isLoading } = usePost("http://localhost:3001/endpoint", {
    data: { a: "123" },
  });

  return (
    <>
      <div>isLoading: {isLoading ? "true" : "false"}</div>
      {err ? <div>Error: {err.message}</div> : <div>no error</div>}
      <div>res: {res ? res.data : ""}</div>
    </>
  );
};

export default TestUsePost;
