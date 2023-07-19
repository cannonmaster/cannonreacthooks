import { useState, useEffect } from "react";

const useIsClient = () => {
  const [state, setState] = useState(false);

  useEffect(() => {
    setState(true);
  }, []);

  return state;
};
export default useIsClient;
