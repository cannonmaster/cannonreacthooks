import { useQueue } from "@cannonui/reacthooks";
import { useRef } from "react";
const TestUseQueue = () => {
  const init = [1, 2, 3, 4, 5, 6];
  const { add, clear, remove, queue, size, last, first } = useQueue(init);
  const count = useRef(queue.length);

  const handleAdd = () => {
    ++count.current;
    add(count.current);
  };
  const handleRemove = () => {
    remove();
    console.log(queue.length);

    if (size === 1) {
      count.current = 0;
    }
  };
  const handleClear = () => {
    clear();
  };

  return (
    <>
      <div style={{ display: "flex", gap: "1em" }}>
        {queue &&
          queue.map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "200px",
                height: "100px",
                backgroundColor: "cyan",
                marginTop: "1rem",
              }}
            >
              {item}
            </div>
          ))}
      </div>

      <div>First ele in queue: {first}</div>
      <div>Last ele in queue: {last}</div>
      <div>Queue size: {size}</div>
      <div style={{ display: "flex", gap: "1em" }}>
        <button onClick={handleAdd} style={{ marginTop: "1.5rem" }}>
          add
        </button>
        <button onClick={handleRemove}>remove</button>
        <button onClick={handleClear}>clear</button>
      </div>
    </>
  );
};

export default TestUseQueue;
