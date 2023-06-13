import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import ViewLocation from "./ViewLocation";
import { useNavigate, useParams } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import { useDispatch, useSelector } from "react-redux";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import { Backdrop, Box, Modal, Fade, Grid, Button } from "@mui/material";
import defaultImage from "../../../../../assets/zSpehere/background.png";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import {
  deleteEvent,
  getEvent,
  interestedEvent,
  maybeEvent,
  notInterestedEvent,
  resetDeleteEventApiInfo,
  // resetInterestedEventApiInfo,
  resetMaybeEventApiInfo,
  resetNotInterestedEventApiInfo,
  sendEventInvitation,
} from "../../../../../redux/slices/zSphereEventSlice";
import moment from "moment/moment";
import personSvg from "../../../../../assets/zSpehere/personSm.svg";
import onlineSvg from "../../../../../assets/zSpehere/onlineSm.svg";
import ComponentLoader from "../../../../globalComponents/ComponentLoader";
import { toast } from "react-toastify";
import ConfirmModal from "../../../../settingComponents/myListings/ConfirmModal";
import EventsMenu from "../../details/EventsMenu";
import ButtonLoader from "../../../../globalComponents/ButtonLoader";
import ReportEvent from "./ReportEvent";
import ShareModal from "../../../../globalComponents/misc/ShareModal";
import UserModalContainer from "../usersModal/UserModalContainer";

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
const closeIcon = {
  cursor: "pointer",
  backgroundColor: "#134696",
  color: "#fff",
  borderRadius: 1,
  position: "fixed",
  top: 20,
  right: 20,
  zIndex: 10,
};
const btnSx1 = {
  height: 35,
  cursor: "pointer",
  fontSize: 14,
  fontFamily: "medium",
  color: "#7d7d7d",
  backgroundColor: "#F1F1F5",
  border: "none",
  borderRadius: 2,
  padding: "0 10px",
  textTransform: "capitalize",
  margin: 1,
  "&:hover": {
    backgroundColor: "#F1F1F5",
  },
};
const btnSx2 = {
  height: 35,
  cursor: "pointer",
  fontSize: 14,
  fontFamily: "medium",
  color: "#fff",
  backgroundColor: "#134696",
  border: "none",
  borderRadius: 2,
  padding: "0 10px",
  textTransform: "capitalize",
  margin: 1,
  "&:hover": {
    backgroundColor: "#134696",
  },
};
const useStyles = makeStyles(() => ({
  cover: {
    height: 250,
    width: "100%",
    objectFit: "cover",
  },
  profile: {
    width: 150,
    height: 150,
    borderRadius: 10,
    backgroundColor: "#134696",
    marginLeft: 30,
    marginTop: 150,
    position: "absolute",
  },
  date: {
    backgroundColor: "#fff",
    margin: 5,
    height: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "heavy",
    fontSize: 40,
    color: "#134696",
  },
  month: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "medium",
    fontSize: 24,
    color: "#fff",
    marginTop: 10,
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "row-reverse",
    alignItems: "center",
  },

  time: {
    color: "#0ed864",
    fontFamily: "heavy",
    fontSize: 16,
    margin: "20px 0 10px 30px",
  },
  nameContainer: {
    margin: "10px 30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    color: "#314696",
    fontFamily: "heavy",
    fontSize: 22,
    textTransform: "capitalize",
  },
  address: {
    color: "#B5B5BE",
    fontFamily: "medium",
    fontSize: 14,
    fontStyle: "italic",
    marginTop: 5,
  },
  membersDetail: {
    height: 100,
    borderRadius: 5,
    backgroundColor: "#F1F1F5",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  number: {
    color: "#0ed864",
    fontFamily: "heavy",
    fontSize: 24,
  },
  numberLabel: {
    color: "#134696",
    fontSize: 14,
    fontFamily: "light",
  },
  heading: {
    color: "#134696",
    fontFamily: "medium",
    fontSize: 18,
    margin: "10px 30px",
  },
  details: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    margin: "10px 30px",
  },
  detailLabel: {
    fontSize: 18,
    color: "#171725",
    fontFamily: "light",
    marginLeft: 30,
  },
  description: {
    color: "#171725",
    fontFamily: "medium",
    fontSize: 16,
    margin: "10px 30px",
  },
  "@media (max-width: 750px)": {
    buttonsContainer: {
      flexDirection: "column-reverse",
      alignItems: "flex-end",
      marginRight: 20,
    },
    profile: {
      marginTop: 260,
    },
  },
}));

