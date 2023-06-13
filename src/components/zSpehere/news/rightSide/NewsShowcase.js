import React from "react";
import { makeStyles } from "@mui/styles";
import { Button, Grid } from "@mui/material";
import { useState } from "react";
import { ArrowForwardIos } from "@mui/icons-material";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";

const buttonSx = {
  background:
    "linear-gradient(90deg, rgba(14,216,100,1) 0%, rgba(255,255,255,1) 100%)",
  textTransform: "none",
  color: "#134696",
  width: 130,
};
const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "row",
    marginTop: 20,
  },
  image: {
    height: "100%",
    width: "100%",
  },
  insights: {
    fontSize: 14,
    color: "#0ED864",
  },
  title: {
    fontSize: 30,
    color: "#134696",
    fontWeight: "bold",
    margin: "5px 0px",
  },
  user: {
    fontSize: 14,
    color: "#171725",
  },
  time: {
    fontSize: 12,
    color: "#92929D",
    marginLeft: 5,
  },
  details: {
    fontSize: 12,
    color: "#6B7B88",
  },
  "@media (max-width: 1024px)": {
    container: {
      flexDirection: "column",
    },
  },
}));

/* NewsShowcase takes newStory and displays it on main news page. */
const NewsShowcase = ({ newsStory }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [hovering, setHovering] = useState(false);

  return (
    <div className={classes.container}>
      <Grid container columnSpacing={2}>
        <Grid item xs={12} sm={5}>
          <p className={classes.insights}>Insights</p>
          <span className={classes.title}>
            {newsStory?.title?.slice(0, 30)}
          </span>
          <div style={{ margin: "10px 0px" }}>
            <span className={classes.user}>{newsStory?.author?.full_name}</span>
            <span className={classes.time}>
              {moment(newsStory?.updated_at).format("DD MMMM HH:MM a")}
            </span>
          </div>
          <p className={classes.details}>{newsStory?.description}</p>
          <Button
            variant="contained"
            sx={buttonSx}
            endIcon={<ArrowForwardIos style={{ color: "#134696" }} />}
            onClick={() => navigate(`/zSphere/News/${newsStory?.id}`)}
          >
            Read More
          </Button>
        </Grid>
        <Grid item xs={12} sm={7}>
          <img
            onMouseOver={() => setHovering(true)}
            onMouseOut={() => setHovering(false)}
            src={` ${newsStory?.feature_photo}`}
            alt=""
            className={classes.image}
            style={{
              WebkitFilter: hovering ? "none" : "grayscale(100%)",
              filter: hovering ? "none" : "grayscale(100%)",
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default NewsShowcase;
