import React, { useEffect, useRef } from "react";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import moment from "moment";
import useColor from "../../../utils/hooks/useColor";

const useStyles = makeStyles(() => ({
  scroll: {
    height: "calc(100vh - 310px)",
    overflowY: "scroll",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "space-between",
    justifyContent: "center",
  },
  receiver: {
    fontSize: 16,
    fontFamily: "light",
    color: "#292929",
    backgroundColor: "#F1F6FA",
    padding: 10,
    margin: 10,
    maxWidth: "50%",
    width: "fit-content",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    borderRadius: "0px 10px 10px 10px",
  },
  sender: {
    fontSize: 16,
    fontFamily: "light",
    color: "#ffffff",
    backgroundColor: "#134696",
    padding: 10,
    margin: 10,
    width: "fit-content",
    maxWidth: "50%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    alignSelf: "flex-end",
    borderRadius: "10px 0px 10px 10px",
  },
  time: {
    fontSize: 16,
    fontFamily: "light",
    color: "#A8A8A8",
    alignSelf: "flex-end",
    marginTop: 5,
  },
}));

/* This Messages component maps the messages from or to the selected conversation along with the time and displays it in the userChat component window. It also styles message according to sent or received status. */
const Messages = () => {
  const classes = useStyles();
  const lastMessageRef = useRef();
  const { colors, darkMode } = useSelector((state) => state.global);

  const { conversationMessages } = useSelector((state) => state.chat);
  const currentUser = useSelector((state) => state.auth.currentUser);

  /* this useEffect scrolls down to the last message ini conversation window. */
  useEffect(() => {
    if (conversationMessages?.length && lastMessageRef?.current)
      lastMessageRef?.current?.scrollIntoView();
  }, [conversationMessages]);

  useColor(colors);

  return (
    <div className={classes.scroll}>
      {conversationMessages?.map((item, index) => (
        <div className={classes.container} key={index}>
          <div
            className={
              item?.sender === currentUser?.firebaseDocId
                ? classes.sender
                : classes.receiver
            }
            style={{
              backgroundColor:
                item?.sender === currentUser?.firebaseDocId && colors?.primary,
            }}
          >
            {item?.message}
            <div
              className={classes.time}
              style={{
                color:
                  item?.sender === currentUser?.firebaseDocId && darkMode
                    ? colors?.white
                    : colors?.gray,
              }}
            >
              {moment(item?.createdAt?.toDate()).format("hh:MM ")}
            </div>
          </div>
        </div>
      ))}
      <div ref={lastMessageRef} />
    </div>
  );
};

export default Messages;
