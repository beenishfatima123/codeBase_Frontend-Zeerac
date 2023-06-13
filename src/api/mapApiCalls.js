import axios from "axios";

import Geocode from "react-geocode";
import borders from "../utils/country_borders.geojson";
import cityNames from "../utils/ne_110m_populated_places_simple.geojson";

import { setCurrentLocation } from "../redux/slices/authSlice";
import { setCurrencyIndex } from "../redux/slices/globalSlice";
Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API);
Geocode.enableDebug();

const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER_API,
});

export const getBoundaryDetailsFromServer = async (
  city,
  setBoundary,
  setPosition,
  setLoadingResults
) => {
  try {
    setLoadingResults(true);
    const response = await api.get(`users/city-polygon/?city=${city}`);
    if (response?.data?.result?.geometry !== "") {
      let myObject = JSON.parse(response?.data?.result?.geometry);
      let objectCenter = parseInt(myObject.length / 2);

      setBoundary(myObject);
      setPosition({
        lat: myObject[objectCenter]?.lat,
        lng: myObject[objectCenter]?.lng,
      });
      setLoadingResults(false);
    } else {
      setBoundary([]);
      if (city !== "") {
        await getLatFromAddress(
          typeof city === "string" ? city : "Lahore",
          setPosition,
          setLoadingResults
        );
      } else setLoadingResults(false);
    }
  } catch (error) {
    setLoadingResults(false);

    return false;
  }
};
export const fetchNearByPlaces = async (
  lat,
  lng,
  type,
  property,
  setData,
  setLoading
) => {
  try {
    if (property?.lat !== undefined) {
      setLoading(true);
      const map = new window.google.maps.Map(
        document.getElementById("propertyDetailsMap"),
        {
          center: {
            lat: property?.lat,
            lng: property?.lng,
          },
          zoom: 15,
        }
      );
      var request = {
        location: {
          lat,
          lng,
        },
        radius: "500",
        type: [type],
      };
      const service = new window.google.maps.places.PlacesService(map);
      service.nearbySearch(request, (res, status) => {
        if (status === "OK") {
          setData(res);
          setLoading(false);
        } else {
          setLoading(false);
          setData([]);
        }
      });
    }
  } catch (error) {
    return error;
  }
};
export const fetchUsersCurrentLocations = async (dispatch) => {
  try {
    window.navigator.geolocation.getCurrentPosition(async (position) => {
      const properAddress = await getAddressFromLat(
        position.coords.latitude,
        position.coords.longitude
      );
      dispatch(
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          address: properAddress?.results[0]?.formatted_address,
          ...getCountryName(properAddress?.results),
        })
      );
      let { countryCode } = getCountryName(properAddress?.results);
      dispatch(
        setCurrencyIndex(
          countryCode === "PK" ? 0 : countryCode === "TR" ? 2 : 1
        )
      );
    });
  } catch (error) {
    return error;
  }
};
const getLatFromAddress = async (
  address,
  setMapPosition,
  setLoadingResults
) => {
  try {
    const geocodeResponse = await Geocode.fromAddress(address);
    if (geocodeResponse) {
      setMapPosition({
        lat: geocodeResponse?.results?.[0]?.geometry?.location?.lat,
        lng: geocodeResponse?.results?.[0]?.geometry?.location?.lng,
      });
      setLoadingResults(false);
    } else setLoadingResults(false);
  } catch (error) {
    setLoadingResults(false);
  }
};
export const getAddressFromLat = async (lat, lng) => {
  try {
    const geocodeResponse = await Geocode.fromLatLng(lat, lng);
    if (geocodeResponse) {
      return geocodeResponse;
    } else return null;
  } catch (error) {
    return error;
  }
};
export const getGeocodeLat = async (address) => {
  try {
    const geocodeResponse = await Geocode.fromAddress(address);
    if (geocodeResponse) {
      return geocodeResponse?.results[0]?.geometry?.location;
    } else return null;
  } catch (error) {
    return null;
  }
};
export const getGeocodeAddress = async (lat, lng) => {
  try {
    const geocodeResponse = await Geocode.fromLatLng(lat, lng);
    if (geocodeResponse) {
      return geocodeResponse?.results[0];
    } else return null;
  } catch (error) {}
};
export const getCountryPolygons = async (dispatch) => {
  const response = await axios.get(borders);
  if (response) dispatch(response?.data);
};
export const getCityNames = async (setData) => {
  const response = await axios.get(cityNames);
  if (response) {
    console.log({ response });
    setData(response?.data?.features);
  }
};
const getCountryName = (address) => {
  let country = "";
  let countryCode = "";

  address?.forEach((elem) => {
    if (elem?.types?.includes("country")) {
      country = elem?.formatted_address;
      countryCode = elem?.address_components[0]?.short_name;
    }
  });
  return { country, countryCode };
};
