import { useEffect } from "react";
import { darkColors, lightColors } from "../colors";
import { useDispatch, useSelector } from "react-redux";
import { setColors } from "../../redux/slices/globalSlice";

/*
  Custom hook for managing the color theme based on the darkMode state.

  Returns:
  - colors: The colors object based on the current theme.
*/
const useColor = () => {
  const dispatch = useDispatch();

  const { darkMode, colors } = useSelector((state) => state.global);
  /*
    Effect for updating the colors based on the darkMode state.
    Dispatches the setColors action with the appropriate colors object.
  */
  useEffect(() => {
    if (darkMode) {
      dispatch(setColors(darkColors));
    } else {
      dispatch(setColors(lightColors));
    }
    // eslint-disable-next-line
  }, [darkMode]);

  return colors;
};

export default useColor;
