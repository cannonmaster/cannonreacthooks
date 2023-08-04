import { useSafeFetchJson } from "@cannonui/reacthooks";

const TestUseSafeFetchJson = () => {
  const { res, err, loading } = useSafeFetchJson(
    `http://localhost:3001/search`
  );

  return (
    <div>
      <div>loading: {loading.toString()}</div>
      <div>
        <pre>{JSON.stringify(res, null, 2)}</pre>
      </div>
      {err ? <div>{JSON.stringify(err, null, 2)}</div> : ""}
    </div>
  );
};

export default TestUseSafeFetchJson;
