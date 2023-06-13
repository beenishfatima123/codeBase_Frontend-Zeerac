import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import propertiesBackground from "../../../assets/properties/propertiesBackground.png";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { TextTranslation } from "../../../utils/translation";
import { useSelector } from "react-redux";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  topBackground: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    backgroundPosition: "center",
    backgroundRepeat: " no-repeat",
    backgroundSize: "cover",
    width: "100%",
    minHeight: 360,
    backgroundImage: `linear-gradient(to bottom, rgba(255,255,255,0) 30%, rgba(255,255,255,255)),url(${propertiesBackground})`,
    marginTop: -64,
  },
  addBtn: {
    borderRadius: 35,
    backgroundColor: "#134696",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "0.5s",
    color: "white",
    margin: "20px 5%",
  },
  "@media (max-width: 674px)": {
    topBackground: {
      flexDirection: "column",
      justifyContent: "flex-end",
      alignItems: "flex-start",
    },
    addBtn: {
      alignSelf: "flex-end",
    },
  },
}));

/* The TopSection displays top part of properties (listings) page. */
const TopSection = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [hovering, setHovering] = useState(false);

  const { langIndex } = useSelector((state) => state.global);

  return (
    <div className={classes.topBackground}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="577.347"
        height="146.184"
        viewBox="0 0 527.347 146.184"
        style={{ maxWidth: "95%", textTransform: "uppercase" }}
      >
        <g
          id="Group_5913"
          data-name="Group 5913"
          transform="translate(28 -196.5)"
        >
          <text
            id="rEGIONal_listings"
            data-name="rEGIONal listings"
            transform="translate(72 222.5)"
            fill="#134696"
            fontSize="24"
            fontFamily="medium"
            opacity="0.4"
          >
            <tspan x="0" y="0">
              {TextTranslation.regional[langIndex]}{" "}
              {TextTranslation.listings[langIndex]}
            </tspan>
          </text>
          <text
            id="Land_is"
            data-name="Land is"
            transform="translate(72 275.684)"
            fill="#134696"
            fontSize="48"
            fontFamily="heavy"
          >
            <tspan x="0" y="0">
              {TextTranslation.landIs[langIndex]}
            </tspan>
          </text>
          <text
            id="Unlimited"
            transform="translate(215.347 329.684)"
            fill="#0ed864"
            fontSize="48"
            fontFamily="heavy"
          >
            <tspan x="0" y="0">
              {TextTranslation.unlimited[langIndex]}
            </tspan>
          </text>
          <rect
            id="Rectangle_5696"
            data-name="Rectangle 5696"
            width="241"
            height="13"
            transform="translate(-28 303.5)"
            fill="#134696"
          />
        </g>
      </svg>
      <div
        className={classes.addBtn}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        style={{
          padding: hovering ? "10px 40px" : 10,
        }}
        onClick={() => navigate("/create-post")}
      >
        {hovering ? (
          <span className={classes.btnText}>
            {TextTranslation.addListings[langIndex]}
          </span>
        ) : (
          <AddIcon style={{ color: "white" }} />
        )}
      </div>
    </div>
  );
};

export default TopSection;
