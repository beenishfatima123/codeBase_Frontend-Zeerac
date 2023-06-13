import React, { useMemo } from "react";
import { makeStyles } from "@mui/styles";
//import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from "react-redux";
import useColor from "../../../utils/hooks/useColor";
import { useWindowDims } from "../../../utils/useWindowDims";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { setSelectedConversation } from "../../../redux/slices/chatSlice";
import { TextTranslation } from "../../../utils/translation";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: 70,
    borderBottom: "1px solid #D7DFE8",
  },
  left: {
    display: "flex",
    flexDirection: "column",
  },
  messageLabel: {
    fontSize: 22,
    fontFamily: "heavy",
    color: "#292929",
  },
  messageDetail: {
    fontSize: 16,
    fontFamily: "light",
    color: "#ADA7A7",
  },
  right: {
    display: "flex",
    alignItems: "center",
    padding: "10px 12px",
    borderRadius: 10,
    border: "1px solid #9DAFBD",
    position: "relative",
    width: 300,
  },
  input: {
    display: "flex",
    flex: 1,
    border: "none",
    fontSize: 16,
    "&:focus": {
      outline: "none",
    },
    color: "#9DAFBD",
  },
}));
const backSx = {
  height: 30,
  width: 100,
  backgroundColor: "#134696",
  color: "#fff",
  textTransform: "none",
  borderRadius: 20,
  "&:hover": {
    backgroundColor: "#134696",
  },
};

/* MessageInfo displays "All Messages" on top of messages window and renders back button when  the screen width < 750. */
const MessageInfo = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { width } = useWindowDims();

  const { colors, darkMode, langIndex } = useSelector((state) => state.global);

  const { selectedConversation } = useSelector((state) => state.chat);
  useColor(colors);

  /* renderBackButton displays back button when width of window is less than 750 and a conversation is selected. */
  const renderBackButton = useMemo(() => {
    if (width < 750 && selectedConversation)
      return (
        <Button
          startIcon={<ArrowBackIcon />}
          sx={backSx}
          onClick={() => dispatch(setSelectedConversation(null))}
        >
          {TextTranslation.back[langIndex]}
        </Button>
      );
    // eslint-disable-next-line
  }, [width, selectedConversation]);
  return (
    <>
      <div className={classes.container}>
        <div className={classes.left}>
          <div
            className={classes.messageLabel}
            style={{ color: darkMode ? colors?.white : colors?.black }}
          >
            {TextTranslation.allMessages[langIndex]}
          </div>
          {/* <div className={classes.messageDetail}>351 Messages, 8 Unread </div> */}
        </div>
        {renderBackButton}
        {/* <div className={classes.right}>
          <SearchIcon style={{ color: '#9DAFBD' }} />
          <input
            type="text"
            className={classes.input}
            placeholder={'Search Here'}
            style={{
              backgroundColor: darkMode ? colors?.jetBlack : colors?.white,
            }}
          />
        </div> */}
      </div>
      {/* <Divider sx={{ mt: 2, backgroundColor: '#D7DFE8' }} /> */}
    </>
  );
};

export default MessageInfo;
