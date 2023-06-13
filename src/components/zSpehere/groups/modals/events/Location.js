import React, { Suspense, lazy, useMemo, useState } from "react";
import { makeStyles } from "@mui/styles";
// import "./editStyles.css";
import { useDispatch, useSelector } from "react-redux";
import { getAddressFromLat } from "../../../../../api/mapApiCalls";
import { DEFAULT_CENTER } from "../../../../../utils/mapConstants";
import { eventData } from "../../../../../redux/slices/zSphereEventSlice";
import ComponentLoader from "../../../../globalComponents/ComponentLoader";
import {
  getArea,
  getBlock,
  getCity,
  getCountry,
} from "../../../../../utils/helpers/mapHelpers";

const PostMap = lazy(() => import("./PostMap"));

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
  },
}));

/* Location inout field on create event modal. */
const Location = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const { darkMode } = useSelector((state) => state.global);

  const { localEventData } = useSelector((state) => state.zSphereEvents);

  /* Set map position with coordinates */
  const mapPosition = useMemo(() => {
    if (localEventData?.lat && localEventData?.lng)
      return {
        lat: localEventData?.lat,
        lng: localEventData?.lng,
      };
    else return DEFAULT_CENTER;
  }, [localEventData]);

  /* Take event and check where marker was dropped. Dispatch event data. */
  const onMarkerDragEnd = async (event) => {
    const addressResponse = await getAddressFromLat(
      event?.latLng.lat(),
      event?.latLng.lng()
    );

    const addressArray = addressResponse?.results[0]?.address_components;
    setLoading(true);
    dispatch(
      eventData({
        ...localEventData,
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

  /* Take place as parameter and dispatch event data with address. */
  const onPlaceSelected = (place) => {
    let addressArray = place.address_components;
    setLoading(true);
    dispatch(
      eventData({
        ...localEventData,
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
