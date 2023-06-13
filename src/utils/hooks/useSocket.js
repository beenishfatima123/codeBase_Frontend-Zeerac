import useWebSocket, { ReadyState } from "react-use-websocket";

/**
 * Custom hook for managing a WebSocket connection.
 *
 * @param {string} url - WebSocket server URL.
 * @param {object} params - Query parameters for the WebSocket connection.
 * @param {function} handleMessage - Function to handle incoming WebSocket messages.
 * @param {function} handleOpen - Function to handle WebSocket connection open event.
 * @param {function} handleReconnect - Function to handle WebSocket reconnection.
 * @returns {string} - Connection status of the WebSocket.
 */
const useSocket = (url, params, handleMessage, handleOpen, handleReconnect) => {
  const handleSocketConnection = () => {
    console.log("connected to auction socket");
  };

  // Handle socket reconnect
  const handleSocketReconnect = (closeEvent) => {
    console.log("Socket closed...", { closeEvent });
    return true;
  };
  const {
    //FOR FUTURE USE
    // sendMessage,
    // sendJsonMessage,
    // lastMessage,
    // lastJsonMessage,
    readyState,
  } = useWebSocket(url, {
    queryParams: params,
    onOpen: handleOpen || handleSocketConnection,
    shouldReconnect: handleReconnect || handleSocketReconnect,
    onMessage: handleMessage,
  });

  // Map ready state to connection status
  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  return connectionStatus;
};

export default useSocket;
