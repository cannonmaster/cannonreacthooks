import { useSyncExternalStore } from "react";
type Listener = () => void;
type StateSetter<S> = (
  nextState: S | Partial<S> | ((currentState: S) => Partial<S>)
) => void;
type StateGetter<S> = () => S;
type StoreApi<S> = {
  set: StateSetter<S>;
  get: StateGetter<S>;
  subscribe: (listener: Listener) => () => void;
  unsubscribe: () => void;
};
const createImpl = <S>(
  initState: (set: StoreApi<S>["set"], get: StoreApi<S>["get"]) => S
) => {
  let state: S;
  let listeners = new Set<Listener>();
  const subscribe = (listener: Listener) => {
    listeners.add(listener);

    return () => {
      listeners.delete(listener);
    };
  };
  const unsubscribe = () => {
    listeners.clear();
  };
  const set: StoreApi<S>["set"] = (nextState) => {
    let newState;
    if (typeof nextState === "function") {
      newState = (nextState as Function)(state);
    } else {
      newState = nextState;
    }
    if (!Object.is(newState, state)) {
      state = Object.assign({}, state, newState);
      for (const listener of listeners) {
        console.log(listener);

        (listener as any)();
      }
    }
  };
  const get = () => state;
  state = initState(set, get);
  const api: StoreApi<S> = {
    set,
    get,
    subscribe,
    unsubscribe,
  };

  return api;
};
const createStoreApi = <S>(
  createState: (set: StoreApi<S>["set"], get?: StoreApi<S>["get"]) => S
) => {
  let api = createImpl(createState);
  return api;
};

const useStore = <S>(api: StoreApi<S>) => {
  return useSyncExternalStore(api.subscribe, api.get, api.get);
};

export { createStoreApi };
export type { StoreApi };
export default useStore;
