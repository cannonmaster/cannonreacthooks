import { useCallback, useState } from "react";

const useCopyToClipboard = () => {
  const [text, setText] = useState<any>("");

  const copyToClipBoard = useCallback(async (value: string) => {
    if (!navigator.clipboard) {
      console.log(123);
    }

    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(value);
        setText(value);
      } catch (error) {
        console.error("Failed to copy to clipboard: ", error);
      }
    }
  }, []);

  return [text, copyToClipBoard];
};

export default useCopyToClipboard;
