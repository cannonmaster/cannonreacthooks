import { useToggle } from "@cannonui/reacthooks";

const TestUseToggle = () => {
  const { setOn, setOff, isToggle, toggle } = useToggle();

  return (
    <div>
      <div>current state: {JSON.stringify(isToggle, null, 2)}</div>
      <button onClick={setOn}>On</button>
      <button style={{ margin: "0 1em;" }} onClick={toggle}>
        Toggle
      </button>
      <button onClick={setOff}>Off</button>
    </div>
  );
};

export default TestUseToggle;
