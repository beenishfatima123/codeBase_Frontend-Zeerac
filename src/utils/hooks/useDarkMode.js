import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

/*
  Custom hook for handling dark mode based on the current location and video visibility.

  Returns:
  - dark: Boolean value indicating whether dark mode should be applied.
*/
export default function useDarkMode() {
  const [dark, setDark] = useState(false);
  const location = useLocation();
  const { isVideoVisible } = useSelector((state) => state.global);
  /*
    Effect that updates the dark mode based on the current location and video visibility.
  */
  useEffect(() => {
    if (isVideoVisible && location?.pathname === "/") setDark(true);
    else return setDark(false);
  }, [location, isVideoVisible]);

  return dark;
}
