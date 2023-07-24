import { useState, useEffect } from "react";

interface Location {
  trigger: string;
  state: Record<string, any> | null;
  length: number;
  hash: string;
  host: string;
  hostname: string;
  href: string;
  origin: string;
  pathname: string;
  port: string;
  protocol: string;
  search: string;
}

const useLocation = () => {
  const [location, setLocation] = useState<Location>({
    trigger: "",
    state: null,
    length: window.history.length,
    hash: window.location.hash,
    host: window.location.host,
    hostname: window.location.hostname,
    href: window.location.href,
    origin: window.location.origin,
    pathname: window.location.pathname,
    port: window.location.port,
    protocol: window.location.protocol,
    search: window.location.search,
  });

  const handleLocationChange = (trigger: string) => {
    setLocation({
      trigger,
      state: window.history.state,
      length: window.history.length,
      hash: window.location.hash,
      host: window.location.host,
      hostname: window.location.hostname,
      href: window.location.href,
      origin: window.location.origin,
      pathname: window.location.pathname,
      port: window.location.port,
      protocol: window.location.protocol,
      search: window.location.search,
    });
  };

  useEffect(() => {
    const popstate = () => handleLocationChange("popstate");
    window.addEventListener("popstate", popstate);
    const hashchange = () => handleLocationChange("hashchange");
    window.addEventListener("hashchange", hashchange);

    return () => {
      window.removeEventListener("popstate", popstate);
      window.removeEventListener("hashchange", hashchange);
    };
  }, []);

  return location;
};

export default useLocation;
