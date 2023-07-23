import { useEffect, useState } from "react";

const useContinueTry = <T>(fn: () => T, interval: number) => {
  const [resolve, setResolve] = useState<boolean>(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const retryFn = async () => {
      try {
        const res = await fn();
        if (res) {
          setResolve(true);
        } else {
          timer = setTimeout(retryFn, interval);
        }
      } catch (abc) {
        timer = setTimeout(retryFn, interval);
      }
    };

    retryFn();

    return () => {
      clearTimeout(timer);
    };
  }, [fn, interval]);

  return resolve;
};

export default useContinueTry;
