import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { makeStyles } from "@mui/styles";
import "./misc.css";
import { useState } from "react";
import { Button } from "@mui/material";
import LoginContainer from "../../loginComponents/LoginContainer";
import { useDispatch, useSelector } from "react-redux";
import {
  checkIfConversationExists,
  sendMessage,
  startConversation,
} from "../../../api/firebaseQueries";
import { useNavigate } from "react-router-dom";
import ComponentLoader from "../../globalComponents/ComponentLoader";
import { SETTING_URLS } from "../../../utils/constants";
import { createNotification } from "../../../redux/slices/notificationsSlice";
import { getNotificationFormData } from "../../../utils/helperFunctions";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    color: "#6B7B88",
    fontSize: 16,
    margin: 0,
  },
}));

const ChatMenu = ({ anchorEl, setAnchorEl, property, agent, agency }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const open = Boolean(anchorEl);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  const currentUser = useSelector((state) => state.auth.currentUser);
  const handleChange = (prop) => (event) => {
    setData((prev) => {
      return { ...prev, [prop]: event.target.value };
    });
  };
  const checkExistingConversation = async (user1, user2) => {
    const check1 = await checkIfConversationExists(user1, user2);
    if (check1) return check1;
    else return await checkIfConversationExists(user2, user1);
  };
  const getUsers = () => {
    let receiver = {};
    const user = {
      first_name: currentUser?.first_name,
      last_name: currentUser?.last_name,
      photo: currentUser?.photo,
      email: currentUser?.email,
      firebaseDocId: currentUser?.firebaseDocId,
    };
    if (property)
      receiver = {
        name: `${property?.user?.first_name} ${property?.user?.last_name}`,
        photo: property?.user?.photo,
        email: property?.user?.email,
        id: property?.user?.email,
      };
    else if (agent) {
      if (agent?.company_email)
        receiver = {
          name: `${agent?.company_name}`,
          photo: agent?.company_logo,
          email: agent?.company_email,
          id: agent?.company_email,
        };
      else
        receiver = {
          name: `${agent?.first_name} ${agent?.last_name}`,
          photo: agent?.photo,
          email: agent?.email,
          id: agent?.email,
        };
    } else if (agency) {
      if (agency?.admin?.email)
        receiver = {
          name: `${agency?.admin?.full_name}`,
          photo: agency?.admin?.photo,
          email: agency?.admin?.email,
          id: agency?.admin?.email,
        };
    }
    return { user, receiver };
  };

  const handleStartConversation = async () => {
    const { user, receiver } = getUsers();
    // console.log({ data, property, agent, currentUser, user, receiver });
    try {
      setLoading(true);
      const alreadyExists = await checkExistingConversation(
        currentUser?.firebaseDocId,
        receiver?.id
      );
      // console.log({ alreadyExists });
      if (alreadyExists) {
        await sendMessage({
          sender: currentUser?.firebaseDocId,
          receiver: receiver?.id,
          text: data?.message,
          conversationId: alreadyExists?.id,
          time: new Date(),
        });
        dispatch(
          createNotification({
            values: getNotificationFormData({
              sender: currentUser?.id,
              receiver: agency ? agency?.admin?.id : agent?.id,
              body: alreadyExists?.id,
              title: `message=${data?.message}`,
            }),
            token: currentUser?.token,
          })
        );
        navigate(`/settings/${SETTING_URLS?.CHAT}/${alreadyExists?.id}`);
      } else {
        await startConversation({
          user,
          receiver,
          lm: data?.message,
        });
        const createdConversation = await checkExistingConversation(
          user?.firebaseDocId,
          receiver?.id
        );

        // console.log({ createdConversation });
        if (createdConversation) {
          await sendMessage({
            sender: currentUser?.firebaseDocId,
            receiver: receiver?.id,
            text: data?.message,
            conversationId: createdConversation?.id,
            time: new Date(),
          });
          dispatch(
            createNotification({
              values: getNotificationFormData({
                sender: currentUser?.id,
                receiver: agency ? agency?.admin?.id : agent?.id,
                body: createdConversation?.id,
                title: `conversation=${data?.message}`,
              }),
              token: currentUser?.token,
            })
          );
          navigate(
            `/settings/${SETTING_URLS?.CHAT}/${createdConversation?.id}`
          );
        }
      }
      setData();
      setAnchorEl(null);
    } catch (error) {
      setLoading(false);
      //console.log({ error });
    }
  };

  return (
    <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
      <MenuItem
        disableRipple
        sx={{
          "&:hover": {
            background: "none",
          },
          transitionDuration: "0s !important",
        }}
      >
        {currentUser ? (
          <div className={classes.container}>
            {loading ? (
              <ComponentLoader />
            ) : (
              <>
                <p className={classes.title}>Chat with Agent</p>
                {/* <ChatTextField
            label={"Name"}
            onChange={handleChange("name")}
            value={data?.name}
          />
          <ChatTextField
            label={"Phone Number"}
            onChange={handleChange("phone")}
            value={data?.phone}
          />
          <ChatTextField
            label={"Email"}
            onChange={handleChange("email")}
            value={data?.email}
          /> */}
                <textarea
                  placeholder="Message"
                  cols="30"
                  rows="5"
                  className="chat-input"
                  onChange={handleChange("message")}
                  value={data?.message}
                ></textarea>
                {data?.message.length > 1 ? (
                  <Button
                    sx={{
                      backgroundColor: "#0ED864",
                      borderRadius: "5px",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "#0ED864",
                      },
                    }}
                    onClick={handleStartConversation}
                    fullWidth
                  >
                    start chat
                  </Button>
                ) : (
                  <p>Can't send an empty message</p>
                )}
              </>
            )}
          </div>
        ) : (
          <LoginContainer />
        )}
      </MenuItem>
    </Menu>
  );
};

export default ChatMenu;
