import { useEffect, useState, useRef } from "react";

const useRenderTrack = () => {
  // const [renderTrack, setRenderTrack] = useState(0);
  const renderTrack = useRef(0);

  renderTrack.current += 1;

  return renderTrack.current;
};
export default useRenderTrack;
