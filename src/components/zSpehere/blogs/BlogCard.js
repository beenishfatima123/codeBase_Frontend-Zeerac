import React from "react";
import { makeStyles } from "@mui/styles";
import { Button } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";
const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    width: 300,
    height: 300,
    justifyContent: "space-between",
  },
  image: {
    height: 170,
    width: 300,
    filter: "grayscale(100%)",
    "&:hover": {
      filter: "grayscale(0%)",
    },
  },
  insights: {
    fontSize: 11,
    color: "#0ED864",
    margin: 0,
  },
  title: {
    fontSize: 20,
    color: "#134696",
    fontWeight: "bold",
    margin: 0,
    textTransform: "capitalize",
  },
  divider: {
    width: "95%",
    height: 1,
    backgroundColor: "#C9C9C9",
    marginTop: 20,
    marginBottom: 10,
  },
}));

/* BlogCard component takes blog as parameter and displays it in form of card on the blogs grid with image, title, and read more button. The card is smaller than blog showcase. */
const BlogCard = ({ blog }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <div className={classes.container}>
      <div
        onClick={() => navigate(`/zSphere/Blogs/${blog?.id}`)}
        style={{ cursor: "pointer" }}
      >
        <img src={` ${blog?.feature_photo}`} alt="" className={classes.image} />
        <p className={classes.insights}>Insights</p>
        <p className={classes.title}>{blog?.title?.toLowerCase()}</p>
      </div>
      <div>
        <div className={classes.divider} />
        <Button
          startIcon={
            <ArrowForwardIosIcon style={{ color: "#134696", fontSize: 11 }} />
          }
          onClick={() => navigate(`/zSphere/Blogs/${blog?.id}`)}
          sx={{
            fontSize: 11,
            color: "#134696",
            textTransform: "none",
            width: "88px",
            height: "15px",
            fontFamily: "medium",
            p: 0,
          }}
        >
          Read More
        </Button>
      </div>
    </div>
  );
};

export default BlogCard;
