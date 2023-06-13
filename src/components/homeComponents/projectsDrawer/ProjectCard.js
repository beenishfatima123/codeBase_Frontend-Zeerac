import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { useWindowDims } from "../../../utils/useWindowDims";
import SocialsContainer from "./SocialsContainer";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  backgroundImage: {
    position: "absolute",
    height: "100%",
    width: "100%",
  },
  textContainer: {
    position: "absolute",
    top: "45%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "center",
    width: "90%",
    zIndex: 10,
    // marginTop: 50,
  },
  footer: {
    position: "absolute",
    bottom: 10,
    display: "flex",
    flexDirection: "row",
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "space-between",
    padding: "20px 10px",
    zIndex: 10,
    width: "95%",
  },
  tagline: {
    color: "white",
    fontSize: 25,
    margin: 0,
  },
  divider: {
    width: "70%",
    height: 1,
    backgroundColor: "white",
    marginTop: 10,
  },
  projectTitle: {
    color: "white",
    fontSize: 93,
    margin: 0,
  },
  location: {
    color: "white",
    fontSize: 20,
    margin: 0,
  },
}));
const ProjectCard = ({ project }) => {
  const classes = useStyles();
  const { height } = useWindowDims();

  return (
    <div className={classes.container} style={{ height: height - 74 || 500 }}>
      <img
        src={`${project?.logo}`}
        alt=""
        className={classes.backgroundImage}
      />
      <div className={classes.textContainer}>
        <p className={classes.tagline}> Discover Modern Houses </p>
        <div className={classes.divider}></div>
        <p className={classes.projectTitle}> {project?.title}</p>
        <p className={classes.location}> {project?.title}</p>
        <Button
          variant="outlined"
          sx={{
            borderColor: "white",
            color: "white",
            textTransform: "none",
            fontSize: 18,
            mt: 5,
            "&:hover": {
              backgroundColor: "#1C1C1C",
              borderColor: "white",
            },
          }}
        >
          Explore More
        </Button>
      </div>
      <div className={classes.footer}>
        <div></div>
        <SocialsContainer />
      </div>
    </div>
  );
};

export default ProjectCard;
