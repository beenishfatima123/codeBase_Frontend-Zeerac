import React, { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, Fade, Grid, Modal } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import NotFound from "../../../globalComponents/NotFound";
import GroupSettingsList from "../details/GroupSettingsList";
import ComponentLoader from "../../../globalComponents/ComponentLoader";
import {
  getPendingJoinRequests,
  handleJoinRequests,
  resetHandleJoinRequest,
} from "../../../../redux/slices/groupsSlice";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70vw",
  height: "80vh",
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  overflowY: "scroll",
};
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
const closeIcon = {
  cursor: "pointer",
  backgroundColor: "#134696",
  color: "#fff",
  borderRadius: 1,
};
const useStyles = makeStyles(() => ({
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "20px 10px",
    borderBottom: "1px solid #CECECE",
  },
  heading: {
    fontSize: 22,
    fontFamily: "heavy",
    color: "#134696",
  },
  "@media (max-width: 750px)": {},
}));

/* Modal to show group join requests to moderators. */
const ParticipantRequest = ({ viewParticipant, setViewParticipantRequest }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.auth);
  const { joinRequests, groupsApi, selectedGroup } = useSelector(
    (state) => state.groups
  );

  /* Get all pending requests. */
  useEffect(() => {
    dispatch(
      getPendingJoinRequests({
        id: selectedGroup?.id,
        token: currentUser?.token,
      })
    );
    // eslint-disable-next-line
  }, []);

  /* Join request API success and failure. */
  useEffect(() => {
    if (groupsApi?.responseHandleJoinRequests) {
      toast.success(groupsApi?.responseHandleJoinRequests?.message, {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
      });
      dispatch(resetHandleJoinRequest());
      setViewParticipantRequest(false);
    }
    // eslint-disable-next-line
  }, [groupsApi?.responseHandleJoinRequests]);
  useEffect(() => {
    if (groupsApi?.errorHandleJoinRequests) {
      toast.error("Something went wrong", {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
      });
      dispatch(resetHandleJoinRequest());
    }
    // eslint-disable-next-line
  }, [groupsApi?.errorHandleJoinRequests]);

  return (
    <>
      <Modal open={viewParticipant} closeAfterTransition>
        <Fade in={viewParticipant}>
          <Box sx={style}>
            <div className={classes.header}>
              <div className={classes.heading}>Participant Requests</div>
              <CloseIcon
                onClick={() => {
                  setViewParticipantRequest(false);
                }}
                sx={closeIcon}
              />
            </div>
            <Grid container>
              {groupsApi?.loadingJoinRequests ? (
                <ComponentLoader />
              ) : joinRequests?.results?.length < 1 ? (
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <NotFound label="No Requests Found" />
                </Grid>
              ) : (
                joinRequests?.results?.map((elem, index) => (
                  <Grid key={index} item xs={12} sm={12} md={12} lg={12}>
                    <GroupSettingsList
                      icon={elem?.user?.photo}
                      title={elem?.user?.full_name}
                      description={
                        elem?.user?.user_type === 0
                          ? "Admin"
                          : elem?.user?.user_type === 1
                          ? "User"
                          : elem?.user?.user_type === 2
                          ? "Agent"
                          : elem?.user?.user_type === 3
                          ? "CEO"
                          : elem?.user?.user_type === 4
                          ? "Moderator"
                          : null
                      }
                      location={elem?.user?.city}
                      btn1={
                        <Button
                          sx={btn1Sx}
                          onClick={() => {
                            dispatch(
                              handleJoinRequests({
                                token: currentUser?.token,
                                id: elem?.id,
                                type: "accept",
                              })
                            );
                          }}
                        >
                          Accept
                        </Button>
                      }
                      btn2={
                        <Button
                          sx={btn2Sx}
                          onClick={() => {
                            dispatch(
                              handleJoinRequests({
                                token: currentUser?.token,
                                id: elem?.id,
                                type: "reject",
                              })
                            );
                          }}
                        >
                          Decline
                        </Button>
                      }
                    />
                  </Grid>
                ))
              )}
            </Grid>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default ParticipantRequest;
