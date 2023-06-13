import moment from "moment";
import { toast } from "react-toastify";
import { makeStyles } from "@mui/styles";
import EventsMenu from "../details/EventsMenu";
import ViewEvent from "../modals/events/ViewEvent";
import { useDispatch, useSelector } from "react-redux";
import CreateEvent from "../modals/events/CreateEvent";
import ReportEvent from "../modals/events/ReportEvent";
import { Button, Grid, IconButton } from "@mui/material";
import NotFound from "../../../globalComponents/NotFound";
import React, { useMemo, useState, useEffect } from "react";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import { CEO_CLUB_EVENT_IDS } from "../../../../utils/constants";
import ButtonLoader from "../../../globalComponents/ButtonLoader";
import ShareModal from "../../../globalComponents/misc/ShareModal";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ComponentLoader from "../../../globalComponents/ComponentLoader";
import UserModalContainer from "../modals/usersModal/UserModalContainer";
import useDebounceSearch from "../../../../utils/hooks/useDebounceSearch";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import ConfirmModal from "../../../settingComponents/myListings/ConfirmModal";
import {
  CEO_CLUB_PARAM_IDS,
  SOCIAL_CONTENT_SELECTION,
} from "../../../../utils/constants";
import {
  searchCEOPastEvents,
  searchCEOUpcomingEvents,
} from "../../../../api/socialApi";
import {
  deleteEvent,
  interestedEvent,
  resetDeleteEventApiInfo,
  resetInterestedEventApiInfo,
  resetSendEventInvitationApiInfo,
  sendEventInvitation,
} from "../../../../redux/slices/zSphereEventSlice";

const btnSx = {
  backgroundColor: "#CAF4F4",
  color: "#134696",
  fontSize: 14,
  fontFamily: "medium",
  height: 50,
  border: "none",
  borderRadius: 2,
  width: "50%",
  margin: "20px 5px",
  cursor: "pointer",
  textTransform: "capitalize",
};

const interestedSx = {
  border: "none",
  borderRadius: 1,
  height: 40,
  padding: "10px 15px",
  fontFamily: "medium",
  fontSize: 14,
  color: "#fff",
  backgroundColor: "#F1F1F5",
  cursor: "pointer",
  textTransform: "capitalize",
  "&:hover": {
    backgroundColor: "#F1F1F5",
  },
};

