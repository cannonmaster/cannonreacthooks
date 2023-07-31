import { StoreApi, createStoreApi } from "./store";
type storeType = {
  val: number;
  inc: () => void;
  dec: () => void;
  reset: () => void;
};
const store = createStoreApi<storeType>((set, get) => ({
  val: 0,
  inc: () => set((state: storeType) => ({ val: state.val + 1 })),
  dec: () => set((state: storeType) => ({ val: state.val - 1 })),
  reset: () => set({ val: 0 }),
}));
export type { storeType };
export default store;

// import { useSyncExternalStore, useState } from "react";
// const createImpl = (initState: any) => {
//   let state: any;
//   let listeners = new Set();
//   const subscribe = (listener: any) => {
//     listeners.add(listener);

//     return () => {
//       listeners.delete(listener);
//     };
//   };
//   const unsubscribe = () => {
//     listeners.clear();
//   };
//   const set = (nextState: any) => {
//     let newState;
//     if (typeof nextState === "function") {
//       newState = nextState(state);
//     } else {
//       newState = nextState;
//     }
//     if (!Object.is(newState, state)) {
//       state = { ...state, ...newState };
//       for (const listener of listeners) {
//         (listener as any)(newState, state);
//       }
//     }
//     return state;
//   };
//   const get = () => state;
//   state = initState(set, get);
//   const api = {
//     set,
//     get,
//     subscribe,
//     unsubscribe,
//   };

//   return api;
// };
// const create = (createState: any) => {
//   const api = createImpl(createState);
//   const useAbc = useStore(api);
//   return useAbc;
// };
// const useStore = (api: any) => {
//   const val = useSyncExternalStore(api.subscribe, api.get, api.get);
//   return val;
// };
// export { create };
