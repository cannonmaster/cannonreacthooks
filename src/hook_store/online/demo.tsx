import useOnline from "./online";
const TestUseOnline = () => {
  const online = useOnline();
  return <div>{online ? "online" : "not online"}</div>;
};
export default TestUseOnline;
