import React, { useMemo } from "react";
import Skeleton from "@mui/material/Skeleton";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
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
const UserSkeleton = ({ customSize, containerStyle }) => {
  const classes = useStyles();
  const size = useMemo(() => {
    return customSize ? customSize : { height: 70, width: 70 };
  }, [customSize]);
  return (
    <div className={classes.container} style={containerStyle}>
      <Skeleton
        variant="circular"
        sx={{
          ...size,
          maxWidth: "40%",
        }}
      />
      <div className={classes.contentContainer}>
        <Skeleton width="40%" />
        <Skeleton width="50%" />
      </div>
    </div>
  );
};

export default UserSkeleton;
