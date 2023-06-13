import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import Main from "./sideMenuComponents/connectedAccount/Main";
import Overview from "./sideMenuComponents/overview/Overview";
import Password from "./sideMenuComponents/password/Password";
import AccountSupport from "./sideMenuComponents/accountSupport/AccountSupport";
import SignInMethod from "./sideMenuComponents/signInMethod/SignInMethod";
import DeactivateAccount from "./sideMenuComponents/deactivateAccount/DeactivateAccount";
import Notifications from "./sideMenuComponents/notifications/Notifications";
import Refferals from "./sideMenuComponents/refferals/Refferals";
import InviteFriends from "./sideMenuComponents/inviteFriends/InviteFriends";
import useColor from "../../../utils/hooks/useColor";
import SideMenuAccordion from "./SideMenuAccordion";
import { useWindowDims } from "../../../utils/useWindowDims";
import { makeStyles } from "@mui/styles";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useMemo } from "react";
import { setSideMenuClick } from "../../../redux/slices/settingsSlice";
import Experience from "./sideMenuComponents/experience/Experience";
import GetVerified from "./sideMenuComponents/getverified/GetVerified";
import { TextTranslation } from "../../../utils/translation";
import Listings from "./sideMenuComponents/preferences/Listings";
import Agents from "./sideMenuComponents/preferences/Agents";
import Agencies from "./sideMenuComponents/preferences/Agencies";
import AllNotifications from "./sideMenuComponents/notifications/AllNotifications";
import UnreadNotifications from "./sideMenuComponents/notifications/UnreadNotifications";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    // width: "calc(100vw - 90px)",
  },
  conversations: { width: "20%" },
  messages: { width: "80%" },

  "@media (max-width: 1124px)": {
    conversations: { width: "30%" },
    messages: { width: "70%" },
  },
}));
const backSx = {
  height: 30,
  width: 100,
  backgroundColor: "#134696",
  color: "#fff",
  textTransform: "none",
  borderRadius: 20,
  margin: "10px 0px",
  "&:hover": {
    backgroundColor: "#134696",
  },
};

/* This SideMenu component is displayed in middle of the settings page. It navigate through different settings options using accordions  */
const SideMenu = () => {
  const classes = useStyles();
  const { width } = useWindowDims();
  const dispatch = useDispatch();

  const { sideMenuClick } = useSelector((state) => state.settings);
  const { colors, langIndex } = useSelector((state) => state.global);
  useColor(colors);
 /* renderBackButton toggles the visibility of the back button which should only be displayed if the window width is less than 750. */
  const renderBackButton = useMemo(() => {
    if (width < 750 && sideMenuClick)
      return (
        <Button
          startIcon={<ArrowBackIcon />}
          sx={backSx}
          onClick={() => dispatch(setSideMenuClick(""))}
        >
          {TextTranslation.back[langIndex]}
        </Button>
      );
    // eslint-disable-next-line
  }, [width, sideMenuClick]);

  return (
    <Box
      sx={{
        display: "flex",
        height: "calc(100vh - 144px)",
        flexDirection: "column",
      }}
    >
      {renderBackButton}

      {width > 750 ? (
        <div className={classes.container}>
          <div className={classes.conversations}>
            <SideMenuAccordion />
          </div>
          <div className={classes.messages}>
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                p: 1,
                height: "calc(100vh - 160px)",
                overflowY: "scroll",
                width: "100%",
              }}
            >
              {sideMenuClick === "connectedAccount" ? (
                <Main />
              ) : sideMenuClick === "overview" ? (
                <Overview />
              ) : sideMenuClick === "password" ? (
                <Password />
              ) : sideMenuClick === "experience" ? (
                <Experience />
              ) : sideMenuClick === "getverified" ? (
                <GetVerified />
              ) : sideMenuClick === "accountSupport" ? (
                <AccountSupport />
              ) : sideMenuClick === "signInMethod" ? (
                <SignInMethod />
              ) : sideMenuClick === "deactivateAccount" ? (
                <DeactivateAccount />
              ) : sideMenuClick === "notifications" ? (
                <Notifications />
              ) : sideMenuClick === "refferal" ? (
                <Refferals />
              ) : sideMenuClick === "invites" ? (
                <InviteFriends />
              ) : sideMenuClick === "preferenceListings" ? (
                <Listings />
              ) : sideMenuClick === "preferenceAgents" ? (
                <Agents />
              ) : sideMenuClick === "preferenceAgencies" ? (
                <Agencies />
              ) : sideMenuClick === "allNotifications" ? (
                <AllNotifications />
              ) : sideMenuClick === "unreadNotifications" ? (
                <UnreadNotifications />
              ) : null}
            </Box>
          </div>
        </div>
      ) : (
        <div className={classes.container}>
          {sideMenuClick === "" ? (
            <SideMenuAccordion />
          ) : (
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                p: 1,
                height: "calc(100vh - 160px)",
                overflowY: "scroll",
                width: "100%",
              }}
            >
              {sideMenuClick === "connectedAccount" ? (
                <Main />
              ) : sideMenuClick === "overview" ? (
                <Overview />
              ) : sideMenuClick === "password" ? (
                <Password />
              ) : sideMenuClick === "experience" ? (
                <Experience />
              ) : sideMenuClick === "getverified" ? (
                <GetVerified />
              ) : sideMenuClick === "accountSupport" ? (
                <AccountSupport />
              ) : sideMenuClick === "signInMethod" ? (
                <SignInMethod />
              ) : sideMenuClick === "deactivateAccount" ? (
                <DeactivateAccount />
              ) : sideMenuClick === "notifications" ? (
                <Notifications />
              ) : sideMenuClick === "refferal" ? (
                <Refferals />
              ) : sideMenuClick === "invites" ? (
                <InviteFriends />
              ) : sideMenuClick === "preferenceListings" ? (
                <Listings />
              ) : sideMenuClick === "preferenceAgents" ? (
                <Agents />
              ) : sideMenuClick === "preferenceAgencies" ? (
                <Agencies />
              ) : sideMenuClick === "allNotifications" ? (
                <AllNotifications />
              ) : sideMenuClick === "unreadNotifications" ? (
                <UnreadNotifications />
              ) : null}
            </Box>
          )}
        </div>
      )}
    </Box>
  );
};

SideMenu.propTypes = {
  window: PropTypes.func,
};

export default SideMenu;
