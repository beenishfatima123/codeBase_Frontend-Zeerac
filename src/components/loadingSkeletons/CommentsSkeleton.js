import React from "react";
import Skeleton from "@mui/material/Skeleton";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flex: 1,
    margin: "20px 0px",
    flexDirection: "column",
    backgroundColor: "#fff",
  },
  userContainer: {
    display: "flex",
    flex: 1,
  },
  vertical: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: 10,
  },
}));
const CommentSkeleton = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.userContainer}>
        <Skeleton width={20} height={20} variant="circular" />
        <Skeleton width="40%" sx={{ ml: 1 }} />
      </div>
      <Skeleton width="100%" sx={{ mt: 1, mb: 1 }} height={30} />
      <div className={classes.userContainer}>
        <Skeleton width="20%" sx={{ mr: 2 }} />
        <Skeleton width="20%" />
      </div>
    </div>
  );
};

export default CommentSkeleton;
