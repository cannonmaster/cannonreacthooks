import { useEffect, useState } from "react";

const useOrientation = () => {
  const [orientation, setOrientation] = useState<any>(
    window.screen.orientation.type
  );

  useEffect(() => {
    const handleOrientation = (e: any) => {
      if (window.screen.orientation) {
        setOrientation(window.screen.orientation.type);
      } else {
        setOrientation("unknown");
      }
    };
    window.addEventListener("orientationchange", handleOrientation);

    return () => {
      window.removeEventListener("orientationchange", handleOrientation);
    };
  }, []);

  return orientation;
};

export default useOrientation;
