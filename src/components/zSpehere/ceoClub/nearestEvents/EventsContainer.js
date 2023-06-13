import React from "react";
import { Grid, IconButton } from "@mui/material";
import EventCard from "./EventCard";
import { makeStyles } from "@mui/styles";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
const useStyles = makeStyles(() => ({
  container: {
    boxShadow: " rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    margin: "20px 0px",
  },
  topContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  nearEvents: {
    background:
      "linear-gradient(90deg, rgba(14,216,100,1) 0%, rgba(255,255,255,1) 100%)",
    textTransform: "none",
    color: "#134696",
    width: 180,
    borderRadius: 0,
    alignSelf: "flex-end",
    height: 38,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingRight: 20,
    fontSize: 18,
    fontFamily: "medium",
  },
}));
const eventData = [
  {
    title: "Blue Arc Worldwide",
    time: "Thu 10.00",
    location: "Tokopedia Tower",
  },
  {
    title: "Blue Arc Worldwide",
    time: "Thu 10.00",
    location: "Tokopedia Tower",
  },
  {
    title: "Blue Arc Worldwide",
    time: "Thu 10.00",
    location: "Tokopedia Tower",
  },
  {
    title: "Blue Arc Worldwide",
    time: "Thu 10.00",
    location: "Tokopedia Tower",
  },
  {
    title: "Blue Arc Worldwide",
    time: "Thu 10.00",
    location: "Tokopedia Tower",
  },
  {
    title: "Blue Arc Worldwide",
    time: "Thu 10.00",
    location: "Tokopedia Tower",
  },
];
const EventsContainer = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.topContainer}>
        <div className={classes.nearEvents}>Nearest Events</div>
        <IconButton sx={{ mr: 2 }}>
          <MoreHorizIcon style={{ color: "#92929D" }} />
        </IconButton>
      </div>
      <Grid container spacing={2} sx={{ p: 1, mt: 1 }}>
        {eventData?.map((elem, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <EventCard event={elem} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default EventsContainer;
