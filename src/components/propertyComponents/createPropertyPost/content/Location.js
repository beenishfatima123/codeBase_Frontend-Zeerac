import React, { Suspense, lazy } from "react";

import { makeStyles } from "@mui/styles";
import "./creationStyles.css";
import { useState } from "react";
import ComponentLoader from "../../../globalComponents/ComponentLoader";
import { DEFAULT_CENTER } from "../../../../utils/mapConstants";
import { useDispatch, useSelector } from "react-redux";
import {
  getArea,
  getBlock,
  getCity,
  getCountry,
} from "../../../../utils/helpers/mapHelpers";
import { getAddressFromLat } from "../../../../api/mapApiCalls";
import { setPropertyData } from "../../../../redux/slices/createPropertySlice";
import { useMemo } from "react";

const PostMap = lazy(() => import("./PostMap"));

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    padding: "20px 5%",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: "15px 10px",
    border: "1px solid #b2b2c9",
    borderRadius: 10,
    minWidth: "80%",
    marginTop: 10,
  },
}));
const Location = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const { propertyData } = useSelector((state) => state.createProperty);

  const mapPosition = useMemo(() => {
    if (propertyData?.location)
      return {
        lat: propertyData?.location?.lat,
        lng: propertyData?.location?.lng,
      };
    else return DEFAULT_CENTER;
  }, [propertyData]);
  const onMarkerDragEnd = async (event) => {
    const addressResponse = await getAddressFromLat(
      event?.latLng.lat(),
      event?.latLng.lng()
    );

    const addressArray = addressResponse?.results[0]?.address_components;
    setLoading(true);
    dispatch(
      setPropertyData({
        ...propertyData,
        location: {
          country: getCountry(addressArray),
          city: getCity(addressArray),
          area: getArea(addressArray),
          block: getBlock(addressArray),
          address: addressResponse?.results[0]?.formatted_address,
          lat: event?.latLng.lat(),
          lng: event?.latLng.lng(),
        },
      })
    );

    setLoading(false);
  };
  const onPlaceSelected = (place) => {
    let addressArray = place.address_components;
    // console.log({ place, addressArray });
    setLoading(true);
    dispatch(
      setPropertyData({
        ...propertyData,
        location: {
          country: getCountry(addressArray),
          city: getCity(addressArray),
          area: getArea(addressArray),
          block: getBlock(addressArray),
          address: place?.formatted_address,
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        },
      })
    );

    setLoading(false);
  };
  return (
    <div className={classes.container}>
      <Suspense fallback={<ComponentLoader />}>
        <>
          {loading ? (
            <ComponentLoader />
          ) : (
            <PostMap
              onPlaceSelected={onPlaceSelected}
              onMarkerDragEnd={onMarkerDragEnd}
              mapPosition={mapPosition}
              editMode={false}
            />
          )}
        </>
      </Suspense>
    </div>
  );
};

export default Location;
