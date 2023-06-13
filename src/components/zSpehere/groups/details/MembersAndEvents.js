import React, { useEffect, useMemo, useState } from "react";
import moment from "moment/moment";
import { Avatar, Button, Grid, Skeleton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { GROUP_DETAIL_CONTENT } from "../../../../utils/constants";
import { useNavigate, useParams } from "react-router-dom";
import CustomTooltip from "../../../globalComponents/CustomTooltip";
import EventsMenu from "./EventsMenu";
import ComponentLoader from "../../../globalComponents/ComponentLoader";
import ConfirmModal from "../../../settingComponents/myListings/ConfirmModal";
import { toast } from "react-toastify";
import ReportEvent from "../modals/events/ReportEvent";
import ShareModal from "../../../globalComponents/misc/ShareModal";
import NotFound from "../../../globalComponents/NotFound";
import UserModalContainer from "../modals/usersModal/UserModalContainer";
import {
  deleteEvent,
  getAllEvents,
  resetDeleteEventApiInfo,
  sendEventInvitation,
  setUpcomingEventData,
  resetSendEventInvitationApiInfo,
} from "../../../../redux/slices/zSphereEventSlice";

const NAME_LENGTH = 15;
const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    padding: 8,
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    borderRadius: "5px",
    minHeight: 150,
  },
  membersContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  top: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  heading: {
    fontSize: 14,
    color: "#134696",
    fontFamily: "medium",
  },
  eventContainer: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  vertical: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 10,
    flex: 1,
  },
  eventTitle: {
    color: "#171725",
    fontSize: 14,
    margin: 0,
    fontFamily: "medium",
    textTransform: "capitalize",
  },
  eventDate: {
    color: "#92929D",
    marginTop: 4,
    marginBottom: 0,
    fontSize: 12,
  },
  location: {
    fontSize: 12,
    color: "#B7C1CF",
    fontFamily: "medium",
  },
  type: {
    fontSize: 12,
    color: "#0ed864",
    fontFamily: "medium",
    fontWeight: "bold",
    marginLeft: 10,
  },
}));

