import { useState } from "react";
const useQueue = <T>(init: T[] = [], maxSize?: number) => {
  const [queue, setQueue] = useState<T[]>(init);

  const add = (el: T) => {
    let newQueue = [...queue, el];
    newQueue = maxSize ? newQueue.slice(-maxSize) : newQueue;
    setQueue(newQueue);
    return newQueue;
  };

  const remove = () => {
    if (queue.length === 0) return undefined;
    const [firstEle, ...restEle] = queue;
    setQueue(restEle);
    return firstEle;
  };

  const isFull =
    maxSize !== undefined && queue.length === maxSize ? true : false;

  const peek = () => {
    return queue[0];
  };

  const clear = () => {
    setQueue([]);
  };

  return {
    add,
    clear,
    peek,
    remove,
    isFull,
    queue,
    size: queue.length,
    last: queue[queue.length - 1],
    first: queue[0],
  };
};
export default useQueue;
