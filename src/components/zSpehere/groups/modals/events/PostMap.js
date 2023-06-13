import { compose, withProps } from "recompose";
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  Marker,
} from "react-google-maps";
import Autocomplete from "react-google-autocomplete";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import {
  DEFAULT_CENTER,
  DEFAULT_HOME_ZOOM,
  GOOGLE_MAPS_URL,
  HOME_OPTIONS,
  HOME_OPTIONS_DARK,
} from "../../../../../utils/mapConstants";
import marker from "../../../../../assets/global/mapMarker.png";
// import "./creationStyles.css";
import { useSelector } from "react-redux";
import { useState, useEffect, useMemo } from "react";

const ComposedMap = compose(
  withProps({
    googleMapURL: GOOGLE_MAPS_URL,
    loadingElement: <div style={{ height: "100%", borderRadius: 10 }} />,
    containerElement: (
      <div
        style={{
          height: "500px",
          borderRadius: 10,
          position: "relative",
        }}
      />
    ),
    mapElement: (
      <div
        id="postMap"
        style={{
          height: "100%",
          borderRadius: 10,
          marginTop: 60,
        }}
      />
    ),
  }),
  withScriptjs,
  withGoogleMap
)((props) => (
  <GoogleMap
    google={props.google}
    defaultZoom={DEFAULT_HOME_ZOOM}
    center={props.mapPosition || DEFAULT_CENTER}
    options={props.options}
  >
    <Marker
      icon={marker}
      draggable={true}
      onDragEnd={props?.onMarkerDragEnd}
      position={props?.mapPosition || DEFAULT_CENTER}
    />
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        position: "absolute",
        top: -70,
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flex: 1,
          alignItems: "center",
          border: "1px solid #b2b2c9",
          borderRadius: 10,
          width: "100%",
        }}
      >
        <LocationOnIcon style={{ color: "#134696", marginLeft: 10 }} />
        <Autocomplete
          style={{
            color: "#134696",
            margin: "15px 0px",
            display: "flex",
            flex: 1,
            border: "none",
            fontSize: 12,
            background: "none",
            fontFamily: "medium",
            outline: "none",
          }}
          placeholder="Enter location/Address of the site"
          onChange={(e) => {
            e.preventDefault();
            props?.setAddress(e?.target?.value);
          }}
          // onPlaceSelected={(event) => props.setLocation({ place: event })}
          onPlaceSelected={props.onPlaceSelected}
          options={{
            types: ["(regions)"],
            componentRestrictions: { country: "pk" },
          }}
          value={props?.address || ""}
        />
      </div>
    </div>
  </GoogleMap>
));

/* Map UI on create event modal. */
const PostMap = ({
  mapPosition,
  onPlaceSelected,
  onMarkerDragEnd,
  editMode,
}) => {
  const { darkMode } = useSelector((state) => state.global);
  const { localEventData } = useSelector((state) => state.zSphereEvents);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (!inputValue) {
      setInputValue("");
    }
  }, [inputValue]);

  useEffect(() => {
    setInputValue(localEventData?.address);
    // eslint-disable-next-line
  }, [localEventData?.address]);

  const mapOptions = useMemo(() => {
    if (darkMode) return HOME_OPTIONS_DARK;
    else return HOME_OPTIONS;
  }, [darkMode]);

  return (
    <div>
      <ComposedMap
        address={inputValue}
        setAddress={setInputValue}
        mapPosition={mapPosition}
        onPlaceSelected={onPlaceSelected}
        onMarkerDragEnd={onMarkerDragEnd}
        options={mapOptions}
        darkMode={darkMode}
        edit={editMode}
      />
    </div>
  );
};

export default PostMap;
