import * as React from "react";

export const useWebSockets = (url: string, callback: (data: any) => void) => {
  React.useEffect(() => {
    const webSocket: WebSocket = new WebSocket(url);
    webSocket.onmessage = (d) => {
      callback(JSON.parse(d.data))
    };
    return () => {
      webSocket.close();
    }
  }, [url, callback]);
};
