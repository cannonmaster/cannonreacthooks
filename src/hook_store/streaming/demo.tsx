import { useEffect, useState } from "react";
import useStreaming from "./streaming";

const TestUseStreaming = () => {
  // let streamedData = "";
  const [streamedData, setStreamedData] = useState("");
  const textDecoder = new TextDecoder();

  // Function to be called on each chunk of data received during streaming
  const onDataChunk = (dataChunk: ReadableStreamReadResult<any>) => {
    setStreamedData((prev) => prev + textDecoder.decode(dataChunk.value));
    // streamedData += textDecoder.decode(value);
  };
  const { err, res, isLoading } = useStreaming(
    "http://localhost:3001/streaming",
    {
      onDataChunk,
    }
  );

  return (
    <>
      <div>isLoading: {isLoading ? "true" : "false"}</div>
      {err ? <div>Error: {err.message}</div> : <div>no error</div>}
      <div>res: {res ? res.data : ""}</div>
      <div>{streamedData}</div>
    </>
  );
};

export default TestUseStreaming;
