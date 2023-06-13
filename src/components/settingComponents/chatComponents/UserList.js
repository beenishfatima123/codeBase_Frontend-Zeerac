import React from "react";
import { makeStyles } from "@mui/styles";

import { useDispatch, useSelector } from "react-redux";
import moment from "moment/moment";
import { Avatar } from "@mui/material";
import { setSelectedConversation } from "../../../redux/slices/chatSlice";
import useColor from "../../../utils/hooks/useColor";
import { SETTING_URLS } from "../../../utils/constants";
import Badge from "@mui/material/Badge";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles(() => ({
  scroll: {
    height: "calc(100vh - 215px)",
    overflowY: "scroll",
    overflowX: "hidden",
    width: "100%",
    borderRight: "1px solid gray",
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 10px",
    height: 60,
    cursor: "pointer",
  },
  left: {
    display: "flex",
    alignItems: "center",
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    objectFit: "cover",
  },
  name: {
    fontSize: 18,
    fontFamily: "medium",
    color: "#292929",
  },
  message: {
    fontSize: 16,
    fontFamily: "light",
    color: "#A8A8A8",
    height: 25,
    overflow: "hidden",
  },
  time: {
    fontSize: 16,
    fontFamily: "light",
    color: "#A8A8A8",
  },
  unread: {
    width: 20,
    height: 20,
    borderRadius: 10,
    fontSize: 14,
    fontFamily: "medium",
    color: "#ffffff",
    backgroundColor: "#D83F50",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    float: "right",
  },
}));

/* UserList is displayed on the left of message window containing the list of senders from latest to oldest along with their last message and time of that message. */
const UserList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector((state) => state.auth.currentUser);
  const { allConversations, selectedConversation } = useSelector(
    (state) => state.chat
  );
  const { colors, darkMode } = useSelector((state) => state.global);
  useColor(colors);

  /* getSenderInfo takes users and prop to get senders' information from the firebase document. Users are the senders. Prop is the attribute we want to get. */
  const getSenderInfo = (users, prop) => {
    if (prop === "photo") {
      const photoUrl = users?.filter(
        (elem) => elem?.id !== currentUser?.firebaseDocId
      )[0]?.[prop];

      if (photoUrl?.charAt(0) === "/") return photoUrl;
      else return `/${photoUrl}`;
    } else {
      return users?.filter(
        (elem) => elem?.id !== currentUser?.firebaseDocId
      )[0]?.[prop];
    }
  };
  return (
    <div className={classes.scroll}>
      {allConversations?.map((item, index) => (
        <div
          key={index}
          className={classes.container}
          onClick={() => {
            dispatch(setSelectedConversation(item));
            navigate(`/settings/${SETTING_URLS?.CHAT}/${item?.id}`);
          }}
          style={{
            backgroundColor:
              selectedConversation?.id === item?.id && !darkMode
                ? colors?.selectedChat
                : selectedConversation?.id === item?.id &&
                  darkMode &&
                  colors?.primary,
          }}
        >
          <div className={classes.left}>
            <Avatar
              src={`${getSenderInfo(item?.users, "photo")}`}
              className={classes.profilePic}
              alt={getSenderInfo(item?.users, "name")}
            />

            <div style={{ marginLeft: 10 }}>
              <div
                className={classes.name}
                style={{
                  color: darkMode ? colors?.white : colors?.black,
                }}
              >
                {getSenderInfo(item?.users, "name")}
              </div>
              <div
                className={classes.message}
                style={{
                  color:
                    selectedConversation?.id === item?.id && darkMode
                      ? colors?.white
                      : "",
                }}
              >
                {item?.lastMessage}
              </div>
            </div>
          </div>
          <Badge
            color="secondary"
            badgeContent={
              !item?.lastMessageRead &&
              item?.lastMessageSender !== currentUser?.firebaseDocId
                ? 1
                : 0
            }
          >
            <div
              className={classes.time}
              style={{
                color:
                  selectedConversation?.id === item?.id && darkMode
                    ? colors?.white
                    : "",
              }}
            >
              {moment(new Date(item?.lastMessageTime?.toDate())).fromNow()}
            </div>
          </Badge>
        </div>
      ))}
    </div>
  );
};

export default UserList;
