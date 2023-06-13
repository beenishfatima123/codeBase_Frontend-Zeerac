import React, { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { Button, Grow, IconButton, Slide } from "@mui/material";
import defaultPost from "../../assets/defaultAssets/defaultPost.png";
import CancelIcon from "@mui/icons-material/Cancel";
import { setPropertiesToCompare } from "../../redux/slices/globalSlice";
import { useNavigate } from "react-router-dom";
import { useWindowDims } from "../../utils/useWindowDims";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    width: "100%",
    position: "fixed",
    bottom: 0,
    padding: "8px 16px",
    zIndex: 400,
  },
  overlay: {
    // minHeight: 320,
    zIndex: 0,
    backgroundColor: "black",
    opacity: 0.8,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  propertyContainer: {
    height: 150,
    width: 150,
    borderRadius: 5,
    border: "1px solid #707070",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    position: "relative",
    margin: "0 10px",
    zIndex: 10,
  },
  image: {
    height: 150,
    width: 150,
    borderRadius: 5,
  },
  topContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    margin: "5px 5%",
    alignSelf: "flex-end",
    zIndex: 10,
  },
  bottomContainer: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
    zIndex: 10,
  },
  "@media (max-width: 700px)": {
    propertyContainer: {
      height: 100,
      width: 100,
    },
    image: {
      height: 100,
      width: 100,
    },
  },
}));
const crossButton = {
  position: "absolute",
  top: -8,
  right: -8,
  p: 0,
  zIndex: 1,
  backgroundColor: "#fff",
};
const ComparisonOverlay = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { width } = useWindowDims();
  const { propertiesToCompare } = useSelector((state) => state.global);

  useEffect(() => {
    if (width < 1600 && width > 1300 && propertiesToCompare?.length > 3) {
      dispatch(setPropertiesToCompare(propertiesToCompare?.slice(0, 3)));
    } else if (width < 1300 && propertiesToCompare?.length > 2) {
      dispatch(setPropertiesToCompare(propertiesToCompare?.slice(0, 2)));
    }
    // eslint-disable-next-line
  }, [width, propertiesToCompare]);
  const getPropertyImage = (elem) => {
    if (elem?.image?.length) return `${elem?.image[0]?.image}`;
    else if (elem?.floor_image?.length)
      return `${elem?.floor_image[0]?.floor_image}`;
    else return defaultPost;
  };
  const handleRemoveProperty = (property) => {
    dispatch(
      setPropertiesToCompare(
        propertiesToCompare?.filter((elem) => elem?.id !== property?.id)
      )
    );
  };
  const handleRemoveAll = () => {
    dispatch(setPropertiesToCompare([]));
  };
  return (
    <Grow in={propertiesToCompare?.length > 0}>
      <div className={classes.container}>
        <div className={classes?.overlay} />
        <div className={classes.topContainer}>
          <Button
            sx={{
              padding: "6px 20px",
              backgroundColor: "#134696",
              textTransform: "none",
              borderRadius: 25,
              color: "#fff",
            }}
            onClick={() => navigate("/comparison")}
          >
            Compare
          </Button>
          <Button
            sx={{
              padding: "6px 20px",
              backgroundColor: "#fff",
              textTransform: "none",
              borderRadius: 25,
              color: "#134696",
              margin: "0px 5px",
              border: "1px solid #134696",
            }}
            onClick={handleRemoveAll}
          >
            Cancel
          </Button>
        </div>
        <div className={classes.bottomContainer}>
          {propertiesToCompare?.map((elem, index) => (
            <Slide
              direction="up"
              in={true}
              mountOnEnter
              unmountOnExit
              key={index}
            >
              <div className={classes.propertyContainer}>
                <img
                  src={getPropertyImage(elem)}
                  alt=""
                  className={classes.image}
                />

                <IconButton
                  sx={crossButton}
                  component="label"
                  onClick={() => handleRemoveProperty(elem)}
                >
                  <CancelIcon style={{ color: "#014493", fontSize: 18 }} />
                </IconButton>
              </div>
            </Slide>
          ))}
        </div>
      </div>
    </Grow>
  );
};

export default ComparisonOverlay;
