import { useEffect, useState } from "react";
import { useWindowDims } from "../useWindowDims";

/**
 * Custom hook to get the width of the parent element of a container.
 *
 * @param {React.RefObject} containerRef - Reference to the container element.
 * @returns {number} - Width of the parent element.
 */
const useParentDims = (containerRef) => {
  const [parentWidth, setParentWidth] = useState();
  const { width } = useWindowDims();

  useEffect(() => {
    // Update the parentWidth state when the containerRef or width changes
    if (containerRef?.current)
      setParentWidth(containerRef?.current?.parentElement?.offsetWidth);
  }, [containerRef, width]);
  return parentWidth;
};

export default useParentDims;
