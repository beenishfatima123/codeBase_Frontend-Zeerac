import PropTypes from "prop-types";
import React, { Suspense, lazy } from "react";
import { useMemo } from "react";
import ComponentLoader from "../globalComponents/ComponentLoader";
import BecomeAnAgentContainer from "./becomeAnAgent/BecomeAnAgentContainer";
import RegisterCompany from "./registerCompany/RegisterCompany";
import CustomDrawer from "./CustomDrawer";
import { useWindowDims } from "../../utils/useWindowDims";
import { SETTING_URLS } from "../../utils/constants";
import { useParams } from "react-router-dom";

const Chat = lazy(() => import("./chatComponents/Main"));
// const Profile = lazy(() => import("./profileComponents/Main"));
const Settings = lazy(() => import("../../pages/settings/Settings"));
const MyListingsContainer = lazy(() =>
  import("./myListings/MyListingsContainer")
);
const SavedListingsContainer = lazy(() =>
  import("./savedListings/SavedListingsContainer")
);

/* renders the Custom Drawer component and the content to be displayed based on the "tab" value. */
const Sidebar = () => {
  const { width } = useWindowDims();
  const { tab } = useParams();

  const renderContent = useMemo(() => {
    switch (tab) {
      case SETTING_URLS?.PROFILE:
        return <Settings />;
      case SETTING_URLS?.CHAT:
        return <Chat />;
      case SETTING_URLS?.MY_LISTINGS:
        return <MyListingsContainer />;
      case SETTING_URLS?.BECOME_AN_AGENT:
        return <BecomeAnAgentContainer />;
      case SETTING_URLS?.REGISTER_AGENCY:
        return <RegisterCompany />;
      case SETTING_URLS?.SAVED_LISTINGS:
        return <SavedListingsContainer />;

      default:
        return <Settings />;
    }
  }, [tab]);
  return (
    <div
      style={{
        display: "flex",
        height: "calc(100vh - 70px)",
        position: "relative",
        overflow: "hidden",
        marginTop: 6,
      }}
    >
      <CustomDrawer />
      <div
        style={{
          display: "flex",
          flex: 1,
          flexGrow: 1,
          padding: width < 500 ? "30px 8px" : "20px 8px",
          marginLeft: width < 500 ? 50 : 0,
        }}
      >
        <Suspense fallback={<ComponentLoader />}>{renderContent}</Suspense>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  window: PropTypes.func,
};

export default Sidebar;
