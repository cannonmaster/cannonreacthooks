import { useState } from "react";

useState;
const useMap = <k, v>(init: [k, v][] = []) => {
  const [map, setMap] = useState(new Map<k, v>(init));

  const addItem = (key: k, value: v) => {
    setMap((prevMap) => new Map(prevMap).set(key, value));
  };
  const removeItem = (key: k) => {
    setMap((prevMap) => {
      const _map = new Map(prevMap);
      _map.delete(key);
      return _map;
    });
  };
  const keys = () => {
    return map.keys();
  };
  const values = () => {
    return map.values();
  };
  const hasKey = (key: k) => {
    return map.has(key);
  };
  const getValue = (key: k) => {
    return map.get(key);
  };
  const size = map.size;
  const toArray = () => {
    return Array.from(map.entries());
  };
  const clear = () => {
    setMap(new Map());
  };

  return {
    addItem,
    removeItem,
    clear,
    hasKey,
    keys,
    values,
    toArray,
    size,
    getValue,
    map,
  };
};
export default useMap;
