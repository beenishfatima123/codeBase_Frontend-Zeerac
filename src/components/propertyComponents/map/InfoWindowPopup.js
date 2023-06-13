import React from "react";
import { makeStyles } from "@mui/styles";
import "./mapStyles.css";
import defaultPost from "../../../assets/defaultAssets/defaultPost.png";
import { currencyFormatInitials } from "../../../utils/helperFunctions";
import { Button } from "@mui/material";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "row",
  },
  image: {
    width: 130,
    height: 150,
    objectFit: "cover",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "8px 8px",
  },
  address: {
    fontSize: 16,
    fontFamily: "medium",
    color: "#1A2954",
    margin: 0,
  },
  currencyText: {
    fontSize: 16,
    fontFamily: "medium",
    color: "#134696",
    margin: 0,
  },
}));
const InfoWindowPopup = ({ listing, navigate }) => {
  const classes = useStyles();
  const getBackgroundImage = () => {
    let background = "";
    if (listing?.image?.length) background = `${listing?.image[0]?.image}`;
    else if (listing?.floor_image?.length)
      background = `${listing?.floor_image[0]?.floor_image})`;
    else background = defaultPost;
    // // console.log({ background });
    return background;
  };
  return (
    <div className={classes.container}>
      <img src={getBackgroundImage()} alt="" className={classes.image} />
      <div className={classes.content}>
        <div>
          <p className={classes.address}>
            {`${listing?.street || ""}, ${listing?.area || ""}, ${
              listing?.city || ""
            }`}
          </p>{" "}
          <p className={classes.currencyText}>
            {`${currencyFormatInitials(listing?.price, listing?.currency)}`}{" "}
          </p>
        </div>

        <Button
          sx={{
            backgroundColor: "#134696",
            fontSize: 12,
            fontFamily: "medium",
            color: "#fff",
            textTransform: "none",
            borderRadius: 10,
            padding: "2px 10px",
            "&:hover": {
              backgroundColor: "#134696",
            },
          }}
          onClick={() => navigate(`/listing/${listing?.id}`)}
        >
          Show Details
        </Button>
      </div>
    </div>
  );
};

export default InfoWindowPopup;
