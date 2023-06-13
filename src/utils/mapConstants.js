import { darkModeMapStyle } from "./darkModeMapStyle";
import { mapStyle } from "./mapStyle";

export const GOOGLE_MAPS_URL = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API}&callback=Function.prototype&libraries=geometry,drawing,places&v=weekly&channel=2`;
export const DEFAULT_HOME_ZOOM = 12;
export const HOME_OPTIONS = {
  styles: mapStyle,
  disableDefaultUI: true,
};
export const HOME_OPTIONS_DARK = {
  styles: darkModeMapStyle,
  disableDefaultUI: true,
};
export const DEFAULT_CENTER = {
  lat: 31.5204,
  lng: 74.3587,
};
