import React, { Suspense, lazy, useEffect, useState } from "react";

import { makeStyles } from "@mui/styles";
// import callIcon from '../../../assets/settings/call.png';
// import moreIcon from '../../../assets/settings/more.png';
// import clipIcon from '../../../assets/settings/clip.png';
import sendIcon from "../../../assets/settings/send.png";
// import videoIcon from '../../../assets/settings/video.png';
// import emojiIcon from '../../../assets/settings/emoji.png';
// import searchIcon from '../../../assets/settings/search.png';
//import microphoneIcon from '../../../assets/settings/microphone.png';
import { useDispatch, useSelector } from "react-redux";
import { Avatar, IconButton } from "@mui/material";
import {
  getAllConversationMessages,
  markAsRead,
  sendMessage,
} from "../../../api/firebaseQueries";
import ComponentLoader from "../../globalComponents/ComponentLoader";
import useColor from "../../../utils/hooks/useColor";
import { TextTranslation } from "../../../utils/translation";
import ChatMessageSkeleton from "../../loadingSkeletons/ChatMessageSkeleton";
import { checkUniqueEmailExists } from "../../../api/dataApi";
import { useNavigate } from "react-router-dom";
import { createNotification } from "../../../redux/slices/notificationsSlice";
import { getNotificationFormData } from "../../../utils/helperFunctions";
const Messages = lazy(() => import("./Messages"));

const useStyles = makeStyles(() => ({
  scroll: {
    height: "calc(100vh - 230px)",
    overflowY: "scroll",
    overflowX: "hidden",
    width: "100%",
  },
  container: {
    display: "flex",
    flexGrow: 1,
    flex: 1,
    flexDirection: "column",
    alignItems: "space-between",
    justifyContent: "space-between",
    height: "calc(100vh - 215px)",
  },
  upper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: 50,
    borderBottom: "1px solid #D7DFE8",
  },
  upperLeftMain: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
  profilePic: {
    height: 40,
    width: 40,
    borderRadius: 20,
    objectFit: "cover",
    margin: "0 10px",
    cursor: "pointer",
  },
  username: {
    fontFamily: "heavy",
    fontSize: 18,
    color: "#292929",
  },
  userEmail: {
    fontFamily: "light",
    fontSize: 16,
    color: "#89949F",
  },
  upperRightMain: {
    display: "flex",
  },
  icons: {
    cursor: "pointer",
    margin: "0 5px",
  },
  lower: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderTop: "1px solid #D7DFE8",
  },
  inputMain: {
    width: "90%",
    display: "flex",
    alignItems: "center",
    position: "relative",
    backgroundColor: "#F6F8FA",
    borderRadius: 10,
    padding: "0 10px",
  },
  input: {
    display: "flex",
    flex: 1,
    width: "100%",
    height: 35,
    border: "none",
    fontFamily: "medium",
    fontSize: 16,
    "&:focus": {
      outline: "none",
    },
    color: "#9DAFBD",
    backgroundColor: "#F6F8FA",
    // borderRadius: 10,
    // padding: '0 10px',
  },
}));

