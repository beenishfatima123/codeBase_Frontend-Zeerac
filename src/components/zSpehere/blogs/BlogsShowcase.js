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
    flex: 1,
  },
  image: {
    height: 320,
    width: "100%",
  },
  insights: {
    fontSize: 18,
    color: "#0ED864",
  },
  title: {
    fontSize: 34,
    color: "#134696",
    fontWeight: "bold",
    margin: "5px 0px",
    paddingBottom: 10,
    fontFamily: "medium",
  },
  user: {
    fontSize: 18,
    color: "#171725",
  },
  time: {
    fontSize: 18,
    color: "#92929D",
    marginLeft: 5,
  },
  details: {
    fontSize: 18,
    color: "#6B7B88",
    wordBreak: "break-word",
  },
  "@media (max-width: 1024px)": {
    container: {
      flexDirection: "column",
    },
  },
}));

/* takes blog and reverse bool to display individual blog along with its images in grid in top trending.*/
const BlogsShowcase = ({ blog, reverse }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [hovering, setHovering] = useState(false);

  return (
    <div className={classes.container}>
      <Grid
        container
        columnSpacing={1}
        sx={{
          flexDirection: reverse ? "row-reverse" : "row",
          maxWidth: "98%",
        }}
        rowSpacing={2}
      >
        <Grid item xs={12} sm={6}>
          <p className={classes.insights}>Property</p>

          <span className={classes.title}>{blog?.title?.slice(0, 50)}</span>
          <div style={{ margin: "20px 0px" }}>
            <span className={classes.user}>{blog?.author?.full_name}</span>
            <span className={classes.time}>
              {moment(blog?.updated_at).format("DD MMMM HH:MM a")}
            </span>
          </div>
          <p className={classes.details}>{blog?.description}</p>
          <Button
            variant="contained"
            sx={buttonSx}
            endIcon={<ArrowForwardIos style={{ color: "#134696" }} />}
            // onClick={() => dispatch(setSelectedStory(blog))}
            onClick={() => navigate(`/zSphere/Blogs/${blog?.id}`)}
          >
            Read More
          </Button>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: reverse ? "flex-start" : "flex-end",
          }}
        >
          <img
            onMouseOver={() => setHovering(true)}
            onMouseOut={() => setHovering(false)}
            src={` ${blog?.feature_photo}`}
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

export default BlogsShowcase;
