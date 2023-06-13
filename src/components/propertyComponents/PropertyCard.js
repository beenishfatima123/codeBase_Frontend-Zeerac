import { IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { useWindowDims } from "../../utils/useWindowDims";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import CardBottomInfoBox from "./CardBottomInfoBox";
const useStyles = makeStyles(() => ({
  container: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
    cursor: "pointer",
  },
  backgroundImage: {
    position: "absolute",
    height: "100%",
    width: "100%",
    "&:hover": {
      opacity: 0.3,
    },
  },
  top: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    zIndex: 10,
    paddingTop: 30,
  },
  location: {
    fontSize: 10,
    color: "white",
    fontWeight: "bold",
    marginTop: 0,
    marginBottom: 0,
    textAlign: "left",
    marginLeft: 30,
  },
}));
const PropertyCard = ({ property }) => {
  const classes = useStyles();
  const { height } = useWindowDims();

  const [hovering, setHovering] = useState(false);

  return (
    <div
      className={classes.container}
      style={{ height: height - 64 || 500 }}
      onMouseOver={() => setHovering(true)}
      onMouseOut={() => setHovering(false)}
    >
      <img
        src={`${property?.image[0]}`}
        alt=""
        className={classes.backgroundImage}
      />
      <div className={classes.top}>
        <p className={classes.location}>SAVE 30%</p>
        <IconButton>
          <StarBorderIcon style={{ color: "white" }} />
        </IconButton>
      </div>
      <CardBottomInfoBox hovering={hovering} property={property} />
    </div>
  );
};

export default PropertyCard;
