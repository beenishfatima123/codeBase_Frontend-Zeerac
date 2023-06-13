import React from "react";
import Skeleton from "@mui/material/Skeleton";
import { makeStyles } from "@mui/styles";
import { useWindowDims } from "../../utils/useWindowDims";
import { CONTENT_WIDTH } from "../../utils/constants";

const useStyles = makeStyles(() => ({
  mainContainer: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    width: CONTENT_WIDTH,
    maxWidth: "95%",
    alignSelf: "center",
  },
  container: {
    display: "flex",
    flex: 1,
    margin: "10px 0px",
    alignItems: "center",
    justifyContent: "space-between",
  },
  contentContainer: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    marginLeft: 10,
    justifyContent: "space-evenly",
  },
}));
const AgentsTableSkeleton = () => {
  const classes = useStyles();
  const { width } = useWindowDims();

  return (
    <div className={classes.mainContainer}>
      {width > 600 ? (
        <>
          {Array.from(new Array(3))?.map((elem, index) => (
            <div className={classes.container} key={index}>
              <Skeleton variant="circular" width={40} height={40} />
              <Skeleton width="10%" height={30} />
              <Skeleton width="25%" height={30} />
              <Skeleton width="20%" height={30} />
              <Skeleton width="10%" height={30} />
              <Skeleton width="25%" height={30} />
            </div>
          ))}
        </>
      ) : (
        <>
          {Array.from(new Array(3))?.map((elem, index) => (
            <div className={classes.container} key={index}>
              <Skeleton
                variant="circular"
                sx={{
                  height: 70,
                  width: 70,
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
        </>
      )}
    </div>
  );
};

export default AgentsTableSkeleton;