const useStyles = makeStyles(() => ({
  topBtnContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    padding: 8,
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    borderRadius: "5px",
    minHeight: 150,
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
    marginLeft: 10,
    textTransform: "capitalize",
  },
  eventContainer: {
    display: "flex",
    margin: "0 10px",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
    borderTop: "1px solid #CECECE",
    borderBottom: "1px solid #CECECE",
    padding: 10,
  },
  eventInner: {
    display: "flex",
    alignItems: "center",
  },
  eventPhoto: {
    height: 75,
    width: 75,
    objectFit: "cover",
    borderRadius: "50%",
  },
  detailContainer: {
    marginLeft: 20,
    cursor: "pointer",
  },
  date: {
    color: "#0ed864",
    fontFamily: "medium",
    fontSize: 16,
  },
  name: {
    color: "#134696",
    fontFamily: "medium",
    fontSize: 16,
    textTransform: "capitalize",
  },
  location: {
    color: "#92929D",
    fontFamily: "light",
    fontSize: 16,
    maxWidth: "80%",
  },
  admin: {
    color: "#92929D",
    fontFamily: "light",
    fontSize: 16,
    marginTop: 10,
    textTransform: "capitalize",
  },
  btnContainer: {
    display: "flex",
    alignItems: "center",
  },
  search: {
    outline: "1px solid #D1DBE3",
    border: "1px solid #D1DBE3",
    height: 30,
    borderRadius: 20,
    paddingLeft: 10,
    width: 300,
    color: "#9DAFBD",
    fontSize: 12,
    fontFamily: "light",
  },
  interested: {
    padding: "10px",
    fontFamily: "medium",
    fontSize: 14,
    color: "#fff",
    backgroundColor: "#0ed864",
    borderRadius: 5,
  },
  "@media (max-width: 500px)": {
    eventContainer: {
      flexDirection: "column",
    },
    eventInner: {
      flexDirection: "column",
    },
    detailContainer: {
      margin: "10px 0",
    },
    eventPhoto: {
      height: 60,
      width: 60,
    },
    btnContainer: {
      alignSelf: "flex-start",
    },
    search: {
      width: 200,
    },
  },
}));
const CeoEvents = () => {
  const params = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [showEvents, setShowEvents] = useState("upcoming");
  const [createEventModal, setCreateEventModal] = useState(false);
  const [searched, setSearched] = useState();
  const [loaderId, setLoaderId] = useState();
  const [deletedId, setDeletedId] = useState();
  const [shareId, setShareId] = useState();
  const [eventId, setEventId] = useState();
  const [deleteEventModal, setDeleteEventModal] = useState(false);
  const [openReportModal, setOpenReportModal] = useState(false);
  const [openShareModal, setOpenShareModal] = useState(false);
  const [openInviteModal, setOpenInviteModal] = useState(false);

  const { darkMode } = useSelector((state) => state.global);
  const { currentUser } = useSelector((state) => state.auth);
  const {
    pastEventsData,
    getEventsData,
    interestedEventsApiInfo,
    deleteEventApiInfo,
    sendEventInvitationApiInfo,
  } = useSelector((state) => state.zSphereEvents);

  const { loading, searchResult } = useDebounceSearch(
    searched,
    location?.pathname === "/zSphere/CEO_Club/events/upcoming"
      ? searchCEOUpcomingEvents
      : searchCEOPastEvents,
    location?.pathname
  );

  // console.log({ location });

  const dataToShow = useMemo(() => {
    switch (params?.eventId) {
      case CEO_CLUB_EVENT_IDS.UPCOMING:
        return searched?.length > 2 ? searchResult : getEventsData;

      case CEO_CLUB_EVENT_IDS.PAST:
        return searched?.length > 2 ? searchResult : pastEventsData;

      default:
        return pastEventsData;
    }
  }, [params?.eventId, pastEventsData, getEventsData, searchResult, searched]);

  // Interested Events Success & failure
  useEffect(() => {
    if (interestedEventsApiInfo?.response) {
      toast.success("You are now interested in this event", {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
      });
      dispatch(resetInterestedEventApiInfo());
    }
    // eslint-disable-next-line
  }, [interestedEventsApiInfo?.response]);
  useEffect(() => {
    if (interestedEventsApiInfo?.error) {
      toast.error(interestedEventsApiInfo?.error, {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
      });
      dispatch(resetInterestedEventApiInfo());
    }
    // eslint-disable-next-line
  }, [interestedEventsApiInfo?.error]);

  const handleDeleteEvent = () => {
    dispatch(
      deleteEvent({
        token: currentUser?.token,
        id: deletedId,
        ceo: true,
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

  // invite Events Success & failure
  useEffect(() => {
    if (sendEventInvitationApiInfo?.response) {
      toast.success("Invitation has been sent", {
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

  return (
    <>
      <div className={classes.topBtnContainer}>
        <Button
          sx={btnSx}
          onClick={() => {
            setCreateEventModal(true);
          }}
        >
          + Create Event
        </Button>
        {showEvents === "past" ? (
          <Button
            sx={btnSx}
            onClick={() => {
              setShowEvents("upcoming");
              navigate(
                `/zSphere/CEO_Club/${CEO_CLUB_PARAM_IDS.EVENTS}/upcoming`
              );
              setSearched(null);
            }}
          >
            Find Upcoming Events
          </Button>
        ) : (
          <Button
            sx={btnSx}
            onClick={() => {
              setShowEvents("past");
              navigate(`/zSphere/CEO_Club/${CEO_CLUB_PARAM_IDS.EVENTS}/past`);
              setSearched(null);
            }}
          >
            Find Past Events
          </Button>
        )}
      </div>
      <div className={classes.container}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <div className={classes.top}>
              <div className={classes.horizontal}>
                <IconButton
                  onClick={() =>
                    navigate(
                      `/zSphere/${SOCIAL_CONTENT_SELECTION[5]?.replace(
                        " ",
                        "_"
                      )}`
                    )
                  }
                >
                  <KeyboardBackspaceIcon
                    style={{ color: darkMode ? "#0ed864" : "#134696" }}
                  />
                </IconButton>
                <span
                  className={classes.heading}
                  style={{
                    color: darkMode ? "#0ed864" : "#134696",
                  }}
                >
                  {params?.eventId} Events
                </span>
              </div>
              <div style={{ position: "relative" }}>
                <input
                  className={classes.search}
                  type="text"
                  placeholder="Find Relevant Events"
                  value={searched || ""}
                  onChange={(e) => {
                    setSearched(e.target.value);
                  }}
                />
                <SearchSharpIcon
                  sx={{
                    position: "absolute",
                    right: 10,
                    top: 5,
                    color: "#9DAFBD",
                  }}
                />
              </div>
            </div>
          </Grid>
          {loading ? (
            <ComponentLoader />
          ) : dataToShow?.results?.length > 0 ? (
            dataToShow?.results?.map((elem, index) => {
              // console.log({ elem });
              const _interested = elem?.interested?.includes(currentUser?.id);
              return (
                <Grid key={index} item xs={12} sm={12} md={12} lg={12}>
                  <div className={classes.eventContainer}>
                    <div className={classes.eventInner}>
                      <img
                        className={classes.eventPhoto}
                        alt=""
                        src={elem?.photo}
                      />
                      <div
                        className={classes.detailContainer}
                        onClick={() => {
                          navigate(
                            `/zSphere/${SOCIAL_CONTENT_SELECTION[5]?.replace(
                              " ",
                              "_"
                            )}/events/${params?.eventId}/${elem?.id}`
                          );
                        }}
                      >
                        <div className={classes.date}>
                          {moment(elem?.start).format("dddd") + ""},{" "}
                          {moment(elem?.start).format("LL") + ""}
                        </div>
                        <div className={classes.name}>{elem?.name}</div>
                        <div className={classes.location}>{elem?.location}</div>
                        <div className={classes.admin}>
                          Created By:{" "}
                          <span style={{ color: "#134696" }}>
                            {elem?.organized_by?.first_name}{" "}
                            {elem?.organized_by?.last_name}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className={classes.btnContainer}>
                      {!_interested ? (
                        <Button
                          sx={{
                            ...interestedSx,
                            backgroundColor: _interested
                              ? "#0ed864"
                              : "#134698",
                            "&:hover": {
                              backgroundColor: _interested
                                ? "#0ed864"
                                : "#134698",
                            },
                          }}
                          onClick={() => {
                            setLoaderId(elem?.id);
                            dispatch(
                              interestedEvent({
                                token: currentUser?.token,
                                id: elem?.id,
                                user_id: currentUser?.id,
                                ceo: true,
                              })
                            );
                          }}
                        >
                          {interestedEventsApiInfo?.loading &&
                          loaderId === elem?.id ? (
                            <ButtonLoader size={20} color="#fff" />
                          ) : (
                            "Interested?"
                          )}
                        </Button>
                      ) : (
                        <div className={classes.interested}>Interested</div>
                      )}

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
                    </div>
                  </div>
                </Grid>
              );
            })
          ) : (
            <NotFound label="No Events Found" />
          )}
        </Grid>
      </div>
      {params?.param4 && (
        <ViewEvent
          ceo={true}
          viewEvent={Boolean(params?.param4)}
          handleClose={() =>
            navigate(
              `/zSphere/${SOCIAL_CONTENT_SELECTION[5]?.replace(
                " ",
                "_"
              )}/events/${params?.eventId}`
            )
          }
        />
      )}
      {createEventModal && (
        <CreateEvent
          CEO
          createEventModal={createEventModal}
          setCreateEventModal={setCreateEventModal}
        />
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
    </>
  );
};

export default CeoEvents;
