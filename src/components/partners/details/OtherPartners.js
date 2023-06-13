import React, { useEffect, useMemo, useRef } from "react";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import HeadingSvg from "./HeadingSvg";
import { HEADER_CONTENT_WIDTH, PARTNER_LOGOS } from "../../../utils/constants";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import CustomTooltip from "../../globalComponents/CustomTooltip";
import {
  currencyFormatInitials,
  getConcatenatedPrice,
} from "../../../utils/helperFunctions";
import IconsContainer from "../../propertyComponents/misc/IconsContainer";
import { getOtherProjects } from "../../../redux/slices/projectSlice";
import { TextTranslation } from "../../../utils/translation";
import ComponentLoader from "../../globalComponents/ComponentLoader";
import NotFound from "../../globalComponents/NotFound";
import Carousel from "nuka-carousel";
import useParentDims from "../../../utils/hooks/useParentDims";
import { useWindowDims } from "../../../utils/useWindowDims";
import CustomSliderContainer from "../../globalComponents/customSlider/CustomSliderContainer";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    width: HEADER_CONTENT_WIDTH,
    maxWidth: "90%",
    margin: "auto",
  },
  topContainer: {
    display: "flex",
    flex: 1,
    justifyContent: "space-between",
    padding: "20px 0px",
    minHeight: 100,
    position: "relative",
    left: -80,
  },
  sliderContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: "25px 5%",
    // boxShadow:
    //   "rgba(17, 17, 26, 0.05) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px",
  },
  image: {
    width: "100%",
    height: 200,
    objectFit: "cover",
    cursor: "pointer",
  },
  priceContainer: {
    position: "absolute",
    marginTop: 150,
    marginLeft: 10,
    display: "flex",
    zIndex: 10,
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
    height: 150,
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
    width: 280,
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
    height: "20vh",
  },
  iconsStyle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 20,
  },
  "@media (max-width: 700px)": {
    topContainer: {
      flexDirection: "column",
    },
  },
}));

