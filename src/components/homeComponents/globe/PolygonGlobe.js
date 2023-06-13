import React, { useEffect, useRef, useState } from "react";

import Globe from "react-globe.gl";
import EarthDayMap from "../../../assets/globeAssets/8k_earth_daymap.jpg";
import { getPolygonCords } from "../../../utils/helperFunctions";
import { useWindowDims } from "../../../utils/useWindowDims";
import { makeStyles } from "@mui/styles";
import { CONTENT_WIDTH, GLOBE_TITLE } from "../../../utils/constants";
import "./globeStyles.css";
import { useDispatch, useSelector } from "react-redux";
import ComponentLoader from "../../globalComponents/ComponentLoader";
import { getCountryPolygons } from "../../../api/mapApiCalls";
import { setSelectedRegion } from "../../../redux/slices/globalSlice";
import { TextTranslation } from "../../../utils/translation";
import CountrySelector from "./CountrySelector";

const useStyles = makeStyles(() => ({
  container: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    width: CONTENT_WIDTH,
    maxWidth: "100%",
    alignSelf: "center",
  },
  landLogo: {
    fontSize: 48,
    margin: "0px 5% 0px 8%",
    alignSelf: "flex-start",
  },
  bottomContainer: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingTop: 20,
  },
  title: {
    fontSize: 65,
    marginBottom: 0,
    marginTop: 0,
    lineHeight: 1,
    cursor: "pointer",
    fontFamily: "heavy",
    // fontWeight: "bold",
  },
  subText: {
    fontSize: 16,
    color: "#AAAAAA",
    width: 305,
    position: "absolute",
    left: "-10%",
    top: 250,
    zIndex: 100,
  },
  subText2: {
    fontSize: 16,
    color: "#AAAAAA",
    width: 305,
  },
  "@media (max-width: 1500px)": {
    titleContainer: {
      flexDirection: "column",
    },

    subText2: {
      alignSelf: "flex-start",
      margin: "20px 40px",
    },
  },
  "@media (max-width: 600px)": {
    landLogo: {
      bottom: 0,
      fontSize: 20,
    },
    titleContainer: {
      flexDirection: "column",
    },
    title: {
      fontSize: 40,
    },
    subText: {
      margin: "20px 0px",
    },
  },
}));
const PolygonGlobe = ({ regionalScroll, refProp }) => {
  const classes = useStyles();
  const globeEl = useRef();
  const dispatch = useDispatch();

  const { height, width } = useWindowDims();

  const [countries, setCountries] = useState();
  const [hoverD, setHoverD] = useState();
  const [hoveringTitle, setHoveringTitle] = useState(null);

  const { darkMode, selectedRegion, langIndex } = useSelector(
    (state) => state.global
  );
  const { currentLocation } = useSelector((state) => state.auth);
  const { allRegionalProperties } = useSelector((state) => state.properties);

  const getListingsCount = (country) => {
    console.log({
      allRegionalProperties,
      selectedRegion,
      currentLocation,
      country,
    });
    if (selectedRegion?.country === country)
      return allRegionalProperties?.result?.count;
    return "Select region to view";
  };
  useEffect(() => {
    // // console.log("loading data...");
    getCountryPolygons(setCountries);
    //
  }, []);

  useEffect(() => {
    // console.log({ currentLocation, selectedRegion });
    if (globeEl?.current) {
      // // console.log("got the ref");
      globeEl.current.controls().autoRotate = false;
      globeEl.current.controls().enableZoom = false;
      globeEl?.current?.pointOfView(
        {
          altitude: width > 600 ? 1.5 : 2.5,
          lat: selectedRegion ? selectedRegion?.lat : currentLocation?.lat,
          lng: selectedRegion ? selectedRegion?.lng : currentLocation?.lng,
        },
        1000
      );
    }
  }, [width, globeEl, currentLocation, selectedRegion, countries]);

  const handleMove = (point) => {
    // console.log({ point });
    let cords = getPolygonCords(point?.properties?.ADMIN);
    dispatch(
      setSelectedRegion({
        country: point?.properties?.ADMIN,
        lat: cords[1],
        lng: cords[0],
      })
    );
    regionalScroll();
  };
  const handleGlobeClick = (point) => {
    globeEl?.current?.pointOfView(
      {
        altitude: 1.5,
        lat: point.lat,
        lng: point.lng,
      },
      1000
    );
  };
  const getWidth = () => {
    if (width > 1500) return width * 0.4;
    else if (width > 950) return width * 0.6;
    else return width;
  };

  return (
    <div className={classes.container}>
      <div className={classes.titleContainer} ref={refProp}>
        <div>
          {GLOBE_TITLE?.map((elem, index) => (
            <p
              key={index}
              className={classes.title}
              style={{
                marginLeft: elem?.margin || 0,
                color:
                  hoveringTitle === index
                    ? index === 1
                      ? "#0ED864"
                      : "#134696"
                    : "#F0F0F0",
              }}
              onMouseEnter={() => setHoveringTitle(index)}
            >
              {elem?.label[langIndex]}
            </p>
          ))}
        </div>
        {width < 1500 && (
          <p className={classes.subText2}>
            {TextTranslation.globeText[langIndex]}
          </p>
        )}
      </div>

      {width > 1500 && (
        <p className={classes.subText}>
          {TextTranslation.globeText[langIndex]}
        </p>
      )}

      {countries ? (
        <Globe
          ref={globeEl}
          height={height * 0.65}
          width={getWidth() || 500}
          globeImageUrl={EarthDayMap}
          backgroundColor={darkMode ? "#212124" : "#fff"}
          polygonsData={countries?.features}
          polygonAltitude={(d) => (d === hoverD ? 0.04 : 0.01)}
          polygonCapColor={(d) => (d === hoverD ? "#fff" : "white")}
          polygonSideColor={() => "rgba(0, 100, 0, 0.15)"}
          polygonLabel={({ properties: d }) => `
          <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;border-radius:5px;background-color:${
            darkMode ? "#212124" : "#fff"
          };padding:5px">
          <p style="color:${
            darkMode ? "#0ed864" : "#134696"
          };font-size:20px;font-family:medium;font-weight:bold;margin:0">
            ${d?.ADMIN}
          </p>
          <p style="color:${
            darkMode ? "#0ed864" : "#134696"
          };font-size:16px;font-family:medium;margin:0">
          <span style="font-weight:bold;color:${
            darkMode ? "#fff" : "#0ed864"
          };font-size:20px">${getListingsCount(
            d?.ADMIN
          )}</span> properties listed in ${d?.ADMIN}
          </p>
        </div>
        `}
          onPolygonHover={setHoverD}
          onPolygonClick={handleMove}
          polygonsTransitionDuration={1000}
          onGlobeRightClick={handleGlobeClick}
          enableZoom={false}
          showAtmosphere={false}
        />
      ) : (
        <ComponentLoader />
      )}

      <div className={classes.bottomContainer}>
        <p
          className={classes.landLogo}
          style={{
            color: darkMode ? "white" : "#134696",
          }}
        >
          {TextTranslation.landIs[langIndex]}{" "}
          <span style={{ fontFamily: "heavy" }}>
            {TextTranslation.here[langIndex]}
          </span>
        </p>
        <CountrySelector
          options={countries?.features}
          handleMove={handleMove}
        />
      </div>
      <div
        style={{
          height: 40,
          width: "100%",
          borderBottom: "1px solid #e3e3e3",
        }}
      />
      <div
        style={{
          height: 20,
          width: "100%",
        }}
      />
    </div>
  );
};

export default PolygonGlobe;
