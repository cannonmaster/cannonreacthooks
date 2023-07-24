import { useMap } from "@cannonui/reacthooks";
import { useState } from "react";
const TestUseMap = () => {
  const [fakeKey, setFakeKey] = useState(4);
  const initialEntries: [string, string][] = [
    ["key1", "value1"],
    ["key2", "value2"],
    ["key3", "value3"],
  ];

  const {
    map,
    addItem,
    removeItem,
    keys,
    values,
    clear,
    hasKey,
    getValue,
    size,
    toArray,
  } = useMap(initialEntries);

  const handleAdd = () => {
    addItem("key" + fakeKey, "value" + fakeKey.toString());
    setFakeKey((key) => key + 1);
  };

  const handleRemove = () => {
    if (fakeKey <= 0) return;
    removeItem("key" + (fakeKey - 1));
    setFakeKey((key) => key - 1);
  };

  const handleClear = () => {
    setFakeKey(0);
    clear();
  };

  return (
    <>
      <div style={{ display: "flex", gap: "2rem" }}>
        <div style={{ marginTop: "1.5rem" }}>
          <h5>Key - Val</h5>
          {Array.from(map.entries()).map(([key, value]) => (
            <div key={key}>
              [{key}, {value}]
            </div>
          ))}
        </div>
        <div>
          <h5>Keys</h5>
          {Array.from(keys()).map((key) => (
            <div key={key}>{key}</div>
          ))}
        </div>
        <div>
          <h5>Values</h5>
          {Array.from(values()).map((val, index) => (
            <div key={index}>{val}</div>
          ))}
        </div>
      </div>
      <h5>map sise: {size}</h5>
      <button onClick={handleAdd}>add</button>
      <button style={{ margin: "0 1rem" }} onClick={handleRemove}>
        remove
      </button>
      <button onClick={handleClear}>clear</button>
    </>
  );
};

export default TestUseMap;
