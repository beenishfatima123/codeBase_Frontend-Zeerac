import React from "react";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import { Button } from "@mui/material";
import { ArrowForwardIos } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const buttonSx = {
  background:
    "linear-gradient(90deg, rgba(14,216,100,1) 0%, rgba(255,255,255,1) 100%)",
  textTransform: "none",
  color: "#134696",
  width: 125,
  height: 25,
  fontSize: 12,
};

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    // margin: "20px 0px",
    maxWidth: "98%",
  },
  heading: {
    fontSize: 25,
    color: "#134696",
    fontWeight: "bold",
    margin: 0,
  },
  card: {
    display: "flex",
    flex: 1,
    margin: "20px 0px",
  },
  image: {
    height: "100%",
    width: 300,
  },
  details: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    flex: 1,
    marginLeft: 20,
  },
  insights: {
    fontSize: 14,
    color: "#0ED864",
    margin: 0,
  },
  title: {
    fontSize: 24,
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
  description: {
    fontSize: 12,
    color: "#6B7B88",
  },
  "@media (max-width: 575px)": {
    card: {
      flexDirection: "column",
    },
    details: {
      marginLeft: 0,
    },
    image: {
      width: "100%",
    },
  },
}));

/*  */
const PopularNews = ({ news, searched }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [hovering, setHovering] = useState(false);

  return (
    <div className={classes.container}>
      {!searched && <p className={classes.heading}>Most Popular</p>}

      {news?.map((elem, index) => (
        <div
          className={classes.card}
          key={index}
          onMouseOver={() => setHovering(index)}
          onMouseOut={() => setHovering(null)}
          onClick={() => navigate(`/zSphere/News/${elem?.id}`)}
        >
          <img
            src={` ${elem?.feature_photo}`}
            alt=""
            className={classes.image}
            style={{
              WebkitFilter: hovering === index ? "none" : "grayscale(100%)",
              filter: hovering === index ? "none" : "grayscale(100%)",
            }}
          />
          <div className={classes.details}>
            <p className={classes.insights}>Insights</p>
            <span className={classes.title}>{elem?.title?.slice(0, 45)}</span>

            <p className={classes.description}>{elem?.description}</p>
            <Button
              variant="contained"
              sx={buttonSx}
              endIcon={<ArrowForwardIos style={{ color: "#134696" }} />}
            >
              Read More
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PopularNews;
