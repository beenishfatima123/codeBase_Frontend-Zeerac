import React from "react";
import { makeStyles } from "@mui/styles";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "row",
    cursor: "pointer",
  },
  vertical: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 10,
  },
  title: {
    fontSize: 18,
    color: "#171725",
    marginBottom: 10,
  },
  location: {
    fontSize: 18,
    color: "#92929D",
  },
}));
const EventCard = ({ event }) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <CalendarTodayIcon style={{ color: "#92929D", fontSize: 30 }} />
      <div className={classes.vertical}>
        <span className={classes.title}>{event?.title}</span>
        <span
          className={classes.location}
        >{`${event?.title} . ${event?.location}`}</span>
      </div>
    </div>
  );
};

export default EventCard;
