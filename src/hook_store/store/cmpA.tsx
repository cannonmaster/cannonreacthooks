import useStore from "./store";
import store from "./astore";
const CmpA = () => {
  const { val } = useStore(store);

  return <div>Component A: {val}</div>;
};
export default CmpA;
