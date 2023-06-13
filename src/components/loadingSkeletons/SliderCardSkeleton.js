import React, { useMemo } from "react";
import Skeleton from "@mui/material/Skeleton";
import { makeStyles } from "@mui/styles";
import { useWindowDims } from "../../utils/useWindowDims";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flex: 1,
    margin: "0px 10px",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  contentContainer: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    margin: "0px 10px",
    maxWidth: 300,
  },
}));
const SliderCardSkeleton = () => {
  const classes = useStyles();
  const { width } = useWindowDims();

  const arraySize = useMemo(() => {
    if (width) {
      const totalSize = Math.floor(width / 300);
      return totalSize <= 0 ? 1 : totalSize - 1;
    } else return 1;
  }, [width]);

  return (
    <div className={classes.container}>
      {Array.from(new Array(arraySize))?.map((elem, index) => (
        <div className={classes.contentContainer} key={index}>
          <Skeleton
            variant="rectangular"
            sx={{
              height: 200,
              width: 300,
            }}
          />
          <Skeleton width="60%" />
          <Skeleton width="80%" />
          <Skeleton width="40%" />
          <Skeleton width="100%" />
        </div>
      ))}
    </div>
  );
};

export default SliderCardSkeleton;
