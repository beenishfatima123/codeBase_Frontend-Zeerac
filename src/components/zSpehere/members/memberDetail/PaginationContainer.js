import React, { useEffect, useMemo, useRef } from "react";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import useOnScreen from "../../../../utils/hooks/useOnScreen";
import UserSkeleton from "../../../loadingSkeletons/UserSkeleton";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    padding: "20px 0px",
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    borderRadius: 8,
    margin: "20px 0px",
  },
  text1: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "medium",
    margin: "5px 0px",
    alignSelf: "center",
  },
  text2: {
    fontSize: 17,
    fontWeight: "bold",
    alignSelf: "center",
  },
}));

/* Paginate over given data. */
const PaginationContainer = ({
  paginationData,
  loading,
  paginationFunction,
  label,
  destination,
}) => {
  const classes = useStyles();
  const containerRef = useRef();
  const dispatch = useDispatch();
  const isOnScreen = useOnScreen(containerRef);

  const { darkMode } = useSelector((state) => state.global);
  const { currentUser } = useSelector((state) => state.auth);

  const paginationUrl = useMemo(
    () => paginationData?.next?.replace("http", "https"),
    [paginationData]
  );
  useEffect(() => {
    if (isOnScreen && paginationData?.next && !loading) {
      paginate();
    }
    // eslint-disable-next-line
  }, [isOnScreen, paginationData, loading]);

  const paginate = async () => {
    // console.log("pagination...");
    dispatch(
      paginationFunction({
        token: currentUser?.token,
        url: paginationUrl,
        destination,
      })
    );
  };
  return (
    <div
      className={classes.container}
      ref={containerRef}
      style={{
        backgroundColor: darkMode ? "#2f2f33" : "#fff",
      }}
    >
      {loading ? (
        <UserSkeleton customSize={{ height: 40, width: 40 }} />
      ) : (
        <>
          <span
            className={classes.text1}
            style={{
              color: darkMode ? "#fff" : "#65676b",
            }}
          >
            {label?.title}
          </span>
          <span
            className={classes.text2}
            style={{
              color: darkMode ? "#fff" : "#65676b",
            }}
          >
            {label?.description}
          </span>
        </>
      )}
    </div>
  );
};

export default PaginationContainer;
