import { useEffect, useState } from "react";

// Custom type for NetworkInformation
interface CustomNetworkInformation extends EventTarget {
  rtt?: number;
  type?: string;
  downlink?: number;
  saveData?: boolean;
  downlinkMax?: number;
  effectiveType?: string;
}

// Custom type for Navigator with the connection property
interface CustomNavigator extends Navigator {
  connection?: CustomNetworkInformation;
}

// Interface for NetworkState
interface NetworkState {
  online?: boolean;
  since?: Date;
  rtt?: number;
  type?: string;
  downlink?: number;
  saveData?: boolean;
  downlinkMax?: number;
  effectiveType?: string;
}

const useNetwork = (): NetworkState => {
  const [networkState, setNetworkState] = useState<NetworkState>({
    online: navigator.onLine,
    rtt: undefined,
    type: undefined,
    downlink: undefined,
    saveData: undefined,
    downlinkMax: undefined,
    effectiveType: undefined,
  });

  const updateNetworkState = () => {
    setNetworkState({
      online: navigator.onLine,
      since: new Date(),
      rtt: (navigator as CustomNavigator)?.connection?.rtt ?? undefined,
      type: (navigator as CustomNavigator)?.connection?.type ?? undefined,
      downlink:
        (navigator as CustomNavigator)?.connection?.downlink ?? undefined,
      saveData:
        (navigator as CustomNavigator)?.connection?.saveData ?? undefined,
      downlinkMax:
        (navigator as CustomNavigator)?.connection?.downlinkMax ?? undefined,
      effectiveType:
        (navigator as CustomNavigator)?.connection?.effectiveType ?? undefined,
    });
  };

  useEffect(() => {
    updateNetworkState();

    const handleOnlineStatusChange = () => {
      updateNetworkState();
    };

    const handleNetworkChange = () => {
      updateNetworkState();
    };

    window.addEventListener("online", handleOnlineStatusChange);
    window.addEventListener("offline", handleOnlineStatusChange);

    if ((navigator as CustomNavigator)?.connection) {
      (navigator as CustomNavigator).connection?.addEventListener(
        "change",
        handleNetworkChange
      );
    }

    return () => {
      window.removeEventListener("online", handleOnlineStatusChange);
      window.removeEventListener("offline", handleOnlineStatusChange);

      if ((navigator as CustomNavigator)?.connection) {
        (navigator as CustomNavigator).connection?.removeEventListener(
          "change",
          handleNetworkChange
        );
      }
    };
  }, []);

  return networkState;
};

export default useNetwork;
