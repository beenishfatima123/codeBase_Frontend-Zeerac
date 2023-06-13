import React from "react";
import { useSelector } from "react-redux";
import PersonalInfo from "./PersonalInfo";
import OverViewHeader from "./OverViewHeader";
import EditInformation from "./EditInformation";
//import FriendList from './FriendList';

const Overview = () => {
  const { showEditInfo } = useSelector((state) => state.settings);
  return (
    <div style={{ marginRight: 10 }}>
      <OverViewHeader />
      {showEditInfo ? <EditInformation /> : <PersonalInfo />}
      {/* <FriendList /> */}
    </div>
  );
};

export default Overview;
