import React, { Suspense, lazy, useEffect, useMemo } from "react";

import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedAgent } from "../../../redux/slices/agentsSlice";
import ComponentLoader from "../../globalComponents/ComponentLoader";
import SettingsAccordion from "./SettingsAccordion";
import { useLocation, useNavigate } from "react-router-dom";
import { useWindowDims } from "../../../utils/useWindowDims";
import { TextTranslation } from "../../../utils/translation";
import { Box, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { PROFILE_SUB_TABS } from "../../../utils/constants";

const Main = lazy(() => import("./sideMenuComponents/connectedAccount/Main"));
const Overview = lazy(() => import("./sideMenuComponents/overview/Overview"));
const Password = lazy(() => import("./sideMenuComponents/password/Password"));
const Experience = lazy(() =>
  import("./sideMenuComponents/experience/Experience")
);
const GetVerified = lazy(() =>
  import("./sideMenuComponents/getverified/GetVerified")
);
const AccountSupport = lazy(() =>
  import("./sideMenuComponents/accountSupport/AccountSupport")
);
const SignInMethod = lazy(() =>
  import("./sideMenuComponents/signInMethod/SignInMethod")
);
const DeactivateAccount = lazy(() =>
  import("./sideMenuComponents/deactivateAccount/DeactivateAccount")
);
const AllNotifications = lazy(() =>
  import("./sideMenuComponents/notifications/AllNotifications")
);
const UnreadNotifications = lazy(() =>
  import("./sideMenuComponents/notifications/UnreadNotifications")
);
const InviteFriends = lazy(() =>
  import("./sideMenuComponents/inviteFriends/InviteFriends")
);
const Listings = lazy(() =>
  import("./sideMenuComponents/preferences/Listings")
);
const Agents = lazy(() => import("./sideMenuComponents/preferences/Agents"));
const Agencies = lazy(() =>
  import("./sideMenuComponents/preferences/Agencies")
);

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
  "@media (max-width: 750px)": {
    container: { flexDirection: "column" },
  },
}));

/* UserSettingsContainer renders all other components in user settings page. */
const UserSettingsContainer = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { width } = useWindowDims();
  const { pathname } = useLocation();

  const { currentUser } = useSelector((state) => state.auth);
  const { selectedAgentApiInfo } = useSelector((state) => state.agents);
  const { langIndex } = useSelector((state) => state.global);

  useEffect(() => {
    dispatch(getSelectedAgent({ id: currentUser?.id }));
    // eslint-disable-next-line
  }, []);
  const path = useMemo(
    () => pathname?.split("/")?.filter((elem) => elem !== ""),
    [pathname]
  );
  const renderBackButton = useMemo(() => {
    if (width < 750 && path?.length > 2)
      return (
        <Button
          startIcon={<ArrowBackIcon />}
          sx={backSx}
          onClick={() => navigate(`/settings/profile`)}
        >
          {TextTranslation.back[langIndex]}
        </Button>
      );
    // eslint-disable-next-line
  }, [width, path]);

  const renderContent = useMemo(() => {
    // console.log({ path: path[3], path });
    switch (path[3]) {
      case PROFILE_SUB_TABS?.CONNECTED_ACCOUNTS:
        return <Main />;
      case PROFILE_SUB_TABS?.OVERVIEW:
        return <Overview />;
      case PROFILE_SUB_TABS?.PASSWORD:
        return <Password />;
      case PROFILE_SUB_TABS?.EXPERIENCE:
        return <Experience />;
      case PROFILE_SUB_TABS?.VERIFIED:
        return <GetVerified />;
      case PROFILE_SUB_TABS?.SUPPORT:
        return <AccountSupport />;
      case PROFILE_SUB_TABS?.SIGN_IN_METHOD:
        return <SignInMethod />;
      case PROFILE_SUB_TABS?.DEACTIVATE_ACCOUNT:
        return <DeactivateAccount />;
      case PROFILE_SUB_TABS?.ALL_NOTIFICATIONS:
        return <AllNotifications />;
      case PROFILE_SUB_TABS?.UNREAD_NOTIFICATIONS:
        return <UnreadNotifications />;
      case PROFILE_SUB_TABS?.INVITES:
        return <InviteFriends />;
      case PROFILE_SUB_TABS?.LISTING_PREFERENCES:
        return <Listings />;
      case PROFILE_SUB_TABS?.AGENT_PREFERENCES:
        return <Agents />;
      case PROFILE_SUB_TABS?.AGENCY_PREFERENCES:
        return <Agencies />;
      default:
        return <Overview />;
    }
  }, [path]);
  return (
    <>
      {selectedAgentApiInfo?.loading ? (
        <ComponentLoader />
      ) : (
        <div style={{ width: "100%", overflowX: "hidden" }}>
          {renderBackButton}
          {width > 750 ? (
            <div className={classes.container}>
              <div className={classes.conversations}>
                <SettingsAccordion />
              </div>
              <div className={classes.messages}>
                <Box
                  component="main"
                  sx={{
                    flexGrow: 1,
                    p: 1,
                    height: "calc(100vh - 200px)",
                    overflowY: "scroll",
                    width: "100%",
                  }}
                >
                  <Suspense fallback={<ComponentLoader />}>
                    {renderContent}
                  </Suspense>
                </Box>
              </div>
            </div>
          ) : (
            <div className={classes.container}>
              {path?.length > 2 ? <> {renderContent}</> : <SettingsAccordion />}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default UserSettingsContainer;
