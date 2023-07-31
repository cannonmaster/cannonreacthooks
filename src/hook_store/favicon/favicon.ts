import { useEffect } from "react";

const useFavicon = (url: string) => {
  useEffect(() => {
    const favicon: HTMLLinkElement | null =
      document.querySelector("link[rel='icon']");
    if (!favicon) {
      const _favicon = document.createElement("link");
      _favicon.rel = "icon";
      _favicon.href = url;
      document.head.appendChild(_favicon);
    } else {
      favicon.href = url;
    }
  }, [url]);
};
export default useFavicon;
