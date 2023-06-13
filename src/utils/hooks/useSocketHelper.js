import { useDispatch, useSelector } from "react-redux";

import useWebSocket, { ReadyState } from "react-use-websocket";
import { handleNewNotification } from "../../redux/slices/notificationsSlice";
import { SOCKET_API_URL } from "../constants";

/**
 * Custom hook for managing a WebSocket connection and handling socket events.
 *
 * @returns {string} - Connection status of the WebSocket.
 */
const useSocketHelper = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const handleSocketConnection = () => {
    // console.log("connected");
  };

    // Handle incoming socket message
  const handleSocketMessage = (message) => {
    const messageData = JSON.parse(message?.data);
    if (messageData?.id) {
      dispatch(handleNewNotification(messageData));
    }
    // console.log("new Message...", { messageData });
  };

    // Handle socket reconnect
  const handleSocketReconnect = (closeEvent) => {
    // console.log("Socket closed...", { closeEvent });
    return true;
  };
  const {
    //FOR FUTURE USE
    // sendMessage,
    // sendJsonMessage,
    // lastMessage,
    // lastJsonMessage,
    readyState,
  } = useWebSocket(SOCKET_API_URL, {
    queryParams: {
      token: currentUser?.token,
    },
    onOpen: handleSocketConnection,
    shouldReconnect: handleSocketReconnect,
    onMessage: handleSocketMessage,
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

export default useSocketHelper;
