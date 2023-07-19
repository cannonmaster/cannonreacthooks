import { useState, StrictMode } from "react";
import useRenderTrack from "./renderTrack"
const TestUserRenderTrack = ()=>{
  const [value, setValue] = useState(0)
  const renderTrack = useRenderTrack();
  const handleIncrement = ()=>{
    setValue((value)=>value+1)
  }
  return (<StrictMode>
    <button onClick={handleIncrement}>increment</button>
    <div>increment times: {value}</div>
    <div>actually rendered times: {renderTrack} times</div>
  </StrictMode>
  )
}

export default TestUserRenderTrack;