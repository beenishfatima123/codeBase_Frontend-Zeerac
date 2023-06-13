import { Button, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import EditGroupModal from "../modals/EditGroup";
import React, { useState, useEffect } from "react";
import GroupSettingsList from "./GroupSettingsList";
import { useDispatch, useSelector } from "react-redux";
import ParticipantRequest from "../modals/ParticipantRequest";
import {
  editGroup,
  resetEditGroup,
} from "../../../../redux/slices/groupsSlice";
import privacyIcon from "../../../../assets/zSpehere/privacy.svg";
import { GROUP_DETAIL_CONTENT } from "../../../../utils/constants";
import requestIcon from "../../../../assets/zSpehere/requests.svg";
import settingIcon from "../../../../assets/zSpehere/settings.svg";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { toast } from "react-toastify";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    padding: 8,
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    borderRadius: "5px",
    minHeight: 150,
    marginBottom: 20,
  },
  top: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  heading: {
    fontSize: 14,
    color: "#134696",
    fontFamily: "medium",
    marginLeft: 10,
  },
  "@media (max-width: 500px)": {},
}));
const btn1Sx = {
  backgroundColor: "#134696",
  color: "#fff",
  fontSize: 12,
  fontFamily: "medium",
  border: "none",
  textTransform: "capitalize",
  margin: 1,
  cursor: "pointer",
  height: 35,
  width: 100,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  "&:hover": {
    backgroundColor: "#134696",
  },
};
const btn2Sx = {
  backgroundColor: "#F1F1F5",
  color: "#696974",
  fontSize: 12,
  fontFamily: "medium",
  border: "none",
  textTransform: "capitalize",
  margin: 1,
  cursor: "pointer",
  height: 35,
  width: 100,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  "&:hover": {
    backgroundColor: "#F1F1F5",
  },
};

/* For group moderators, settings button displays setting options -> requests, group settings and privacy settings rendered individually using GroupSettingsList component. */
const GroupSettings = ({ setSelectedContent }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [openEditModal, setOpenEditModal] = useState(false);
  const [viewParticipant, setViewParticipantRequest] = useState(false);

  const { currentUser } = useSelector((state) => state.auth);
  const { selectedGroup, groupsApi } = useSelector((state) => state.groups);

  /* when API responds with success message, display in toast and dispatch. */
  useEffect(() => {
    if (groupsApi?.from === "setting" && groupsApi?.responseEdit) {
      console.log({ res: groupsApi?.responseEdit });
      toast.success("Privacy updated successfully", {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
      });
      dispatch(resetEditGroup());
    }
    // eslint-disable-next-line
  }, [groupsApi?.responseEdit]);

  /* when API responds with error message, display in toast and dispatch reset. */
  useEffect(() => {
    if (groupsApi?.errorEdit) {
      toast.error("Something went wrong", {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
      });
      dispatch(resetEditGroup());
    }
    // eslint-disable-next-line
  }, [groupsApi?.errorEdit]);

  useEffect(() => {}, [selectedGroup]);
  // console.log({ selectedGroup });
  return (
    <>
      <div className={classes.container}>
        <Grid container>
          <Grid item xs={12} sm={12} md={12} lg={12} sx={{ py: 1.5 }}>
            <div className={classes.top}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <KeyboardBackspaceIcon
                  onClick={() => setSelectedContent(GROUP_DETAIL_CONTENT.POSTS)}
                  style={{ color: "#134696", cursor: "pointer" }}
                />
                <div className={classes.heading}>Settings</div>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <GroupSettingsList
              icon={requestIcon}
              title="Participants Requests"
              description={`${selectedGroup?.join_requests_count} Participants Requests Pending`}
              btn2={
                <Button
                  sx={btn2Sx}
                  onClick={() => {
                    setViewParticipantRequest(true);
                  }}
                >
                  View
                </Button>
              }
            />
            <GroupSettingsList
              icon={settingIcon}
              title="Group Settings"
              description="Update the group settings"
              btn2={
                <Button
                  sx={btn2Sx}
                  onClick={() => {
                    setOpenEditModal(true);
                  }}
                >
                  View
                </Button>
              }
            />
            <GroupSettingsList
              icon={privacyIcon}
              title="Privacy Settings"
              description="Change the privacy settings"
              btn1={
                <Button
                  sx={selectedGroup?.visibility === "Public" ? btn1Sx : btn2Sx}
                  onClick={() => {
                    let formData = new FormData();
                    formData.append("visibility", "Public");
                    dispatch(
                      editGroup({
                        values: formData,
                        token: currentUser?.token,
                        id: selectedGroup?.id,
                        from: "setting",
                      })
                    );
                  }}
                >
                  Public
                </Button>
              }
              btn2={
                <Button
                  sx={selectedGroup?.visibility === "Private" ? btn1Sx : btn2Sx}
                  onClick={() => {
                    let formData = new FormData();
                    formData.append("visibility", "Private");
                    dispatch(
                      editGroup({
                        values: formData,
                        token: currentUser?.token,
                        id: selectedGroup?.id,
                        from: "setting",
                      })
                    );
                  }}
                >
                  Private
                </Button>
              }
            />
          </Grid>
        </Grid>
      </div>
      {openEditModal && (
        <EditGroupModal isOpen={openEditModal} setOpen={setOpenEditModal} />
      )}
      {viewParticipant && (
        <ParticipantRequest
          viewParticipant={viewParticipant}
          setViewParticipantRequest={setViewParticipantRequest}
        />
      )}
    </>
  );
};

export default GroupSettings;
