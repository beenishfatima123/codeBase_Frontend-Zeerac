import React, { Suspense, lazy, useEffect, useState } from "react";

import UserList from "./UserList";
import MessageInfo from "./MessageInfo";
import PersonalInfo from "./PersonalInfo";
import { useDispatch, useSelector } from "react-redux";
import ComponentLoader from "../../globalComponents/ComponentLoader";
import { makeStyles } from "@mui/styles";
import { useWindowDims } from "../../../utils/useWindowDims";
import NotFound from "../../globalComponents/NotFound";
import { getAllConversations } from "../../../api/firebaseQueries";
import { TextTranslation } from "../../../utils/translation";
import { useParams } from "react-router-dom";
import { setSelectedConversation } from "../../../redux/slices/chatSlice";
const UserChat = lazy(() => import("./UserChat"));

const useStyles = makeStyles(() => ({
  mainContainer: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    // height: "100%",
  },
  conversations: { width: "30%" },
  messages: { width: "70%" },

  "@media (max-width: 1124px)": {
    conversations: { width: "40%" },
    messages: { width: "60%" },
  },
}));

/* Main component is rendered when "message" tab is selected on the settings page. */
const Main = () => {
  const classes = useStyles();
  const { width } = useWindowDims();
  const { id } = useParams();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const { selectedConversation, allConversations } = useSelector(
    (state) => state.chat
  );
  const currentUser = useSelector((state) => state.auth.currentUser);
  const { langIndex } = useSelector((state) => state.global);

  /* this useEffect uses id from useParams hook to set the selected conversation equal to that id. */
  useEffect(() => {
    // console.log({ allConversations });
    allConversations?.forEach((element) => {
      if (`${element?.id}` === `${id}`)
        dispatch(setSelectedConversation(element));
    });
    // eslint-disable-next-line
  }, [id]);

  /* this useEffect gets conversations from the firebase query using currentUser's ID. */
  useEffect(() => {
    setLoading(true);

    const conversationListener = getAllConversations(
      dispatch,
      currentUser?.firebaseDocId,
      setLoading
    );
    return () => {
      conversationListener();
    };
    // eslint-disable-next-line
  }, [currentUser]);
  return (
    <div className={classes.mainContainer}>
      {loading ? (
        <ComponentLoader />
      ) : (
        <>
          <PersonalInfo />
          <MessageInfo />
          {width > 750 ? (
            <div className={classes.container}>
              {allConversations?.length > 0 ? (
                <>
                  <div className={classes.conversations}>
                    <UserList />
                  </div>
                  <div className={classes.messages}>
                    <Suspense fallback={<ComponentLoader />}>
                      {selectedConversation && <UserChat />}
                    </Suspense>
                  </div>
                </>
              ) : (
                <NotFound
                  label={TextTranslation.noConversationFound[langIndex]}
                />
              )}
            </div>
          ) : (
            <Suspense fallback={<ComponentLoader />}>
              <div className={classes.container}>
                {!selectedConversation ? <UserList /> : <UserChat />}
              </div>
            </Suspense>
          )}
        </>
      )}
    </div>
  );
};

export default Main;
