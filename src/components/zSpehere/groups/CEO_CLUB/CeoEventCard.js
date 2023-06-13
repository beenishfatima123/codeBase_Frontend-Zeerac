import React from "react";
import moment from "moment";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CEO_CLUB_PARAM_IDS } from "../../../../utils/constants";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "row",
    cursor: "pointer",
    margin: "10px 0px",
  },
  vertical: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 10,
    flex: 1,
  },
  title: {
    fontSize: 14,
    color: "#415365",
    cursor: "pointer",
    textTransform: "capitalize",
  },
  infoContainer: {
    display: "flex",
    flex: 1,
    alignItems: "center",
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
const CeoEventCard = ({ event, label }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { darkMode } = useSelector((state) => state.global);

  return (
    <div className={classes.container}>
      <CalendarTodayIcon style={{ color: "#92929D", fontSize: 30 }} />
      <div className={classes.vertical}>
        <span className={classes.title}>{event?.name}</span>
        <span className={classes.location}>
          {moment(event?.start).format("dddd, MMMM Do YYYY")}
          {"."}
        </span>
        <div className={classes.infoContainer}>
          <span className={classes.location}>
            {moment(event?.start).format("LT")}
          </span>
          <span className={classes.type}>{event?.type}</span>
        </div>
      </div>
      <IconButton
        sx={{
          ml: "10px",
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          height: 30,
          width: 30,
        }}
        // onClick={() => navigate(`/zSphere/Groups/${group?.id}`)}
        onClick={() =>
          navigate(`/zSphere/CEO_Club/${CEO_CLUB_PARAM_IDS.EVENTS}/${label}`)
        }
      >
        <ArrowForwardIosIcon
          style={{ color: darkMode ? "#0ed864" : "#134696", fontSize: 18 }}
        />
      </IconButton>
    </div>
  );
};

export default CeoEventCard;
