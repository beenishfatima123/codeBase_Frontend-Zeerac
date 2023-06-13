import { compose, withProps } from "recompose";
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  Polygon,
  InfoWindow,
  Marker,
} from "react-google-maps";

import {
  GOOGLE_MAPS_URL,
  HOME_OPTIONS,
  HOME_OPTIONS_DARK,
  DEFAULT_CENTER,
} from "../../utils/mapConstants";
import { useSelector } from "react-redux";
import { useMemo, useState } from "react";
import mapMarkerSelected from "../../assets/global/mapMarkerSelected.png";
import { useNavigate } from "react-router-dom";
import ComponentLoader from "../globalComponents/ComponentLoader";
import InfoWindowPopup from "../propertyComponents/map/InfoWindowPopup";

const ComposedMap = compose(
  withProps({
    googleMapURL: GOOGLE_MAPS_URL,
    loadingElement: <div style={{ height: "100%" }} />,
    containerElement: <div style={{ height: "300px" }} />,
    mapElement: <div id="homeMap" style={{ height: "100%" }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) => (
  <GoogleMap zoom={props?.zoom} center={props?.center} options={props.options}>
    <Polygon
      paths={props?.bounds}
      defaultOptions={{
        strokeColor: "#0ed864",
        strokeOpacity: 1,
        strokeWeight: 1,
        fillColor: "#134696",
        fillOpacity: 0,
      }}
    />
    {props?.markers?.map((marker, index) => (
      <Marker
        key={index}
        position={{
          lat: marker?.lat,
          lng: marker?.lng,
        }}
        onMouseOver={() => props?.setActiveMarker(marker?.id)}
        onClick={() => props.handleNavigate(marker?.id)}
        icon={mapMarkerSelected}
      >
        {props?.activeMarker === marker?.id && (
          <InfoWindow onCloseClick={() => props?.setActiveMarker(null)}>
            <InfoWindowPopup listing={marker} navigate={props?.navigate} />
          </InfoWindow>
        )}
      </Marker>
    ))}
  </GoogleMap>
));
const HomeMapWrapper = ({ boundsInfo, markers }) => {
  const navigate = useNavigate();
  const { darkMode } = useSelector((state) => state.global);
  const [activeMarker, setActiveMarker] = useState(null);

  const handleNavigate = (id) => {
    navigate(`/listing/${id}`);
  };
  const mapOptions = useMemo(() => {
    if (darkMode) return HOME_OPTIONS_DARK;
    else return HOME_OPTIONS;
  }, [darkMode]);
  const center = useMemo(() => {
    // console.log({ allRegionalProperties });
    if (markers?.result?.results?.length > 0)
      return {
        lat: markers?.result?.results[0]?.lat,
        lng: markers?.result?.results[0]?.lng,
      };
    else return DEFAULT_CENTER;
  }, [markers]);

  return (
    <div style={{ margin: "20px 0px" }}>
      {boundsInfo?.loading ? (
        <ComponentLoader />
      ) : (
        <ComposedMap
          zoom={boundsInfo?.position ? 12 : 13}
          center={center}
          options={mapOptions}
          bounds={boundsInfo?.boundary?.map((elem) => {
            return {
              lat: parseFloat(elem?.lat),
              lng: parseFloat(elem?.lng),
            };
          })}
          markers={markers?.result?.results}
          handleNavigate={handleNavigate}
          navigate={navigate}
          activeMarker={activeMarker}
          setActiveMarker={setActiveMarker}
        />
      )}
    </div>
  );
};

export default HomeMapWrapper;
