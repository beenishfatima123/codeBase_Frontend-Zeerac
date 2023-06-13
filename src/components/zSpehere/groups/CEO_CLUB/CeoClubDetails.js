import React, { useEffect } from "react";
import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { getCEOClub } from "../../../../redux/slices/zSphereCEOSlice";
import ComponentLoader from "../../../globalComponents/ComponentLoader";
// import coverImage from "../../../../assets/zSpehere/CeoClubTop.png";

const joinBtnSx = {
  textTransform: "none",
  color: "#fff",
  backgroundColor: "#134696",
  borderRadius: "5px",
  padding: "6px 24px",
  "&:hover": {
    color: "#000",
    backgroundColor: "#F1F1F5",
  },
  mr: 1,
};

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    margin: "10px 0px",
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
  },
  cover: {
    width: "100%",
    height: 200,
    objectFit: "cover",
    zIndex: 10,
  },
  editProfile: {
    position: "absolute",
    right: 20,
    marginTop: 20,
    backgroundColor: "transparent",
    border: "1px solid #fff",
    color: "#fff",
    cursor: "pointer",
    height: 40,
    width: 100,
    borderRadius: 10,
    fontFamily: "medium",
    fontSize: 14,
    zIndex: 20,
  },
  userContainer: {
    display: "flex",
    justifyContent: "space-between",
    margin: "0px 16px",
    alignItems: "flex-end",
  },
  leftContainer: {
    display: "flex",
    alignItems: "flex-end",
  },
  profileImage: {
    width: 125,
    height: 125,
    objectFit: "cover",
    borderRadius: 5,
    border: "2px solid #134696",
    marginTop: -75,
    zIndex: 20,
  },
  name: {
    textTransform: "capitalize",
    color: "#134696",
    fontFamily: "medium",
    fontSize: 22,
    marginBottom: 5,
  },
  rightContainer: {
    display: "flex",
    paddingBottom: 5,
  },

  description: {
    margin: "24px 16px",
    fontSize: 15,
    color: "#44444F",
    wordSpacing: 2,
    fontFamily: "medium",
    maxWidth: "100%",
  },
  "@media (max-width: 650px)": {
    rightContainer: {
      display: "flex",
      flexDirection: "column",
    },

    profileImage: {
      width: 100,
      height: 100,
      marginTop: -50,
    },
  },
  "@media (max-width: 500px)": {
    userContainer: {
      flexDirection: "column",
      alignItems: "flex-start",
    },
    rightContainer: {
      display: "flex",
      flexDirection: "row",
      alignSelf: "flex-end",
      margin: "10px 0px",
    },
  },
}));

/* Main club details desiplayed on CEO club page. */
const CeoClubDetails = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { darkMode } = useSelector((state) => state.global);
  const { currentUser } = useSelector((state) => state.auth);
  const { getCEOClubData, getCEOClubApiInfo } = useSelector(
    (state) => state.zSphereCEO
  );

  /* get all CEO club data */
  useEffect(() => {
    // if (!getCEOClubData)
    dispatch(
      getCEOClub({
        token: currentUser?.token,
      })
    );
    // eslint-disable-next-line
  }, [currentUser]);

  return (
    <>
      {getCEOClubApiInfo?.loading ? (
        <ComponentLoader />
      ) : (
        <div
          className={classes.container}
          style={{
            backgroundColor: darkMode ? "#2f2f33" : "#fff",
          }}
        >
          <div style={{ position: "relative" }}>
            <img
              className={classes.cover}
              alt=""
              src={getCEOClubData?.cover_photo}
            />
          </div>
          <div className={classes.userContainer}>
            <div className={classes.leftContainer}>
              <img
                className={classes.profileImage}
                alt=""
                src={getCEOClubData?.photo}
              />
              <span
                className={classes.name}
                style={{
                  marginLeft: 10,
                  color: darkMode ? "#0ed864" : "#134696",
                }}
              >
                {getCEOClubData?.name}
              </span>
            </div>
            <div className={classes.rightContainer}>
              <Button sx={joinBtnSx}>Join</Button>
            </div>
          </div>
          <p
            className={classes.description}
            style={{ color: darkMode ? "#fff" : "#44444F" }}
          >
            {getCEOClubData?.description}
          </p>
        </div>
      )}
    </>
  );
};

export default CeoClubDetails;
