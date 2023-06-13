import React, { useState } from "react";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CustomTooltip from "../globalComponents/CustomTooltip";
import { HEADER_CONTENT_WIDTH, PARTNER_LOGOS } from "../../utils/constants";
import IconsContainer from "../propertyComponents/misc/IconsContainer";
import {
  currencyFormatInitials,
  getConcatenatedPrice,
} from "../../utils/helperFunctions";

const useStyles = makeStyles(() => ({
  image: {
    width: "100%",
    height: 250,
    objectFit: "cover",
    cursor: "pointer",
    filter: "grayScale(100%)",
    WebkitFilter: "grayScale(100%)",
    "&:hover": {
      filter: "none",
      webkitFilter: "none",
    },
  },
  priceContainer: {
    position: "relative",
    marginTop: -65,
    paddingLeft: 10,
    paddingTop: 10,
    display: "flex",
    zIndex: 10,
    background: `linear-gradient(to top, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.7))`,
  },
  priceLabel: {
    color: "#fff",
    fontFamily: "medium",
    fontSize: 16,
  },
  price: {
    color: "#fff",
    fontFamily: "heavy",
    fontSize: 30,
    marginTop: -15,
  },
  bottomContainer: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 5px 10px 5px",
  },
  left: {
    width: "90%",
    lineHeight: 1.3,
  },
  name: {
    fontFamily: "heavy",
    color: "#134696",
    fontSize: 24,
    textTransform: "upperCase",
    height: 30,
    overflow: "hidden",
  },
  location: {
    fontFamily: "medium",
    color: "#134696",
    fontSize: 20,
    textTransform: "capitalize",
  },
  admin: {
    fontFamily: "medium",
    color: "#134696",
    fontSize: 16,
    textTransform: "capitalize",
  },
  right: {
    width: "10%",
  },
  iconsStyle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 20,
  },
}));

/* PartnersCard contains all the partners listed on the projects page, it takes the logos
as parameters and maps them for each project. */
const PartnersCard = ({ logos }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const { darkMode } = useSelector((state) => state.global);

  const [propertyActions, setPropertyActions] = useState();

  //console.log({ logos });

  return (
    <Grid
      container
      justifyContent={"center"}
      spacing={2}
      sx={{
        display: "flex",
        width: HEADER_CONTENT_WIDTH,
        maxWidth: "90%",
        alignSelf: "center",
      }}
    >
      {logos?.map((elem, index) => (
        <Grid item key={index} xs={10} sm={5.5} md={3.9} lg={3.7} xl={3.6}>
          <div
            style={{
              boxShadow:
                "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
            }}
          >
            <div
              onClick={() => {
                navigate(`/project/${elem?.id}`);
              }}
            >
              <img
                className={classes.image}
                alt=""
                src={
                  elem?.feature_photo ? elem?.feature_photo : PARTNER_LOGOS[2]
                }
              />
            </div>
            {elem?.price_min && (
              <CustomTooltip
                title={`${currencyFormatInitials(
                  elem?.price_min,
                  elem?.currency
                )}`}
              >
                <div
                  className={classes.priceContainer}
                  style={{
                    color: darkMode ? "#0ed864" : "#1A2954",
                  }}
                >
                  <p className={classes.priceLabel}>Price starting from</p>

                  <p className={classes.price}>
                    {elem?.price_min
                      ? getConcatenatedPrice(
                          currencyFormatInitials(
                            elem?.price_min,
                            elem?.currency
                          ),
                          14
                        )
                      : "NA"}
                  </p>
                </div>
              </CustomTooltip>
            )}
            <div className={classes.bottomContainer}>
              <div className={classes.left}>
                <CustomTooltip title={elem?.title}>
                  <div className={classes.name}>
                    {elem?.title?.length > 15
                      ? elem?.title.substring(0, 15) + "..."
                      : elem?.title}
                  </div>
                </CustomTooltip>
                <div className={classes.location}>
                  {elem?.city}, {elem?.country}
                </div>
                <hr />
                <div className={classes.admin}>
                  <span style={{ color: "#7d7d7d" }}>Project By: </span>
                  {elem?.company?.company_name}
                </div>
              </div>
              <div className={classes.right}>
                <IconsContainer
                  customStyle={classes.iconsStyle}
                  phoneNumber={elem?.company?.company_phone}
                  setPropertyActions={setPropertyActions}
                  propertyActions={propertyActions}
                  project={elem}
                  agent={elem?.company}
                  customColor={darkMode ? "#fff" : "#000000"}
                />
              </div>
            </div>
          </div>
        </Grid>
      ))}
    </Grid>
  );
};

export default PartnersCard;
