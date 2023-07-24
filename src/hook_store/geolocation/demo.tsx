import { useGeolocation } from "@cannonui/reacthooks";

const TestUseGeolocation = () => {
  const location = useGeolocation();

  return <pre>{JSON.stringify(location, null, 2)}</pre>;
};
export default TestUseGeolocation;
