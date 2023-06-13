import React from "react";
import { makeStyles } from "@mui/styles";
import verifiedBadge from "../../../assets/verifiedBadge.png";
import defaultImage from "../../../assets/defaultAssets/defaultAgent3.png";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MapModal from "../../globalComponents/misc/MapModal";
import { useState } from "react";
import KeyboardBackspaceSharpIcon from "@mui/icons-material/KeyboardBackspaceSharp";
import { TextTranslation } from "../../../utils/translation";
//import LeftContainerLines from './svgs/LeftContainerLines';

/* styling for back button. */
const buttonSx = {
  background:
    "linear-gradient(90deg, rgba(14,216,100,0.9) 55%, rgba(0,0,0,0) 100%)",
  textTransform: "none",
  color: "#134696",
  width: 135,
  height: 35,
  position: "absolute",
  top: "6%",
  left: "3%",

  "&:hover": {
    backgroundColor: "transparent",
  },
};
const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  top: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
    zIndex: 10,
  },
  bottom: {
    backgroundColor: "#134696",
    display: "flex",
    flex: 1,
    flexDirection: "column",
    padding: "10px 20px",
    justifyContent: "space-evenly",
  },
  agentPic: {
    width: "100%",
    height: 450,
    objectFit: "cover",
    zIndex: 0,
    "-webkit-filter": "grayscale(100%)" /* Safari 6.0 - 9.0 */,
    filter: "grayscale(100%)",
  },
  badge: {
    position: "absolute",
    top: "5%",
    right: "5%",
  },
  name: {
    fontSize: 32,
    color: "white",
    fontFamily: "heavy",
    textTransform: "capitalize",
  },
  address: {
    fontSize: 16,
    color: "#0ED864",
    textTransform: "capitalize",
  },
  mapContainer: {
    display: "flex",
    alignItems: "center",
    position: "relative",
  },
  map: {
    fontSize: 11,
    color: "#FFFFFF",
    fontFamily: "light",
  },
  horizontal: {
    display: "flex",
    alignItems: "center",
    zIndex: 10,
  },
  vertical: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    zIndex: 10,
  },
  listingsTotal: {
    fontSize: 45,
    color: "#FFFFFF",
    margin: "0px 0px",
  },
  listingsTitle: {
    fontSize: 16,
    color: "#0ED864",
  },
  info: {
    fontSize: 16,
    color: "#FFFFFF",
    margin: 0,
    fontFamily: "medium",
  },
}));

/* Left container is displayed on agent details page on the left side which contains
agent picture, agent name and address etc. */
const LeftContainer = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [openMap, setOpenMap] = useState(false);
  const { selectedAgent } = useSelector((state) => state.agents);
  const { langIndex } = useSelector((state) => state.global);

  return (
    <div className={classes.container}>
      <MapModal
        open={openMap}
        setOpen={setOpenMap}
        position={{
          lat: selectedAgent?.lat || 31.5204,
          lng: selectedAgent?.lng || 74.3587,
        }}
      />

      <div className={classes.top}>
        <img
          src={selectedAgent?.photo ? `${selectedAgent?.photo}` : defaultImage}
          alt=""
          className={classes.agentPic}
        />
        <Button
          sx={buttonSx}
          startIcon={
            <KeyboardBackspaceSharpIcon
              style={{ color: "#134696", marginLeft: -30 }}
            />
          }
          onClick={() => navigate("/agents", { replace: true })}
        >
          {TextTranslation.back[langIndex]}
        </Button>
        {selectedAgent?.verification_status_by_admin === "verified" && (
          <img src={verifiedBadge} alt="" className={classes.badge} />
        )}
      </div>
      <div className={classes.bottom}>
        {/* <div style={{ position: 'absolute' }}>
          <LeftContainerLines style={{ width: 320, marginTop: 30 }} />
        </div> */}
        <div>
          <span className={classes.name}>{`${selectedAgent?.full_name}`}</span>
          <p className={classes.address} style={{ margin: 0 }}>
            {`${selectedAgent?.address || ""}, ${selectedAgent?.area || ""}, ${
              selectedAgent?.city || ""
            }, ${selectedAgent?.country || ""}`}
          </p>
          <Button
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              position: "relative",
              textTransform: "none",
              maxWidth: 120,
              padding: "8px 0px",
            }}
            onClick={() => setOpenMap(true)}
          >
            <LocationOnIcon
              style={{ color: "white", fontSize: 20, marginRight: 10 }}
            />
            <span className={classes.map}>View on map</span>
          </Button>
        </div>
        <div>
          <div className={classes.horizontal}>
            <div style={{ marginRight: 30 }}>
              <p className={classes.listingsTotal}>
                {selectedAgent?.total_listings}
              </p>
              <span className={classes.listingsTitle}>
                {TextTranslation.totalListings[langIndex]}
              </span>
            </div>
            {/* <div>
              <p className={classes.listingsTotal}>5.0</p>
              <span className={classes.listingsTitle}>
                Ratings - {selectedAgent?.total_ratings} Reviews
              </span>
            </div> */}
          </div>
          <div className={classes.vertical} style={{ marginTop: 20 }}>
            <div style={{ marginRight: 30 }}>
              <span className={classes.info}>
                {TextTranslation.emailAddress[langIndex]}:
              </span>
              <p
                className={classes.info}
                style={{
                  fontWeight: "bold",
                  color: "#fff",
                }}
              >
                {selectedAgent?.email}
              </p>
            </div>
            <div style={{ margin: "10px 0px" }}>
              <p className={classes.info}>Contact Number:</p>
              <span
                className={classes.info}
                style={{
                  fontWeight: "bold",
                  color: "#fff",
                }}
              >
                {selectedAgent?.phone_number || "Not Provided"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftContainer;
