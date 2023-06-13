import { compose, withProps } from "recompose";
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  Marker,
  Polygon,
  InfoWindow,
} from "react-google-maps";
import {
  DEFAULT_CENTER,
  GOOGLE_MAPS_URL,
  HOME_OPTIONS,
  HOME_OPTIONS_DARK,
} from "../../../utils/mapConstants";
import { useDispatch, useSelector } from "react-redux";
import { useMemo, useRef } from "react";
import mapMarker from "../../../assets/global/mapMarker.png";
import mapMarkerSelected from "../../../assets/global/mapMarkerSelected.png";
import ComponentLoader from "../../globalComponents/ComponentLoader";
import InfoWindowPopup from "./InfoWindowPopup";
import { useNavigate } from "react-router-dom";
import "./mapStyles.css";
import {
  // getPropertiesInRadius,
  setActiveMarker,
} from "../../../redux/slices/propertiesSlice";

const ComposedMap = compose(
  withProps({
    googleMapURL: GOOGLE_MAPS_URL,
    loadingElement: <div style={{ height: "100%" }} />,
    containerElement: <div style={{ height: "90vh" }} />,
    mapElement: (
      <div
        id="homeMap"
        style={{
          height: "100%",
          "&:focusVisible": {
            outline: "none",
            backgroundColor: "red",
            padding: 10,
          },
        }}
      />
    ),
  }),
  withScriptjs,
  withGoogleMap
)((props) => (
  <GoogleMap
    ref={props?.mapRef}
    zoom={props?.zoom}
    center={props?.center}
    options={props?.options}
    onCenterChanged={props?.handleCenterChange}
  >
    <Polygon
      paths={props?.bounds}
      defaultOptions={{
        strokeColor: "#0ed864",
        strokeOpacity: 1,
        strokeWeight: 1,
        fillColor: "#134696",
        fillOpacity: 0.1,
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
        // onMouseOut={() => {
        //   setTimeout(() => {
        //     props?.setActiveMarker(null);
        //   }, 500);
        // }}
        icon={props?.activeMarker === index ? mapMarkerSelected : mapMarker}
      >
        {/* //TODO */}
        {props?.activeMarker === marker?.id && (
          <InfoWindow
            onCloseClick={() => props?.setActiveMarker(null)}
            onMouseOver={() => props?.setActiveMarker(marker?.id)}
          >
            <InfoWindowPopup listing={marker} navigate={props?.navigate} />
          </InfoWindow>
        )}
      </Marker>
    ))}
  </GoogleMap>
));
const PropertyMap = ({ boundsInfo, properties }) => {
  // const stickyRef = useRef();
  // const stick = useSticky(stickyRef);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { width } = useWindowDims();
  const mapRef = useRef(null);

  // const [activeMarker, setActiveMarker] = useState(null);
  const { darkMode, isFooterVisible } = useSelector((state) => state.global);
  const { activeMarker, isFilterVisible } = useSelector(
    (state) => state.properties
  );
  const mapOptions = useMemo(() => {
    if (darkMode) return HOME_OPTIONS_DARK;
    else return HOME_OPTIONS;
  }, [darkMode]);
  const center = useMemo(() => {
    // console.log({ properties });
    if (properties?.result?.results?.length > 0)
      return {
        lat: properties?.result?.results[0]?.lat,
        lng: properties?.result?.results[0]?.lng,
      };
    else return DEFAULT_CENTER;
  }, [properties]);
  const setNewActiveMarker = (newValue) => {
    dispatch(setActiveMarker(newValue));
  };

  const handleCenterChange = () => {
    // const newCenter = mapRef?.current?.getCenter();
    // const lat = newCenter?.lat();
    // const lng = newCenter?.lng();
    // dispatch(
    //   getPropertiesInRadius({
    //     lat,
    //     lng,
    //     radius: 100,
    //   })
    // );
    // console.log({ ref: mapRef, lat, lng });
  };
  return (
    <div
      style={{ width: "98%" }}
      className={
        isFooterVisible
          ? "bottom-fixed-map"
          : isFilterVisible
          ? ""
          : "fixed-map"
      }
    >
      {boundsInfo?.loading ? (
        <ComponentLoader />
      ) : (
        <ComposedMap
          mapRef={mapRef}
          handleCenterChange={handleCenterChange}
          zoom={boundsInfo?.position ? 8 : 8}
          markers={properties?.result?.results}
          activeMarker={activeMarker}
          setActiveMarker={setNewActiveMarker}
          center={center}
          options={mapOptions}
          bounds={boundsInfo?.boundary?.map((elem) => {
            return {
              lat: parseFloat(elem?.lat),
              lng: parseFloat(elem?.lng),
            };
          })}
          navigate={navigate}
        />
      )}
    </div>
  );
};

export default PropertyMap;
