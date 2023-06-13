import React from "react";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import { useWindowDims } from "../../../../utils/useWindowDims";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    padding: "0px 10px",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    width: "90%",
    maxWidth: 300,
    borderBottom: "1px solid #C9C9C9",
    margin: "10px 0px",
    paddingBottom: "10px",
    cursor: "pointer",
  },
  image: {
    height: 150,
    width: "100%",
  },
  insights: {
    fontSize: 11,
    color: "#0ED864",
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
  },
  heading: {
    fontSize: 25,
    color: "#134696",
    fontWeight: "bold",
  },
  newsContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  "@media (max-width: 1024px)": {
    container: {
      flexDirection: "column",
    },
    newsContainer: {
      flexDirection: "row",
      overflowX: "scroll",
      "&::-webkit-scrollbar": {
        height: "0.2em",
      },
      "&::-webkit-scrollbar-track": {
        WebkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#134696",
        borderRadius: "5px",
      },
      scrollBehavior: "smooth !important",
    },
    card: {
      margin: "0px 10px",
    },
    image: {
      height: 150,
      width: 250,
    },
  },
}));

/* LatestNews takes news and shows top items in in form of grid cards. */
const LatestNews = ({ news }) => {
  const classes = useStyles();
  const { width } = useWindowDims();
  const navigate = useNavigate();

  const [hovering, setHovering] = useState(false);
  return (
    <div className={classes.container}>
      <p className={classes.heading}>Latest News</p>
      <div
        className={classes.newsContainer}
        style={{
          width: width > 1024 ? "100%" : width * 0.9 || 500,
        }}
      >
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
            <span className={classes.insights}>Insights</span>
            <span className={classes.title}>{elem?.title}</span>
            <div>
              <span className={classes.user}>{elem?.author?.full_name}</span>
              <span className={classes.time}>
                {" "}
                {moment(elem?.updated_at).format("DD MMMM HH:MM a")}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestNews;