/* Event information modal. */
const ViewEvent = ({ viewEvent, setViewEvent, handleClose }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const [deletedId, setDeletedId] = useState();
  const [deleteEventModal, setDeleteEventModal] = useState(false);
  const [openReportModal, setOpenReportModal] = useState(false);
  const [openShareModal, setOpenShareModal] = useState(false);
  const [openInviteModal, setOpenInviteModal] = useState(false);

  const { currentUser } = useSelector((state) => state.auth);
  const {
    getEventData,
    getEventDataApiInfo,
    deleteEventApiInfo,
    interestedEventsApiInfo,
    notInterestedEventsApiInfo,
    maybeEventsApiInfo,
  } = useSelector((state) => state.zSphereEvents);
  const { selectedGroup } = useSelector((state) => state.groups);

  /* Get event duration from start end time */
  const duration =
    new Date(getEventData?.end).getDate() -
    new Date(getEventData?.start).getDate();

  /* Get event using id from param. */
  useEffect(() => {
    dispatch(getEvent({ token: currentUser?.token, id: params?.param4 }));
    // eslint-disable-next-line
  }, [params?.param4]);

  /* Dispatch delete event command from moderator. */
  const handleDeleteEvent = () => {
    dispatch(
      deleteEvent({
        token: currentUser?.token,
        id: deletedId,
      })
    );
  };

  // // Interested Events Success & failure
  // useEffect(() => {
  //   if (interestedEventsApiInfo?.response) {
  //     toast.success("You are now interested in this event", {
  //       position: toast.POSITION.TOP_CENTER,
  //       hideProgressBar: true,
  //     });

  //     // navigate(`/zSphere/Groups/${params?.id}`);
  //     dispatch(resetInterestedEventApiInfo());
  //   }
  //   // eslint-disable-next-line
  // }, [interestedEventsApiInfo?.response]);
  // useEffect(() => {
  //   if (interestedEventsApiInfo?.error) {
  //     toast.error(interestedEventsApiInfo?.error, {
  //       position: toast.POSITION.TOP_CENTER,
  //       hideProgressBar: true,
  //     });
  //     dispatch(resetInterestedEventApiInfo());
  //   }
  //   // eslint-disable-next-line
  // }, [interestedEventsApiInfo?.error]);

  // Not Interested Events Success & failure
  useEffect(() => {
    if (notInterestedEventsApiInfo?.response) {
      toast.success("You are not interested in this event", {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
      });

      // navigate(`/zSphere/Groups/${params?.id}`);
      dispatch(resetNotInterestedEventApiInfo());
    }
    // eslint-disable-next-line
  }, [notInterestedEventsApiInfo?.response]);
  useEffect(() => {
    if (notInterestedEventsApiInfo?.error) {
      toast.error(notInterestedEventsApiInfo?.error, {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
      });
      dispatch(resetNotInterestedEventApiInfo());
    }
    // eslint-disable-next-line
  }, [notInterestedEventsApiInfo?.error]);

  // May be Events Success & failure
  useEffect(() => {
    if (maybeEventsApiInfo?.response) {
      toast.success("You are not not sure to attend  this event", {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
      });

      // navigate(`/zSphere/Groups/${params?.id}`);
      dispatch(resetMaybeEventApiInfo());
    }
    // eslint-disable-next-line
  }, [maybeEventsApiInfo?.response]);
  useEffect(() => {
    if (maybeEventsApiInfo?.error) {
      toast.error(maybeEventsApiInfo?.error, {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
      });
      dispatch(resetMaybeEventApiInfo());
    }
    // eslint-disable-next-line
  }, [maybeEventsApiInfo?.error]);

  // Delete Events Success & failure
  useEffect(() => {
    if (deleteEventApiInfo?.response) {
      toast.success("Event Deleted Successfully", {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
      });
      dispatch(resetDeleteEventApiInfo());
      setDeleteEventModal(false);
      // navigate(`/zSphere/Groups/${params?.id}`);
    }
    // eslint-disable-next-line
  }, [deleteEventApiInfo?.response]);
  useEffect(() => {
    if (deleteEventApiInfo?.error) {
      toast.error("Something went wrong", {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
      });
      dispatch(resetDeleteEventApiInfo());
      setDeleteEventModal(false);
    }
    // eslint-disable-next-line
  }, [deleteEventApiInfo?.error]);

  return (
    <>
      {deleteEventModal && (
        <ConfirmModal
          open={deleteEventModal}
          setOpen={setDeleteEventModal}
          title={"Are you sure to delete this Event?"}
          handleConfirm={handleDeleteEvent}
        />
      )}
      {openReportModal && (
        <ReportEvent open={openReportModal} setOpen={setOpenReportModal} />
      )}
      {openShareModal && (
        <ShareModal
          open={openShareModal}
          setOpen={setOpenShareModal}
          event={getEventData}
        />
      )}
      {openInviteModal && (
        <div style={{ zIndex: 999999 }}>
          <UserModalContainer
            events
            isOpen={openInviteModal}
            setOpen={setOpenInviteModal}
            handleEventInvite={(user) => {
              let formData = new FormData();
              formData.append("event", params?.eventId);
              formData.append("user", user?.id);

              dispatch(
                sendEventInvitation({
                  token: currentUser?.token,
                  formData,
                })
              );
            }}
          />
        </div>
      )}
      <Modal
        open={viewEvent}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
      >
        <Fade in={viewEvent}>
          <Box sx={style}>
            {getEventDataApiInfo?.loading ? (
              <ComponentLoader />
            ) : (
              <>
                <CloseIcon
                  onClick={
                    handleClose
                      ? handleClose
                      : () => {
                          setViewEvent(false);
                          navigate(`/zSphere/Groups/${params?.id}`);
                        }
                  }
                  sx={closeIcon}
                />
                <div className={classes.profile}>
                  <div className={classes.date}>
                    {moment(getEventData?.start).format("Do")}
                  </div>
                  <div className={classes.month}>
                    {moment(getEventData?.start).format("MMMM")}
                  </div>
                </div>
                <img
                  alt=""
                  src={getEventData?.photo ? getEventData?.photo : defaultImage}
                  className={classes.cover}
                />
                <div className={classes.buttonsContainer}>
                  <EventsMenu
                    admin={getEventData?.organized_by?.id}
                    handleMenuClick={(option) => {
                      if (option?.name === "delete") {
                        setDeleteEventModal(true);
                        setDeletedId(getEventData?.id);
                      } else if (option?.name === "report") {
                        setOpenReportModal(true);
                      } else if (option?.name === "share") {
                        setOpenShareModal(true);
                      } else if (option?.name === "invite") {
                        setOpenInviteModal(true);
                      }
                    }}
                  />
                  <Button
                    sx={
                      getEventData?.not_interested?.includes(currentUser?.id)
                        ? btnSx2
                        : btnSx1
                    }
                    onClick={() => {
                      dispatch(
                        notInterestedEvent({
                          token: currentUser?.token,
                          id: getEventData?.id,
                        })
                      );
                    }}
                  >
                    {notInterestedEventsApiInfo?.loading ? (
                      <ButtonLoader size={20} color="#134696" />
                    ) : (
                      "Not Interested"
                    )}
                  </Button>
                  <Button
                    sx={
                      getEventData?.maybe?.includes(currentUser?.id)
                        ? btnSx2
                        : btnSx1
                    }
                    onClick={() => {
                      dispatch(
                        maybeEvent({
                          token: currentUser?.token,
                          id: getEventData?.id,
                        })
                      );
                    }}
                  >
                    {maybeEventsApiInfo?.loading ? (
                      <ButtonLoader size={20} color="#134696" />
                    ) : (
                      "May be"
                    )}
                  </Button>
                  <Button
                    sx={
                      getEventData?.interested?.includes(currentUser?.id)
                        ? btnSx2
                        : btnSx1
                    }
                    onClick={() => {
                      dispatch(
                        interestedEvent({
                          token: currentUser?.token,
                          id: getEventData?.id,
                        })
                      );
                    }}
                  >
                    {interestedEventsApiInfo?.loading ? (
                      <ButtonLoader size={20} color="#fff" />
                    ) : (
                      "Interested"
                    )}
                  </Button>
                </div>
                <div className={classes.time}>
                  {moment(getEventData?.start).format("LLLL")} {" - "}
                  {getEventData?.end &&
                    moment(getEventData?.end).format("LLLL")}
                </div>
                <div className={classes.nameContainer}>
                  <div>
                    <div className={classes.name}>{getEventData?.name}</div>
                    {getEventData?.type === "InPerson" && (
                      <div className={classes.address}>
                        {" "}
                        {getEventData?.location?.length > 60
                          ? getEventData?.location?.substring(0, 60) + "..."
                          : getEventData?.location}
                      </div>
                    )}
                  </div>
                  <div style={{ display: "flex" }}>
                    {getEventData?.type === "Online" && (
                      <img alt="" src={onlineSvg} />
                    )}
                    {getEventData?.type === "InPerson" && (
                      <img alt="" src={personSvg} />
                    )}
                  </div>
                </div>
                <hr style={{ margin: "10px 30px", color: "#e3e3e3" }} />
                <Grid
                  container
                  spacing={4}
                  justifyContent={"center"}
                  sx={{ mb: 2 }}
                >
                  <Grid item xs={10} sm={10} md={4.5} lg={3.5} xl={3.5}>
                    <div className={classes.membersDetail}>
                      <div className={classes.number}>
                        {getEventData?.interested?.length}
                      </div>
                      <div className={classes.numberLabel}>Interested</div>
                    </div>
                  </Grid>
                  <Grid item xs={10} sm={10} md={4.5} lg={3.5} xl={3.5}>
                    <div className={classes.membersDetail}>
                      <div className={classes.number}>
                        {getEventData?.maybe?.length || 0}
                      </div>
                      <div className={classes.numberLabel}>Estimated</div>
                    </div>
                  </Grid>
                  <Grid item xs={10} sm={10} md={4.5} lg={3.5} xl={3.5}>
                    <div className={classes.membersDetail}>
                      <div className={classes.number}>
                        {getEventData?.invited?.length || 0}
                      </div>
                      <div className={classes.numberLabel}>Invited</div>
                    </div>
                  </Grid>
                </Grid>
                <div className={classes.heading}>Details</div>
                <div className={classes.details}>
                  <PersonIcon />
                  <div className={classes.detailLabel}>
                    Event by{" "}
                    <span
                      style={{
                        fontFamily: "medium",
                        color: "#134696",
                        textTransform: "capitalize",
                      }}
                    >
                      {`${getEventData?.organized_by?.full_name}`}
                    </span>
                  </div>
                </div>
                {getEventData?.type === "InPerson" && (
                  <div className={classes.details}>
                    <LocationOnIcon />
                    <div className={classes.detailLabel}>
                      <span style={{ fontFamily: "medium", color: "#134696" }}>
                        {getEventData?.location?.length > 60
                          ? getEventData?.location?.substring(0, 60) + "..."
                          : getEventData?.location}
                      </span>
                    </div>
                  </div>
                )}
                {getEventData?.end > 0 ? (
                  <div className={classes.details}>
                    <AccessTimeFilledIcon />
                    <div className={classes.detailLabel}>
                      Duration:{" "}
                      <span style={{ fontFamily: "medium", color: "#134696" }}>
                        {duration} {duration > 1 ? "days" : "day"}
                      </span>
                    </div>
                  </div>
                ) : null}
                <div className={classes.details}>
                  <Diversity3Icon />
                  <div className={classes.detailLabel}>
                    Group{" "}
                    <span
                      style={{
                        fontFamily: "medium",
                        color: "#134696",
                        textTransform: "capitalize",
                      }}
                    >
                      {selectedGroup?.name}
                    </span>
                  </div>
                </div>
                <div className={classes.description}>
                  {getEventData?.description}
                </div>
                {getEventData?.type === "InPerson" && (
                  <>
                    <hr style={{ margin: "10px 30px", color: "#e3e3e3" }} />
                    <div className={classes.heading}>Location</div>
                    <ViewLocation />
                  </>
                )}
              </>
            )}
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default ViewEvent;
