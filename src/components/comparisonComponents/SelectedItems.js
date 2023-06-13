import React, { useMemo } from "react";
import { makeStyles } from "@mui/styles";
import defaultPost from "../../assets/defaultAssets/defaultPost.png";
import { IconButton } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { useWindowDims } from "../../utils/useWindowDims";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  propertyContainer: {
    height: 100,
    width: 100,
    borderRadius: 5,
    border: "1px solid #707070",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    position: "relative",
    margin: "0 10px",
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 5,
  },

  "@media (max-width: 600px)": {
    propertyContainer: {
      height: 70,
      width: 70,
    },
    image: {
      height: 70,
      width: 70,
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

const SelectedItems = ({ properties, remove }) => {
  const classes = useStyles();
  const { width } = useWindowDims();
  // eslint-disable-next-line
  const getPropertyImage = (elem) => {
    if (elem?.image?.length) return `${elem?.image[0]?.image}`;
    else if (elem?.floor_image?.length)
      return `${elem?.floor_image[0]?.floor_image}`;
    else return defaultPost;
  };
  const boxes = useMemo(() => {
    if (width < 1600 && width > 1300 && properties?.length <= 3) {
      return [...Array(3 - properties?.length || 0)];
    } else if (width < 1300 && properties?.length <= 2) {
      return [...Array(2 - properties?.length || 0)];
    } else return [...Array(4 - properties?.length || 0)];
  }, [width, properties]);

  return (
    <div className={classes.container}>
      {properties?.map((elem, index) => (
        <div className={classes.propertyContainer} key={index}>
          <img src={getPropertyImage(elem)} alt="" className={classes.image} />

          <IconButton
            sx={crossButton}
            component="label"
            onClick={() => remove(elem)}
          >
            <CancelIcon style={{ color: "#014493", fontSize: 18 }} />
          </IconButton>
        </div>
      ))}
      {boxes?.map((elem, index) => (
        <div className={classes.propertyContainer} key={index}></div>
      ))}
    </div>
  );
};

export default SelectedItems;
