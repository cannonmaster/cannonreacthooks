import useStore from "./store";
import store from "./astore";
const CmpC = () => {
  const { val } = useStore(store);

  return <div>Component C: {val}</div>;
};
export default CmpC;
