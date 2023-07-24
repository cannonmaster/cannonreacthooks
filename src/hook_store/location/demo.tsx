import { useLocation } from "@cannonui/reacthooks";
const LocationDisplay = () => {
  const location = useLocation();

  return (
    <div>
      <pre>{JSON.stringify(location, null, 2)}</pre>
    </div>
  );
};
const TestUseLocation = () => {
  return (
    <div>
      <LocationDisplay />
    </div>
  );
};
export default TestUseLocation;
