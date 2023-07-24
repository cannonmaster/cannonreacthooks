import { useOnline } from "@cannonui/reacthooks";
const TestUseOnline = () => {
  const online = useOnline();
  return <div>{online ? "online" : "not online"}</div>;
};
export default TestUseOnline;
