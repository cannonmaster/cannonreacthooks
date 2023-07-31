import { useEffect, useState } from "react";
interface options<T> {
  serialize?: (val: any) => string;
  deserialize?: (val: any) => any;
  onError?: (val: any) => any;
  initVal?: T | (() => T);
}
const useLocalStorage = <T>(key: string, options: options<T> = {}) => {
  const {
    initVal = undefined,
    serialize = JSON.stringify,
    deserialize = JSON.parse,
    onError = (err) => console.error(err),
  } = options;

  const initialValue = initVal instanceof Function ? initVal() : initVal;
  const [val, setVal] = useState(() => {
    try {
      const initValInStorage = window.localStorage.getItem(key);
      return initValInStorage ? deserialize(initValInStorage) : initVal;
    } catch (err) {
      onError(err);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      const serializedValue = serialize(val);
      window.localStorage.setItem(key, serializedValue);
    } catch (err) {
      onError(err);
    }
  }, [val, key, serialize]);

  useEffect(() => {
    const handleStorageUpdate = (e: StorageEvent) => {
      if (e.storageArea === localStorage && e.key === key) {
        try {
          setVal(e.newValue);
        } catch (err) {
          onError(err);
        }
      }
    };
    window.addEventListener("storage", handleStorageUpdate);

    return () => {
      window.removeEventListener("storage", handleStorageUpdate);
    };
  }, [key, onError, serialize]);

  return [val, setVal];
};
export default useLocalStorage;