/* UserChat is the window on right which contains the selected conversation name, avatar and email. It also renders the Messages component. */
const UserChat = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [chatMessage, setChatMessage] = useState("");
  const [senderId, setSenderId] = useState();
  const [loadingMessages, setLoadingMessages] = useState(false);

  const { colors, darkMode, langIndex } = useSelector((state) => state.global);
  const { selectedConversation, conversationMessages } = useSelector(
    (state) => state.chat
  );
  const currentUser = useSelector((state) => state.auth.currentUser);

  useColor(colors);

  /* this useEffect gets userId when a conversation is selected. */
  useEffect(() => {
    getUserId();

    // eslint-disable-next-line
  }, [selectedConversation]);

  /* When a conversation is selected, this useEffect marks it as read. */
  useEffect(() => {
    // console.log({ selectedConversation });
    markRead(selectedConversation?.id);

    // eslint-disable-next-line
  }, [selectedConversation]);

  /* This useEffect gets all the messages of a conversation using firebase query "getAllConversationMessages" */
  useEffect(() => {
    setLoadingMessages(true);
    const messageListener = getAllConversationMessages(
      dispatch,
      selectedConversation?.id,
      setLoadingMessages
    );
    return () => {
      messageListener();
    };
    // eslint-disable-next-line
  }, [selectedConversation]);

  /* getSenderInfo takes users and prop to get senders' information from the firebase document. Users are the senders. Prop is the attribute we want to get. */
  const getSenderInfo = (users, prop) => {
    if (prop === "photo") {
      const photoUrl = users?.filter(
        (elem) => elem?.id !== currentUser?.firebaseDocId
      )[0]?.[prop];
      // eslint-disable-next-line
      if (photoUrl?.charAt(0) === "/") return photoUrl;
      else return `/${photoUrl}`;
    } else {
      return users?.filter(
        (elem) => elem?.id !== currentUser?.firebaseDocId
      )[0]?.[prop];
    }
  };

  /* handleSendMessage calls sendMessage firebase query with message content, sender, receiver Id and time. It also dispatches createNotification to notificationSlice to generate notification to the receiver's account.  */
  const handleSendMessage = async () => {
    await sendMessage({
      sender: currentUser?.firebaseDocId,
      receiver: getSenderInfo(selectedConversation?.users, "id"),
      text: chatMessage,
      conversationId: selectedConversation?.id,
      time: new Date(),
    });
    setChatMessage("");
    dispatch(
      createNotification({
        values: getNotificationFormData({
          sender: currentUser?.id,
          receiver: senderId,
          body: selectedConversation?.id,
          title: `message=${chatMessage}`,
        }),
        token: currentUser?.token,
      })
    );
  };

  /* markRead takes conversation as parameter and marks it as read. */
  const markRead = async (conversation) => {
    // console.log("marking as read", { selectedConversation });
    await markAsRead(conversation);
  };

  /* getUserId gets response as selected conversation's email and if response is received, it sets sender id equal to that received in response. */
  const getUserId = async () => {
    setLoadingMessages(true);
    const response = await checkUniqueEmailExists(
      getSenderInfo(selectedConversation?.users, "email")
    );
    if (response) {
      setLoadingMessages(false);
      setSenderId(response?.result?.user_id);
    }
    setLoadingMessages(false);
  };

  return (
    <div className={classes.container}>
      <div className={classes.upper}>
        <div
          className={classes.upperLeftMain}
          onClick={() => navigate(`/agents/${senderId}`)}
        >
          <Avatar
            src={`${getSenderInfo(selectedConversation?.users, "photo")}`}
            className={classes.profilePic}
            alt={getSenderInfo(selectedConversation?.users, "name")}
          />

          <div>
            <div
              className={classes.username}
              style={{ color: darkMode ? colors?.white : colors?.black }}
            >
              {getSenderInfo(selectedConversation?.users, "name")}
            </div>
            <div className={classes.userEmail}>
              {getSenderInfo(selectedConversation?.users, "email")}
            </div>
          </div>
        </div>
        {/* <div className={classes.upperRightMain}>
            <img className={classes.icons} alt="video" src={videoIcon} />
            <img className={classes.icons} alt="audio" src={callIcon} />
            <img className={classes.icons} alt="search" src={searchIcon} />
            <img className={classes.icons} alt="more" src={moreIcon} />
          </div> */}
      </div>
      {loadingMessages ? (
        <ChatMessageSkeleton />
      ) : (
        <>
          {conversationMessages?.length > 0 && (
            <Suspense fallback={<ComponentLoader />}>
              {selectedConversation && <Messages />}
            </Suspense>
          )}
        </>
      )}

      <div className={classes.lower}>
        <div className={classes.inputMain}>
          <input
            type="text"
            className={classes.input}
            placeholder={TextTranslation.typeYourMessage[langIndex]}
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
            onKeyUp={(key) => {
              if (key.code === "Enter" && chatMessage.trim().length > 0) {
                handleSendMessage();
              }
            }}
          />
          {/* <img className={classes.icons} alt="emoji" src={emojiIcon} />
            <img className={classes.icons} alt="clip" src={clipIcon} />
            <img
              className={classes.icons}
              alt="microphone"
              src={microphoneIcon}
            /> */}
          <IconButton
            sx={{ p: 0, m: 0 }}
            onClick={handleSendMessage}
            disabled={chatMessage?.trim()?.length <= 0}
          >
            <img className={classes.icons} alt="send" src={sendIcon} />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default UserChat;