/* combined grid display for members and events sections. */
const MembersAndEvents = ({ setSelectedContent }) => {
  const params = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [deletedId, setDeletedId] = useState();
  const [shareId, setShareId] = useState();
  const [eventId, setEventId] = useState();
  const [deleteEventModal, setDeleteEventModal] = useState(false);
  const [openReportModal, setOpenReportModal] = useState(false);
  const [openShareModal, setOpenShareModal] = useState(false);
  const [openInviteModal, setOpenInviteModal] = useState(false);

  const { currentUser } = useSelector((state) => state.auth);
  const {
    getEventsData,
    getEventsDataApiInfo,
    deleteEventApiInfo,
    sendEventInvitationApiInfo,
  } = useSelector((state) => state.zSphereEvents);
  // console.log({ getEventsData });

  const {
    groupMembers,
    groupModerators,
    groupAdmin,
    groupsApi,
    selectedGroup,
  } = useSelector((state) => state.groups);

  const { darkMode } = useSelector((state) => state.global);

  /* Get events */
  useEffect(() => {
    dispatch(
      getAllEvents({
        token: currentUser?.token,
        id: selectedGroup?.id
      })
    );
    // eslint-disable-next-line
  }, [selectedGroup]);

  /* Shortlist members and moderators to show. */
  const membersToShow = useMemo(() => {
    // console.log({ groupMembers, groupModerators, groupAdmin });
    let _show = [];
    if (groupAdmin) _show = [groupAdmin];
    if (groupMembers?.results?.length > 0) {
      _show = [..._show, ...groupMembers?.results];
    }
    if (groupModerators?.results?.length > 0) {
      _show = [..._show, ...groupModerators?.results];
    }
    // console.log({ _show });
    return _show.slice(0, 10);
  }, [groupMembers, groupModerators, groupAdmin]);

  /* Delete Event dispatch. */
  const handleDeleteEvent = () => {
    dispatch(
      deleteEvent({
        token: currentUser?.token,
        id: deletedId,
      })
    );
  };

  // Delete Events Success & failure
  useEffect(() => {
    if (deleteEventApiInfo?.response) {
      toast.success("Event Deleted Successfully", {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
      });
      dispatch(resetDeleteEventApiInfo());
      setDeleteEventModal(false);
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

  // remove events that time passed
  useEffect(() => {
    // Function to be executed every 30 seconds
    const logCurrentTime = () => {
      const currentTime = moment(new Date());
      // console.log("Current time:", currentTime);

      getEventsData?.results?.forEach((event) => {
        const endTime = moment(event?.end);
        const diffInMinutes = endTime.diff(currentTime, "minutes");
        // console.log({ diffInMinutes });

        // if (endTime > currentTime) {
        //   console.log(
        //     `Event ${event.name} has an end time greater than the current time.`
        //   );
        // }

        if (diffInMinutes <= 0) {
          // console.log(
          //   `Event ${event.name} has an end time greater than the current time.`
          // );
          dispatch(
            setUpcomingEventData({
              ...getEventsData,
              count: getEventsData?.count - 1,
              results: getEventsData?.results?.filter(
                (_elem) => _elem?.id !== event?.id
              ),
            })
          );
        }
      });
    };

    // Run the function initially
    logCurrentTime();

    // Set interval to run the function every 60 seconds
    const interval = setInterval(logCurrentTime, 60000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, [getEventsData]);

  // Invite Events Success & failure
  useEffect(() => {
    if (sendEventInvitationApiInfo?.response) {
      toast.success("An Invitation has been sent", {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
      });
      dispatch(resetSendEventInvitationApiInfo());
    }
    // eslint-disable-next-line
  }, [sendEventInvitationApiInfo?.response]);
  useEffect(() => {
    if (sendEventInvitationApiInfo?.error) {
      toast.error(sendEventInvitationApiInfo?.error, {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
      });
      dispatch(resetSendEventInvitationApiInfo());
    }
    // eslint-disable-next-line
  }, [sendEventInvitationApiInfo?.error]);

  // console.log({ sendEventInvitationApiInfo });

  return (
    <Grid container spacing={2}>
      {/* members */}
      <Grid item xs={12} sm={12} md={4}>
        <div
          className={classes.container}
          style={{
            backgroundColor: darkMode ? "#2f2f33" : "#fff",
          }}
        >
          <div className={classes.top}>
            <p
              className={classes.heading}
              style={{
                color: darkMode ? "#0ed864" : "#134696",
              }}
            >
              Members
            </p>
            <Button
              onClick={() => setSelectedContent(GROUP_DETAIL_CONTENT.MEMBERS)}
              sx={{
                color: darkMode ? "#0ed864" : "#134696",
              }}
            >
              See All
            </Button>
          </div>
          <div className={classes.membersContainer}>
            {groupsApi?.loadingMembers || groupsApi?.loadingModerators ? (
              <>
                {Array.from(new Array(4)).map((elem, index) => (
                  <Skeleton
                    key={index}
                    height={42}
                    width={42}
                    variant="circular"
                  />
                ))}
              </>
            ) : (
              <>
                {membersToShow?.map((elem, index) => (
                  <Avatar
                    key={index}
                    src={elem?.photo}
                    alt={`${elem?.full_name}`}
                    style={{ height: 42, width: 42, margin: 2 }}
                  />
                ))}
              </>
            )}
          </div>
        </div>
      </Grid>
      {/* upcoming events */}
      <Grid item xs={12} sm={12} md={8}>
        <div
          className={classes.container}
          style={{
            backgroundColor: darkMode ? "#2f2f33" : "#fff",
          }}
        >
          <div className={classes.top}>
            <p
              className={classes.heading}
              style={{
                color: darkMode ? "#0ed864" : "#134696",
              }}
            >
              Upcoming Events
            </p>
            <Button
              onClick={() => setSelectedContent(GROUP_DETAIL_CONTENT.EVENTS)}
              sx={{
                color: darkMode ? "#0ed864" : "#134696",
              }}
            >
              See All
            </Button>
          </div>
          {getEventsData?.results?.length === 0 && (
            <NotFound label=" No Upcoming Events" />
          )}
          {getEventsDataApiInfo?.loading ? (
            <ComponentLoader />
          ) : (
            <Grid container spacing={2}>
              {getEventsData?.results?.map(
                (elem, index) =>
                  index < 4 && (
                    <Grid
                      key={index}
                      item
                      xs={6}
                      sm={6}
                      sx={{ display: "flex" }}
                    >
                      <CalendarTodayIcon
                        style={{ fontSize: 22, color: "#92929D" }}
                      />

                      <div
                        className={classes.vertical}
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          // navigate(`/zSphere/Groups/${params?.id}/${elem?.id}`)
                          navigate(
                            `/zSphere/Groups/${params?.id}/upcoming/${elem?.id}`
                          )
                        }
                      >
                        <CustomTooltip title={elem?.name}>
                          <p className={classes.eventTitle}>
                            {elem?.name?.length > NAME_LENGTH
                              ? elem?.name?.slice(0, NAME_LENGTH) + "..."
                              : elem?.name}
                          </p>
                        </CustomTooltip>
                        <p className={classes.eventDate}>
                          {moment(elem?.start).format("dddd")}{" "}
                          {moment(elem?.start).format("LT")} .
                        </p>
                        <div className={classes.infoContainer}>
                          <span className={classes.location}>
                            {moment(elem?.start).format("LT")}
                          </span>
                          <span className={classes.type}>{elem?.type}</span>
                        </div>
                      </div>
                      <EventsMenu
                        admin={elem?.organized_by?.id}
                        handleMenuClick={(option) => {
                          if (option?.name === "delete") {
                            setDeleteEventModal(true);
                            setDeletedId(elem?.id);
                          } else if (option?.name === "report") {
                            setOpenReportModal(true);
                          } else if (option?.name === "share") {
                            setShareId(elem);
                            setOpenShareModal(true);
                          } else if (option?.name === "invite") {
                            setEventId(elem);
                            setOpenInviteModal(true);
                          }
                        }}
                      />
                    </Grid>
                  )
              )}
            </Grid>
          )}
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
              event={shareId}
            />
          )}
          {openInviteModal && (
            <UserModalContainer
              events
              isOpen={openInviteModal}
              setOpen={setOpenInviteModal}
              handleEventInvite={(user) => {
                let formData = new FormData();
                formData.append("event", eventId?.id);
                formData.append("user", user?.id);

                dispatch(
                  sendEventInvitation({
                    token: currentUser?.token,
                    formData,
                  })
                );
              }}
            />
          )}
        </div>
      </Grid>
    </Grid>
  );
};

export default MembersAndEvents;
