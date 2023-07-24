import { useCallback, useSyncExternalStore } from "react";

const useMediaQuery = (query: string) => {
  const getSnapshot = () => {
    return window.matchMedia(query).matches;
  };

  const getServerSnapshot = () => {
    throw Error("client-only hook");
  };

  const subscribe = useCallback(
    (callback: (this: MediaQueryList, ev: MediaQueryListEvent) => any) => {
      const matchMedia = window.matchMedia(query);
      matchMedia.addEventListener("change", callback);
      return () => {
        matchMedia.removeEventListener("change", callback);
      };
    },
    [query]
  );

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
};
export default useMediaQuery;
