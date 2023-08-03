import { useEffect, useState } from "react";
// import useCacheServerImage from "./cacheServerImage";
import { useCacheServerImage } from "@cannonui/reacthooks";
const TestUseCacheServerImage = () => {
  const [image, setImageUrl] = useState<string>("");
  const { getFromCache } = useCacheServerImage();
  useEffect(() => {
    const getImage = async () => {
      let imageUrl;
      imageUrl = await getFromCache("https://placehold.co/60000x5000");

      if (imageUrl) {
        setImageUrl(URL.createObjectURL(imageUrl));
      }
    };
    getImage();
  }, []);

  return (
    <div>
      <img src={image} alt="" />
    </div>
  );
};
export default TestUseCacheServerImage;
