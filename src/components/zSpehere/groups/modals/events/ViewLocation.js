import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { compose, withProps } from "recompose";
import mapMarkerSelected from "../../../../../assets/global/mapMarkerSelected.png";
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
} from "../../../../../utils/mapConstants";

const ComposedMap = compose(
  withProps({
    googleMapURL: GOOGLE_MAPS_URL,
    loadingElement: <div style={{ height: 300, margin: "0 30px" }} />,
    containerElement: <div style={{ height: 300 }} />,
    mapElement: (
      <div id="propertyDetailsMap" style={{ height: 300, margin: "0 30px" }} />
    ),
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
  </GoogleMap>
));

/* Map UI for event location. */
const ViewLocation = () => {
  //const { projectDetails } = useSelector((state) => state.projects);
  const { darkMode } = useSelector((state) => state.global);
  const { getEventData } = useSelector((state) => state.zSphereEvents);

  const mapOptions = useMemo(() => {
    if (darkMode) return HOME_OPTIONS_DARK;
    else return HOME_OPTIONS;
  }, [darkMode]);

  return (
    <>
      <ComposedMap
        defaultZoom={12}
        center={{
          lat: getEventData?.lat,
          lng: getEventData?.lng,
        }}
        addMyMarker={{
          lat: parseFloat(getEventData?.lat),
          lng: parseFloat(getEventData?.lng),
        }}
        options={mapOptions}
      />
      <div
        style={{
          backgroundColor: "#134696",
          margin: "0px 30px",
          padding: 10,
          borderBottomRightRadius: 20,
          borderBottomLeftRadius: 20,
          marginBottom: 30,
        }}
      >
        <div
          style={{
            color: "#fff",
            fontFamily: "heavy",
            fontSize: 22,
            textTransform: "capitalize",
          }}
        >
          {getEventData?.name}
        </div>
        <div
          style={{
            color: "#fff",
            fontFamily: "medium",
            fontSize: 14,
            fontStyle: "italic",
            marginTop: 5,
          }}
        >
          {getEventData?.location}
        </div>
      </div>
    </>
  );
};

export default ViewLocation;
