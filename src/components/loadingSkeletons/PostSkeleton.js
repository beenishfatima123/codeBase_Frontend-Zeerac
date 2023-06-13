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
    padding: 20,
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
const PostSkeleton = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.userContainer}>
        <Skeleton width={72} height={72} variant="circular" />
        <div className={classes.vertical}>
          <Skeleton width="40%" />
          <Skeleton width="30%" />
        </div>
      </div>
      <Skeleton width="100%" sx={{ mt: 1, mb: 1 }} />
      <Skeleton width="100%" height={200} variant={"rectangular"} />
    </div>
  );
};

export default PostSkeleton;
