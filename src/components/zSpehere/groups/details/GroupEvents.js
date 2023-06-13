import React, { useState, useMemo } from "react";
import moment from "moment";
import { Button, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import CreateEvent from "../modals/events/CreateEvent";
import PastEvents from "./PastEvents";
import { GROUP_DETAIL_CONTENT } from "../../../../utils/constants";
import { useNavigate, useParams } from "react-router-dom";
import EventsMenu from "./EventsMenu";
import {
  deleteEvent,
  interestedEvent,
  resetDeleteEventApiInfo,
  resetInterestedEventApiInfo,
  sendEventInvitation,
} from "../../../../redux/slices/zSphereEventSlice";
import ButtonLoader from "../../../globalComponents/ButtonLoader";
import { useEffect } from "react";
import { toast } from "react-toastify";
import ConfirmModal from "../../../settingComponents/myListings/ConfirmModal";
import ReportEvent from "../modals/events/ReportEvent";
import ShareModal from "../../../globalComponents/misc/ShareModal";
import NotFound from "../../../globalComponents/NotFound";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import useDebounceSearch from "../../../../utils/hooks/useDebounceSearch";
import { searchUpcomingEvents } from "../../../../api/socialApi";
import ComponentLoader from "../../../globalComponents/ComponentLoader";
import UserModalContainer from "../modals/usersModal/UserModalContainer";

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
  height: 35,
  padding: "10px",
  fontFamily: "medium",
  fontSize: 14,
  color: "#fff",
  backgroundColor: "#134698",
  cursor: "pointer",
  textTransform: "capitalize",
  "&:hover": {
    backgroundColor: "#134698",
  },
};

const useStyles = makeStyles(() => ({
  btnContainer: {
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
    margin: "4px 0px",
    fontSize: 12,
    width: "70%",
  },
  eventPhoto: {
    height: 75,
    width: 75,
    objectFit: "cover",
    borderRadius: "50%",
  },
  btn2Container: {
    display: "flex",
    alignItems: "center",
  },
  interested: {
    padding: "10px",
    fontFamily: "medium",
    fontSize: 14,
    color: "#fff",
    backgroundColor: "#0ed864",
    borderRadius: 5,
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
  "@media (max-width: 500px)": {
    search: {
      width: 200,
    },
  },
}));

/* Component for displaying all group events. */
const GroupEvents = ({ setSelectedContent }) => {
  const params = useParams();
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searched, setSearched] = useState();
  const [createEventModal, setCreateEventModal] = useState(false);
  const [loaderId, setLoaderId] = useState();
  const [deletedId, setDeletedId] = useState();
  const [shareId, setShareId] = useState();
  const [eventId, setEventId] = useState();
  const [deleteEventModal, setDeleteEventModal] = useState(false);
  const [showEvents, setShowEvents] = useState("upcoming");
  const [openReportModal, setOpenReportModal] = useState(false);
  const [openShareModal, setOpenShareModal] = useState(false);
  const [openInviteModal, setOpenInviteModal] = useState(false);

  const { currentUser } = useSelector((state) => state.auth);
  const { getEventsData, interestedEventsApiInfo, deleteEventApiInfo } =
    useSelector((state) => state.zSphereEvents);
  const { selectedGroup } = useSelector((state) => state.groups);

  const { loading, searchResult } = useDebounceSearch(
    searched,
    searchUpcomingEvents,
    {
      groupId: selectedGroup?.id,
    }
  );

  /* if searched -> show search results otherwise show all event data. */
  const dataToShow = useMemo(() => {
    if (searched?.length > 2) {
      return searchResult?.results;
    } else {
      return getEventsData?.results;
    }
  }, [searchResult?.results, getEventsData?.results, searched]);

  useEffect(() => {
    // eslint-disable-next-line
  }, [getEventsData?.results]);

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

  /* Delete event dispatch */
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

  return (
    <>
      <div className={classes.btnContainer}>
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
            }}
          >
            Find Upcoming Events
          </Button>
        ) : (
          <Button
            sx={btnSx}
            onClick={() => {
              setShowEvents("past");
            }}
          >
            Find Past Events
          </Button>
        )}
      </div>
      {showEvents === "upcoming" ? (
        <div className={classes.container}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              {/* top bar in upcoming event section. */}
              <div className={classes.top}>
                {/* back icon before upcoming events. */}
                <div style={{ display: "flex", alignItems: "center" }}>
                  <KeyboardBackspaceIcon
                    onClick={() =>
                      setSelectedContent(GROUP_DETAIL_CONTENT.POSTS)
                    }
                    style={{ color: "#134696", cursor: "pointer" }}
                  />
                  <div className={classes.heading}>Upcoming Events</div>
                </div>
                {/* relevant event search bar with search icon. */}
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
            {/* if not events are found. */}
            {dataToShow?.length === 0 && (
              <Grid
                item
                sm={12}
                md={12}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <NotFound label=" No Upcoming Events" />
              </Grid>
            )}

            {loading ? (
              <ComponentLoader />
            ) : (
              dataToShow?.map((elem, index) => {
                const _interested = elem?.interested?.includes(currentUser?.id);
                return (
                  <Grid
                    key={index}
                    item
                    xs={12}
                    sm={12}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    {/* image, name, date of event. */}
                    <img
                      className={classes.eventPhoto}
                      alt=""
                      src={elem?.photo}
                    />
                    <div
                      className={classes.vertical}
                      style={{ cursor: "pointer" }}
                      // onClick={() =>
                      // navigate(`/zSphere/Groups/${params?.id}/${elem?.id}`)
                      // }
                      onClick={() => {
                        navigate(
                          `/zSphere/Groups/${params?.id}/upcoming/${elem?.id}`
                        );
                      }}
                    >
                      <p className={classes.eventTitle}>{elem?.name}</p>
                      <p className={classes.eventDate}>
                        {moment(elem?.start).format("dddd") + ""}{" "}
                        {moment(elem?.start).format("LT") + ""} .{" "}
                        {elem?.location}
                      </p>
                    </div>
                    <div className={classes.btn2Container}>
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
                              })
                            );
                          }}
                        >
                          {interestedEventsApiInfo?.loading &&
                          loaderId === elem?.id ? (
                            <ButtonLoader size={20} color="#fff" />
                          ) : (
                            "Interested ?"
                          )}
                        </Button>
                      ) : (
                        <div className={classes.interested}>Interested</div>
                      )}
                      {/* menu for each individual event. */}
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
                  </Grid>
                );
              })
            )}
          </Grid>
        </div>
      ) : (
        <PastEvents setSelectedContent={setSelectedContent} />
      )}
      {createEventModal && (
        <CreateEvent
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

export default GroupEvents;
