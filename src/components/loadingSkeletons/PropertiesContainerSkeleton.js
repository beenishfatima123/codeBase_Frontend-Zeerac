import React from "react";
import Skeleton from "@mui/material/Skeleton";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flex: 1,
    margin: "20px 0px",
  },
  contentContainer: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    marginLeft: 10,
    justifyContent: "space-evenly",
  },
}));
const PropertiesContainerSkeleton = () => {
  const classes = useStyles();

  return (
    <div>
      {Array.from(new Array(4))?.map((elem, index) => (
        <div className={classes.container} key={index}>
          <Skeleton
            variant="rectangular"
            sx={{
              height: 120,
              width: 200,
              maxWidth: "40%",
            }}
          />
          <div className={classes.contentContainer}>
            <Skeleton width="40%" />
            <Skeleton width="50%" />
            <Skeleton width="90%" />
            <Skeleton width="100%" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PropertiesContainerSkeleton;
