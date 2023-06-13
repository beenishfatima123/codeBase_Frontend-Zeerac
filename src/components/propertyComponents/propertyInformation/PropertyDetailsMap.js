import { compose, withProps } from "recompose";
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  Marker,
  InfoWindow,
} from "react-google-maps";
import { makeStyles } from "@mui/styles";
import {
  GOOGLE_MAPS_URL,
  HOME_OPTIONS,
  HOME_OPTIONS_DARK,
} from "../../../utils/mapConstants";
import { fetchNearByPlaces } from "../../../api/mapApiCalls";
import ComponentLoader from "../../globalComponents/ComponentLoader";
import { useState } from "react";
import mapMarkerSelected from "../../../assets/global/mapMarkerSelected.png";
import nearByMarker from "../../../assets/global/nearByMarker.svg";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { HEADER_CONTENT_WIDTH } from "../../../utils/constants";

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
          icon={nearByMarker}
          key={"" + marker.place_id}
          position={{
            lat: parseFloat(marker?.geometry.location.lat()),
            lng: parseFloat(marker?.geometry.location.lng()),
          }}
          onMouseOver={() => {
            props.handleActiveMarker(marker?.place_id);
          }}
        >
          {props?.activeMarker === marker?.place_id && (
            <InfoWindow onCloseClick={() => props?.setActiveMarker(null)}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "row",
                  flex: 1,
                  padding: 5,
                }}
              >
                <img
                  alt=""
                  src={marker?.icon}
                  style={{ width: 50, height: 50, objectFit: "cover" }}
                />
                <div style={{ marginLeft: 20 }}>
                  <div
                    style={{
                      fontSize: 20,
                      fontFamily: "heavy",
                      color: "#134696",
                    }}
                  >
                    {marker?.name}
                  </div>
                  <div
                    style={{
                      fontSize: 16,
                      fontFamily: "medium",
                      color: "#134696",
                    }}
                  >
                    {marker?.vicinity}
                  </div>
                </div>
              </div>
            </InfoWindow>
          )}
        </Marker>
      );
    })}
  </GoogleMap>
));

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    justifyContent: "flex-end",
    flexWrap: "wrap",
    position: "absolute",
    top: 80,
    right: 20,
  },
  chip: {
    backgroundColor: "#fff",
    width: 100,
    height: 30,
    borderRadius: 20,
    color: "#134696",
    fontSize: 14,
    fontFamily: "medium",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    marginTop: 10,
    zIndex: 10,
    cursor: "pointer",
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
  },
}));

const filters = [
  {
    label: "Schools",
    value: "school",
  },
  {
    label: "Hospitals",
    value: "hospital",
  },
  {
    label: "Pharmacies",
    value: "pharmacy",
  },
  {
    label: "Restaurants",
    value: "restaurant",
  },
  {
    label: "Museums",
    value: "museum",
  },
];

const PropertyDetailsMap = ({ property }) => {
  const classes = useStyles();
  const [nearBy, setNearBy] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [activeMarker, setActiveMarker] = useState(null);
  const [loadingPlaces, setLoadingPLaces] = useState(false);
  const { darkMode } = useSelector((state) => state.global);

  //console.log({ nearBy });

  const mapOptions = useMemo(() => {
    if (darkMode) return HOME_OPTIONS_DARK;
    else return HOME_OPTIONS;
  }, [darkMode]);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  return (
    <div
      style={{
        margin: "20px 5%",
        position: "relative",
        width: HEADER_CONTENT_WIDTH,
        maxWidth: "90%",
        alignSelf: "center",
      }}
    >
      <p
        style={{
          fontSize: 24,
          color: darkMode ? "#0ed864" : "#134696",
          fontFamily: "heavy",
        }}
      >
        Location:
      </p>

      {loadingPlaces ? (
        <ComponentLoader />
      ) : (
        <ComposedMap
          defaultZoom={15}
          center={{
            lat: property?.lat,
            lng: property?.lng,
          }}
          addMyMarker={{
            lat: parseFloat(property?.lat),
            lng: parseFloat(property?.lng),
          }}
          nearbyPlaces={nearBy}
          handleActiveMarker={handleActiveMarker}
          activeMarker={activeMarker}
          options={mapOptions}
          setActiveMarker={setActiveMarker}
        />
      )}

      <div className={classes.container}>
        {filters?.map((item, index) => (
          <div
            key={index}
            className={classes.chip}
            style={{
              backgroundColor:
                item?.value === selectedValue ? "#134696" : "#fff",
              color: item?.value === selectedValue ? "#fff" : "#134696",
            }}
            onClick={() => {
              setSelectedValue(item?.value);
              fetchNearByPlaces(
                property?.lat,
                property?.lng,
                item?.value,
                property,
                setNearBy,
                setLoadingPLaces
              );
            }}
          >
            {item?.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyDetailsMap;
