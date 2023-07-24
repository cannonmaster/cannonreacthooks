import { useState } from "react";
import { useCopyToClipboard } from "@cannonui/reacthooks";

const TestUseCopyToClipBoard = () => {
  const [textToCopy, setTextCopy] = useState("");
  const [copiedText, copyToClipBoard] = useCopyToClipboard();

  const handleChange = (e: any) => {
    setTextCopy(e.target.value);
  };

  const handleCopyToClipBoard = (e: any) => {
    copyToClipBoard(textToCopy);
  };
  return (
    <div>
      <input
        type="text"
        value={textToCopy}
        onChange={handleChange}
        placeholder="please enter text"
      />
      <button onClick={(e) => handleCopyToClipBoard(e)}>
        copy to clipboard
      </button>
      {copiedText && <p>Copied: {copiedText}</p>}
    </div>
  );
};

export default TestUseCopyToClipBoard;
