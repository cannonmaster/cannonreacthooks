import { useEffect } from "react";
import useLocalStorage from "./localstorage";

const TestUseLocalStorage = () => {
  const [val, setVal] = useLocalStorage<string>("abc123", {
    initVal: "123",
  });

  useEffect(() => {
    setTimeout(() => {
      setVal("abc321");
    }, 3000);
    // setVal("123");
  }, [setVal]);

  return (
    <div>
      localstorage value (refresh to see if the value is persist): {val}
    </div>
  );
};
export default TestUseLocalStorage;

// import React from "react";
// import produce from "immer";

// const createState = (initialState, options = {}) => {
//   const listeners = new Set();
//   const storeApi = {
//     getState: () => state,
//     setState: (updater) => {
//       setState(produce(updater));
//     },
//     subscribe: (listener) => {
//       listeners.add(listener);
//       return () => {
//         listeners.delete(listener);
//       };
//     },
//     destroy: () => {
//       listeners.clear();
//     },
//     toJSON: () => state,
//   };

//   const state = initialState;
//   const setState = (newState) => {
//     Object.assign(state, newState);
//     for (const listener of listeners) {
//       listener();
//     }
//   };

//   if (options.middleware) {
//     const applyMiddleware = (action) => {
//       const getState = () => storeApi.getState();
//       const setState = (updater) => storeApi.setState(updater);
//       return options.middleware(storeApi)(action)(getState, setState);
//     };

//     storeApi.setState = (updater) => {
//       const stateUpdater = produce(updater);
//       const nextState = stateUpdater(state);

//       if (nextState !== state) {
//         const action = { state: nextState, type: "setState" };
//         const processedAction = applyMiddleware(action);

//         if (processedAction) {
//           setState(processedAction.state);
//         }
//       }
//     };
//   }

//   return storeApi;
// };

// // Custom hook to use the store
// const useStore = (store) => {
//   const [, forceUpdate] = React.useReducer((x) => x + 1, 0);
//   const subscriptionRef = React.useRef(null);

//   // Subscribe to the store on mount
//   React.useEffect(() => {
//     subscriptionRef.current = store.subscribe(() => {
//       forceUpdate();
//     });
//     return () => {
//       // Unsubscribe from the store on unmount
//       if (subscriptionRef.current) {
//         subscriptionRef.current();
//         subscriptionRef.current = null;
//       }
//     };
//   }, [store]);

//   return store.getState();
// };

// // Usage
// const initialState = {
//   count: 0,
// };

// const loggerMiddleware = (store) => (action) => (getState, setState) => {
//   console.log("Previous State:", getState());
//   console.log("Action:", action);
//   const result = store(action);
//   console.log("Next State:", getState());
//   return result;
// };

// const options = {
//   middleware: loggerMiddleware,
// };

// const store = createState(initialState, options);

// const App = () => {
//   const state = useStore(store);

//   const increment = () => {
//     store.setState((state) => {
//       state.count += 1;
//     });
//   };

//   const decrement = () => {
//     store.setState((state) => {
//       state.count -= 1;
//     });
//   };

//   return (
//     <div>
//       <h1>Count: {state.count}</h1>
//       <button onClick={increment}>Increment</button>
//       <button onClick={decrement}>Decrement</button>
//     </div>
//   );
// };

// export default App;
