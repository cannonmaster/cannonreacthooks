import { useCallback, useSyncExternalStore } from "react";

const useOnline = () => {
  const subscribe = useCallback(
    (callback: {
      (this: Window, ev: Event): any;
      (this: Window, ev: Event): any;
      (this: Window, ev: Event): any;
      (this: Window, ev: Event): any;
    }) => {
      window.addEventListener("online", callback);
      window.addEventListener("offline", callback);

      return () => {
        window.removeEventListener("online", callback);
        window.removeEventListener("offline", callback);
      };
    },
    []
  );

  const getSnapshot = () => {
    return navigator?.onLine;
  };

  const getServerSnapshot = () => {
    throw Error("client-only hook");
  };

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
};
export default useOnline;
