import { useState } from 'react'; 
// import useDebounce from "./debountce";
import { useDebounce } from '@cannonui/reacthooks';

const TestUseDebounce = () => {
  const [inputValue, setInputValue] = useState('');
  
  const debouncedValue = useDebounce(inputValue, 1000);

  const handleChange = (e: any)=>{
    
    setInputValue(e.target.value)
  }

  return (
    <div>
      <input type="text" value={inputValue} onChange={handleChange}/>
      <p>Debounced value: {debouncedValue}</p>
    </div>
  )
};

export default TestUseDebounce;
