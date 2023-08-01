import useSse from "./sse";

const TestUseSse = () => {
  const data = useSse<string>("http://localhost:3001/sse");

  return (
    <ul>
      {data.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
};

export default TestUseSse;
