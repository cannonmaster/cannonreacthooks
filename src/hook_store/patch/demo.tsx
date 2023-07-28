import { usePatch } from "@cannonui/reacthooks";
const TestUsePatch = () => {
  const { res, err, isLoading } = usePatch("http://localhost:3001/endpoint");

  return (
    <div>
      <div>Loading: {isLoading ? "true" : "false"}</div>
      {err ? <pre>{JSON.stringify(err, null, 2)}</pre> : <div>no error</div>}
      <div>res: {res ? res.data : ""}</div>
    </div>
  );
};
export default TestUsePatch;
