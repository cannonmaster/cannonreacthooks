import React, { useState, useEffect } from 'react';
import useMouse from "./mouse"

const TestUseMouse = ()=>{
  const [state, refMouse] = useMouse();
  const [bgColor, setBgColor]  = useState('cyan')
  
  useEffect(()=>{
    if ((state.elementY>=0 && state.elementY<=200) && (state.elementX>=0 && state.elementX<=300) ) {
      setBgColor('pink');
    } else {
      setBgColor('cyan');
    }
  },[state.elementX, state.elementY])


  return (
    <>
      <pre>current state: {JSON.stringify(state, null ,2)}</pre>

      <div ref={refMouse} style={{ width: "300px", height: "200px", border: "1px solid cyan", backgroundColor: bgColor }}></div>
    </>
  ) 
}
export default TestUseMouse;