/* 
Main project collection on Projects page.
Also used as carousel item on the project detail page where related projects are listed.  */
const OtherPartners = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sliderRef = useRef();
  const containerRef = useRef();
  const params = useParams();

  const { width } = useWindowDims();

  const parentWidth = useParentDims(containerRef);

  const [propertyActions, setPropertyActions] = useState();
  const { darkMode, langIndex } = useSelector((state) => state.global);
  const { otherProjects, otherProjectsApiInfo } = useSelector(
    (state) => state.projects
  );

  useEffect(() => {
    dispatch(getOtherProjects({ id: params?.id }));
    // eslint-disable-next-line
  }, [params?.id]);

  const dataToShow = useMemo(() => {
    return otherProjects?.results;
  }, [otherProjects]);
  // console.log({ otherProjects, dataToShow });

  const showStatic = useMemo(() => {
    if (dataToShow?.length > 0) {
      if (parentWidth) {
        if (parentWidth > 1680) return dataToShow?.length > 5 ? false : true;
        else if (parentWidth < 1680 && parentWidth > 1200)
          return dataToShow?.length > 4 ? false : true;
        else if (parentWidth < 1200 && parentWidth > 950)
          return dataToShow?.length > 3 ? false : true;
        else if (parentWidth < 950 && parentWidth > 600)
          return dataToShow?.length > 2 ? false : true;
        else return false;
      } else {
        if (width > 1680) return dataToShow?.length > 5 ? false : true;
        else if (width < 1680 && width > 1200)
          return dataToShow?.length > 4 ? false : true;
        else if (width < 1200 && width > 950)
          return dataToShow?.length > 3 ? false : true;
        else if (width < 950 && width > 600)
          return dataToShow?.length > 2 ? false : true;
        else return false;
      }
    } else return true;
  }, [dataToShow, width, parentWidth]);
  const slidesToShow = useMemo(() => {
    if (dataToShow?.length > 0) {
      if (parentWidth) {
        if (parentWidth > 1680)
          return dataToShow?.length > 5 ? 5 : dataToShow?.length - 1;
        else if (parentWidth < 1680 && parentWidth > 1200)
          return dataToShow?.length > 4 ? 3 : dataToShow?.length - 1;
        else if (parentWidth < 1200 && parentWidth > 950)
          return dataToShow?.length > 3 ? 3 : dataToShow?.length - 1;
        else if (parentWidth < 950 && parentWidth > 600)
          return dataToShow?.length > 2 ? 2 : dataToShow?.length - 1;
        else return 1;
      } else {
        if (width > 1680)
          return dataToShow?.length > 5 ? 5 : dataToShow?.length - 1;
        else if (width < 1680 && width > 1200)
          return dataToShow?.length > 4 ? 3 : dataToShow?.length - 1;
        else if (width < 1200 && width > 950)
          return dataToShow?.length > 3 ? 3 : dataToShow?.length - 1;
        else if (width < 950 && width > 600)
          return dataToShow?.length > 2 ? 2 : dataToShow?.length - 1;
        else return 1;
      }
    } else return 1;
  }, [dataToShow, width, parentWidth]);

  return (
    <div className={classes.container}>
      <div className={classes.topContainer}>
        <HeadingSvg heading={"Browse other projects"} />
        <Button
          sx={{
            background:
              "linear-gradient(90deg, rgba(14,216,100,1) 0%, rgba(255,255,255,1) 100%)",
            textTransform: "none",
            color: "#134696",
            width: 180,
            mt: 3,
            ml: 3,
            position: "absolute",
            right: "5%",
            bottom: 10,
            borderRadius: 0,
          }}
          endIcon={<ArrowForwardIcon style={{ color: "#134696" }} />}
          onClick={() => navigate("/partners")}
        >
          {TextTranslation.viewAll[langIndex]}
        </Button>
      </div>
      {otherProjectsApiInfo?.loading ? (
        <ComponentLoader />
      ) : (
        <>
          {dataToShow?.length > 0 ? (
            <div className={classes.sliderContainer} ref={containerRef}>
              {showStatic ? (
                <CustomSliderContainer
                  customCard={
                    <>
                      {dataToShow?.map((elem, index) => (
                        <div
                          key={index}
                          style={{
                            boxShadow:
                              "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
                            borderBottomLeftRadius: 20,
                            borderBottomRightRadius: 20,
                            margin: "20px 5px",
                          }}
                        >
                          <div
                            onClick={() => {
                              navigate(`/project/${elem?.id}`);
                            }}
                          >
                            {elem?.price_min !== null ? (
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
                                  <p className={classes.priceLabel}>
                                    Price starting from
                                  </p>
                                  <p className={classes.price}>
                                    {getConcatenatedPrice(
                                      currencyFormatInitials(
                                        elem?.price_min,
                                        elem?.currency
                                      ),
                                      14
                                    )}
                                  </p>
                                </div>
                              </CustomTooltip>
                            ) : null}
                            <img
                              className={classes.image}
                              alt=""
                              src={
                                elem?.feature_photo
                                  ? elem?.feature_photo
                                  : PARTNER_LOGOS[2]
                              }
                            />
                          </div>
                          <div className={classes.bottomContainer}>
                            <div className={classes.left}>
                              <CustomTooltip title={elem?.title}>
                                <div className={classes.name}>
                                  {elem?.title}
                                </div>
                              </CustomTooltip>
                              <div className={classes.location}>
                                {elem?.city}, {elem?.country}
                              </div>
                              <hr />
                              <div className={classes.admin}>
                                <span style={{ color: "#7d7d7d" }}>
                                  Project By:{" "}
                                </span>
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
                      ))}
                    </>
                  }
                />
              ) : (
                <Carousel
                  innerRef={sliderRef}
                  slidesToShow={slidesToShow}
                  cellSpacing={30}
                  cellAlign="center"
                  wrapAround={true}
                  renderCenterLeftControls={null}
                  renderCenterRightControls={null}
                  defaultControlsConfig={{
                    pagingDotsContainerClassName: "dots-container-custom",
                    pagingDotsStyle: {
                      fill: darkMode ? "#0ed864" : "#134696",
                    },
                  }}
                >
                  {dataToShow?.map((elem, index) => (
                    <div
                      key={index}
                      style={{
                        boxShadow:
                          "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
                        borderBottomLeftRadius: 20,
                        borderBottomRightRadius: 20,
                        margin: "20px 0",
                      }}
                    >
                      <div
                        onClick={() => {
                          navigate(`/project/${elem?.id}`);
                        }}
                      >
                        {elem?.price_min !== null ? (
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
                              <p className={classes.priceLabel}>
                                Price starting from
                              </p>
                              <p className={classes.price}>
                                {getConcatenatedPrice(
                                  currencyFormatInitials(
                                    elem?.price_min,
                                    elem?.currency
                                  ),
                                  14
                                )}
                              </p>
                            </div>
                          </CustomTooltip>
                        ) : null}
                        <img
                          className={classes.image}
                          alt=""
                          src={
                            elem?.feature_photo
                              ? elem?.feature_photo
                              : PARTNER_LOGOS[2]
                          }
                        />
                      </div>
                      <div className={classes.bottomContainer}>
                        <div className={classes.left}>
                          <CustomTooltip title={elem?.title}>
                            <div className={classes.name}>{elem?.title}</div>
                          </CustomTooltip>
                          <div className={classes.location}>
                            {elem?.city}, {elem?.country}
                          </div>
                          <hr />
                          <div className={classes.admin}>
                            <span style={{ color: "#7d7d7d" }}>
                              Project By:{" "}
                            </span>
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
                  ))}
                </Carousel>
              )}
            </div>
          ) : (
            <NotFound label="No Other Projects Found" />
          )}
        </>
      )}
    </div>
  );
};

export default OtherPartners;
