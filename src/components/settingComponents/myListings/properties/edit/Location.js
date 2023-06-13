import React, { Suspense, lazy } from "react";
import { makeStyles } from "@mui/styles";
import "./editStyles.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";
import ComponentLoader from "../../../../globalComponents/ComponentLoader";
import {
  setPropertyToEdit,
  setPropertyUpdateInfo,
} from "../../../../../redux/slices/propertiesSlice";
import { getAddressFromLat } from "../../../../../api/mapApiCalls";
import {
  getArea,
  getBlock,
  getCity,
  getCountry,
} from "../../../../../utils/helpers/mapHelpers";
import { DEFAULT_CENTER } from "../../../../../utils/mapConstants";

const PostMap = lazy(() =>
  import("../../../../propertyComponents/createPropertyPost/content/PostMap")
);

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    padding: 20,
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    margin: "10px 3px",
  },
  title: {
    fontSize: 24,
    fontFamily: "heavy",
    textTransform: "uppercase",
    marginBottom: 20,
  },

  "@media (max-width: 500px)": {
    title: {
      fontSize: 28,
    },
  },
}));

/* Location is the map part on the edit property page. */
const Location = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const { darkMode } = useSelector((state) => state.global);
  const { propertyToEdit, propertyUpdateInfo } = useSelector(
    (state) => state.properties
  );

  /* upon property edit, longitude and latitude are changed. */
  const mapPosition = useMemo(() => {
    if (propertyToEdit?.lat && propertyToEdit?.lng)
      return {
        lat: propertyToEdit?.lat,
        lng: propertyToEdit?.lng,
      };
    else return DEFAULT_CENTER;
  }, [propertyToEdit]);

  /* when pointer completes the drag on the map, address is retrieved from the map and dispatched to edit and update methods in slice. */
  const onMarkerDragEnd = async (event) => {
    const addressResponse = await getAddressFromLat(
      event?.latLng.lat(),
      event?.latLng.lng()
    );

    const addressArray = addressResponse?.results[0]?.address_components;
    setLoading(true);
    dispatch(
      setPropertyToEdit({
        ...propertyToEdit,
        country: getCountry(addressArray),
        city: getCity(addressArray),
        area: getArea(addressArray),
        block: getBlock(addressArray),
        address: addressResponse?.results[0]?.formatted_address,
        lat: event?.latLng.lat(),
        lng: event?.latLng.lng(),
      })
    );
    dispatch(
      setPropertyUpdateInfo({
        ...propertyUpdateInfo,
        country: getCountry(addressArray),
        city: getCity(addressArray),
        area: getArea(addressArray),
        block: getBlock(addressArray),
        address: addressResponse?.results[0]?.formatted_address,
        lat: event?.latLng.lat(),
        lng: event?.latLng.lng(),
      })
    );
    setLoading(false);
  };

  /* place is passed to onPlaceSelected which gets the new address and dispatches it to the slice. */
  const onPlaceSelected = (place) => {
    let addressArray = place.address_components;
    setLoading(true);
    dispatch(
      setPropertyToEdit({
        ...propertyToEdit,
        country: getCountry(addressArray),
        city: getCity(addressArray),
        area: getArea(addressArray),
        block: getBlock(addressArray),
        address: place?.formatted_address,
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      })
    );
    dispatch(
      setPropertyUpdateInfo({
        ...propertyUpdateInfo,
        country: getCountry(addressArray),
        city: getCity(addressArray),
        area: getArea(addressArray),
        block: getBlock(addressArray),
        address: place?.formatted_address,
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      })
    );
    setLoading(false);
  };
  return (
    <div
      className={classes.container}
      style={{
        backgroundColor: darkMode ? "#2f2f33" : "#fff",
      }}
    >
      <span
        className={classes.title}
        style={{
          color: darkMode ? "#0ed864" : "#134696",
        }}
      >
        Specify the location
      </span>
      <Suspense fallback={<ComponentLoader />}>
        <>
          {loading ? (
            <ComponentLoader />
          ) : (
            <PostMap
              onPlaceSelected={onPlaceSelected}
              onMarkerDragEnd={onMarkerDragEnd}
              mapPosition={mapPosition}
              editMode={true}
            />
          )}
        </>
      </Suspense>
    </div>
  );
};

export default Location;
