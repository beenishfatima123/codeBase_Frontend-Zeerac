import React, { useMemo, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import {
  CEO_CLUB_EVENT_IDS,
  CEO_CLUB_PARAM_IDS,
  CONTENT_WIDTH,
} from "../../../../utils/constants";
import CeoList from "./CeoList";
import CeoEventList from "./CeoEventsList";
import { useDispatch, useSelector } from "react-redux";
import CeoClubDetails from "./CeoClubDetails";
import { useParams } from "react-router-dom";
import CeoPosts from "./CeoPosts";
import CeoMembers from "./CeoMembers";
import CeoEvents from "./CeoEvents";
import {
  getAllEvents,
  getAllPastEvents,
} from "../../../../redux/slices/zSphereEventSlice";

const useStyles = makeStyles(() => ({
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    margin: "20px 0px",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: CONTENT_WIDTH,
    maxWidth: "98%",
    alignSelf: "center",
  },
  leftPanel: {
    display: "flex",
    flexDirection: "column",
    maxWidth: 350,
    marginRight: 10,
    minWidth: 300,
  },
  rightPanel: {
    display: "flex",
    flex: 1,
    marginLeft: 10,
    flexDirection: "column",
  },

  "@media (max-width: 850px)": {
    container: {
      flexDirection: "column",
    },
    leftPanel: {
      flexDirection: "row",
      maxWidth: "100%",
      flex: 1,
      marginRight: 0,
      backgroundColor: "#fff",
      boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
      borderRadius: 5,
    },
    rightPanel: {
      marginLeft: 0,
    },
  },
}));

/* Main CEO club page rendering all CEO Club components. */
const Container = () => {
  const classes = useStyles();
  const params = useParams();
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.auth);
  const { getEventsData, pastEventsData } = useSelector(
    (state) => state.zSphereEvents
  );
  const { getCEOClubData } = useSelector((state) => state.zSphereCEO);

  // get all ceo upcoming event
  useEffect(() => {
    dispatch(
      getAllEvents({
        token: currentUser?.token,
        queryData: `group=${getCEOClubData?.id}&ceo_club=${true}`,
      })
    );
    // eslint-disable-next-line
  }, []);
  // get all ceo past events
  useEffect(() => {
    dispatch(
      getAllPastEvents({
        token: currentUser?.token,
        queryData: `group=${getCEOClubData?.id}&ceo_club=${true}`,
      })
    );
    // eslint-disable-next-line
  }, []);

  /* Render specific component based on params passed. */
  const renderContent = useMemo(() => {
    switch (params?.id) {
      case CEO_CLUB_PARAM_IDS.POSTS:
        return <CeoPosts />;
      case CEO_CLUB_PARAM_IDS.MEMBERS:
        return <CeoMembers />;
      case CEO_CLUB_PARAM_IDS.EVENTS:
        return <CeoEvents />;

      default:
        return <CeoPosts />;
    }
  }, [params?.id]);
  return (
    <div className={classes.mainContainer}>
      <div className={classes.container}>
        <div className={classes.leftPanel}>
          <CeoList />
          <CeoEventList
            label={CEO_CLUB_EVENT_IDS.UPCOMING}
            events={getEventsData}
          />
          <CeoEventList
            label={CEO_CLUB_EVENT_IDS.PAST}
            events={pastEventsData}
          />
        </div>
        <div className={classes.rightPanel}>
          <CeoClubDetails />
          {renderContent}
        </div>
      </div>
    </div>
  );
};

export default Container;
