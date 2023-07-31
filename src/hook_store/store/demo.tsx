import useStore from "./store";
import store from "./astore";
import storeC from "./cstore";
import CmpA from "./cmpA";
import CmpC from "./cmpC";

const TestCreateStore = () => {
  const { inc, dec, reset } = useStore(store);

  // const { inc: incC, dec: decC, reset: resetC, val: valC } = useStore(storeC);

  return (
    <div>
      <button onClick={() => inc()}>inc</button>
      <button onClick={() => dec()}>dec</button>
      <button onClick={() => reset()}>reset</button>
      <CmpA />
      <CmpC />
    </div>
  );
};

export default TestCreateStore;
