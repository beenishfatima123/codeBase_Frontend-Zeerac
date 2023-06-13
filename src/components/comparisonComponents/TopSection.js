import React from "react";
import { makeStyles } from "@mui/styles";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import KeyboardBackspaceSharpIcon from "@mui/icons-material/KeyboardBackspaceSharp";
import { TextTranslation } from "../../utils/translation";
import { useSelector } from "react-redux";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "20px 5%",
  },
  "@media (max-width: 740px)": {
    container: {
      flexDirection: "column",
      alignItems: "flex-start",
    },
  },
}));
const TopSection = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { langIndex } = useSelector((state) => state.global);

  return (
    <div className={classes.container}>
      <Button
        sx={{
          background:
            "linear-gradient(90deg, rgba(14,216,100,0.9) 55%, rgba(0,0,0,0) 100%)",
          textTransform: "none",
          color: "#134696",
          width: 170,
          height: 40,
          borderRadius: 0,
        }}
        startIcon={
          <KeyboardBackspaceSharpIcon
            style={{ color: "#134696", marginLeft: -30 }}
          />
        }
        onClick={() => navigate(-1)}
      >
        {TextTranslation.back[langIndex]}
      </Button>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="626"
        height="120"
        viewBox="0 0 626 120"
        style={{ maxWidth: "100%", textTransform: "uppercase" }}
      >
        <g
          id="Group_7054"
          data-name="Group 7054"
          transform="translate(-403 -110.685)"
        >
          <text
            id="comparison"
            transform="translate(403 208.685)"
            fill="#134696"
            fontSize="100"
            fontFamily="heavy"
            letterSpacing="-0.07em"
            opacity="0.07"
          >
            <tspan x="0" y="0">
              {TextTranslation.comparison[langIndex]}
            </tspan>
          </text>
          <text
            id="property_survey"
            data-name="property survey"
            transform="translate(720 191.735)"
            fill="#134696"
            fontSize="37"
            fontFamily="heavy"
          >
            <tspan x="-181.393" y="0">
              {TextTranslation.propertySurvey[langIndex]}
            </tspan>
          </text>
        </g>
      </svg>
      <div style={{ width: 180 }}></div>
    </div>
  );
};

export default TopSection;
