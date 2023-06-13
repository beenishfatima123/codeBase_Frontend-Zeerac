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
}));
const ChatMessageSkeleton = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Skeleton width="20%" height={50} sx={{ mt: 1, mb: 1 }} />
      <Skeleton width="20%" height={50} sx={{ mt: 1, mb: 1 }} />
      <Skeleton width="20%" height={50} sx={{ mt: 1, mb: 1 }} />
      <Skeleton
        width="25%"
        height={50}
        sx={{ mt: 1, mb: 1, alignSelf: "flex-end" }}
      />
      <Skeleton
        width="25%"
        height={50}
        sx={{ mt: 1, mb: 1, alignSelf: "flex-end" }}
      />
      <Skeleton
        width="25%"
        height={50}
        sx={{ mt: 1, mb: 1, alignSelf: "flex-end" }}
      />
    </div>
  );
};

export default ChatMessageSkeleton;
