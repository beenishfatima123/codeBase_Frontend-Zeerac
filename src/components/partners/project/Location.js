import React, { useMemo } from "react";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import { compose, withProps } from "recompose";
import mapMarkerSelected from "../../../assets/global/mapMarkerSelected.png";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  Marker,
} from "react-google-maps";

import {
  GOOGLE_MAPS_URL,
  HOME_OPTIONS,
  HOME_OPTIONS_DARK,
} from "../../../utils/mapConstants";

const useStyles = makeStyles(() => ({
  data: {
    fontSize: 17,
    fontFamily: "light",
    color: "#000000",
  },
  description: {
    fontSize: 17,
    fontFamily: "light",
    color: "#000000",
    height: 50,
    overflow: "hidden",
    textAlign: "center",
  },
  title: {
    color: "#134696",
    fontSize: 22,
    fontFamily: "medium",
  },
}));

const ComposedMap = compose(
  withProps({
    googleMapURL: GOOGLE_MAPS_URL,
    loadingElement: <div style={{ height: "100%" }} />,
    containerElement: <div style={{ height: "500px" }} />,
    mapElement: <div id="propertyDetailsMap" style={{ height: "100%" }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) => (
  <GoogleMap
    defaultZoom={props.defaultZoom}
    center={props.center || { lat: 33, lng: 34 }}
    onClick={() => {
      props.setActiveMarker(null);
    }}
    options={props.options}
  >
    {props.addMyMarker && (
      <Marker icon={mapMarkerSelected} position={props.addMyMarker} />
    )}
    {props?.nearbyPlaces?.map((marker) => {
      return (
        <Marker
          key={"" + marker.place_id}
          position={{
            lat: parseFloat(marker?.geometry.location.lat()),
            lng: parseFloat(marker?.geometry.location.lng()),
          }}
          onMouseOver={() => {
            props.handleActiveMarker(marker.place_id);
          }}
        ></Marker>
      );
    })}
  </GoogleMap>
));

/* Location component is displayed after project investment plan
on project's page. */
const Location = () => {
  const classes = useStyles();

  const { projectDetails } = useSelector((state) => state.projects);
  const { darkMode } = useSelector((state) => state.global);

  const mapOptions = useMemo(() => {
    if (darkMode) return HOME_OPTIONS_DARK;
    else return HOME_OPTIONS;
  }, [darkMode]);

  return (
    <Accordion
      sx={{
        boxShadow: "none",
        width: "100%",
        borderTop: "1.5px solid #707070",
        borderBottom: "1.5px solid #707070",
      }}
      defaultExpanded
    >
      <AccordionSummary
        sx={{
          boxShadow: "none",
          backgroundColor: darkMode ? "#303134" : "#fff",
        }}
        expandIcon={
          <AddIcon style={{ color: darkMode ? "#0ed864" : "#134696" }} />
        }
      >
        <span
          className={classes.title}
          style={{
            color: darkMode ? "#0ed864" : "#134696",
          }}
        >
          Location:
        </span>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: darkMode ? "#303134" : "#fff",
        }}
      >
        <ComposedMap
          defaultZoom={12}
          center={{
            lat: projectDetails?.lat,
            lng: projectDetails?.lng,
          }}
          addMyMarker={{
            lat: parseFloat(projectDetails?.lat),
            lng: parseFloat(projectDetails?.lng),
          }}
          options={mapOptions}
        />
      </AccordionDetails>
    </Accordion>
  );
};

export default Location;
