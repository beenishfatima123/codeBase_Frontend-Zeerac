import { Button } from "@mui/material";
import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import verifiedBadge from "../../assets/verifiedBadge.png";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import IconsContainer from "../propertyComponents/misc/IconsContainer";
import { useWindowDims } from "../../utils/useWindowDims";
import { TextTranslation } from "../../utils/translation";
import { useSelector } from "react-redux";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "center",
    margin: "0px 20px",
    // transition: "all 0.2s ease-in-out",
  },
  grid: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  nameContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  name: {
    fontSize: 30,
    color: "#FFFFFF",
    textTransform: "capitalize",
  },
  iconsStyle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 210,
  },
  address: {
    fontSize: 21,
    color: "#FFFFFF",
    maxWidth: 250,
  },
  map: {
    fontSize: 10,
    color: "#FFFFFF",
  },
  detailsHeading: {
    marginTop: 20,
    color: "#0ED864",
    fontSize: 19,
  },
  details: {
    marginTop: 10,
    color: "#FFFFFF",
    fontSize: 18,
    height: 100,
    overflowY: "scroll",
  },
  rightContainer: {
    height: "100%",
    backgroundColor: "black",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    position: "relative",
    width: "35%",
    cursor: "pointer",
  },
  leftContainer: {
    backgroundColor: "#134696",
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    width: "65%",
  },
  agentPic: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: "100%",
    height: "100%",
    objectFit: "fill",
    zIndex: 0,
    "-webkit-filter": "grayscale(100%)" /* Safari 6.0 - 9.0 */,
    filter: "grayscale(100%)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },

  badge: {
    alignSelf: "flex-end",
    zIndex: 10,
    margin: 20,
  },
  horizontal: {
    display: "flex",
    alignItems: "center",
    zIndex: 10,
    margin: 20,
  },
  listingsTotal: {
    fontSize: 45,
    color: "#FFFFFF",
    margin: "0px 0px",
  },
  listingsTitle: {
    fontSize: 22,
    color: "#0ED864",
  },
  "@media (max-width: 935px)": {
    grid: {
      flexDirection: "column-reverse",
    },
    rightContainer: {
      width: "100%",
      height: 300,
      padding: "20px",
    },
    leftContainer: {
      width: "100%",
    },
    badge: {
      margin: 0,
    },
    horizontal: {
      margin: 0,
    },
    name: {
      fontSize: 20,
    },
    iconsStyle: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
    },
    address: {
      fontSize: 16,
      color: "#FFFFFF",
      maxWidth: 150,
    },
  },
  "@media (max-width: 500px)": {
    nameContainer: {
      flexDirection: "column",
      alignItems: "flex-start",
    },
    address: {
      maxWidth: 300,
    },
    details: {
      fontSize: 16,
      paddingRight: 20,
    },
  },
}));

/* FeaturedAgent is the component on the featured carousel on agents page.
It displays featured agents, search bar, filters, agents table and agents pagination. */
const FeaturedAgent = ({ agent, setOpenMap, setSelectedAgent }) => {
  const classes = useStyles();

  const navigate = useNavigate();

  const [agentActions, setAgentActions] = useState();

  const { width } = useWindowDims();

  const { langIndex } = useSelector((state) => state.global);

  return (
    <div className={classes.container}>
      {/* <img
        alt=""
        src={verticalLines}
        style={{ position: 'absolute', left: 0 }}
      /> */}

      <div className={classes.grid}>
        <div className={classes.leftContainer}>
          <div className={classes.nameContainer}>
            <span
              className={classes.name}
              onClick={() => {
                navigate(`/agents/${agent?.id}`);
              }}
            >
              {agent?.full_name}
            </span>
            {/* <span>
              <img alt="" src={lines} style={{ position: 'absolute' }} />
            </span> */}
            <IconsContainer
              customStyle={classes.iconsStyle}
              phoneNumber={
                agent?.phone_number ? agent?.phone_number : "Not Provided"
              }
              setPropertyActions={setAgentActions}
              propertyActions={agentActions}
              customSize={width > 700 ? 32 : 24}
              customColor="#FFFFFF"
              agent={agent}
            />
          </div>
          <div className={classes.nameContainer}>
            <span className={classes.address}>
              {`${agent?.area || ""}, ${agent?.city || ""}, ${
                agent?.country || ""
              }`}
            </span>
            <Button
              sx={{
                display: "flex",
                alignItems: "center",
                textTransform: "none",
              }}
              onClick={() => {
                setOpenMap(true);
                setSelectedAgent(agent);
              }}
            >
              <LocationOnIcon
                style={{ color: "white", fontSize: 20, marginRight: 10 }}
              />
              <span className={classes.map}>View on map</span>
            </Button>
          </div>

          <span className={classes.detailsHeading}>Personal Details</span>
          <span className={classes.details}>{agent?.personal_description}</span>
        </div>
        <div
          className={classes.rightContainer}
          onClick={() => {
            navigate(`/agents/${agent?.id}`);
          }}
        >
          <div
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 60%, rgba(0,0,0,1)),url(${agent?.photo})`,
            }}
            className={classes.agentPic}
          />
          {agent?.verification_status ? (
            <img src={verifiedBadge} alt="" className={classes.badge} />
          ) : (
            <div />
          )}

          <div className={classes.horizontal}>
            <div style={{ marginRight: 30 }}>
              <p className={classes.listingsTotal}>{agent?.total_listings}</p>
              <span className={classes.listingsTitle}>
                {TextTranslation.totalListings[langIndex]}
              </span>
            </div>
            {/* <div>
              <p className={classes.listingsTotal}>5.0</p>
              <span className={classes.listingsTitle}>
                Ratings - 343 Reviews
              </span>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedAgent;
