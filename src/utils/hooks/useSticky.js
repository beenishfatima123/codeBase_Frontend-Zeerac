import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
/**
 * Custom hook for determining if an element should stick to the top of the viewport on scroll.
 *
 * @param {object} containerRef - Reference to the container element.
 * @returns {boolean} - Indicates whether the element should stick to the top.
 */
const useSticky = (containerRef) => {
  const [stick, setStick] = useState();
  const [offset, setOffset] = useState();

  const { isFooterVisible } = useSelector((state) => state.global);

  // Calculate the initial offset of the container element
  // eslint-disable-next-line
  useEffect(() => {
    if (containerRef?.current) {
      const boundingRect = containerRef?.current?.getBoundingClientRect();
      if (!offset) {
        setOffset(boundingRect?.y);
      }
    }
  });

  useEffect(() => {
    // Add event listener for scroll

    window.addEventListener("scroll", () => listenToScroll(isFooterVisible));
    return () =>
      // Clean up by removing the event listener when component is unmounted
      window.removeEventListener("scroll", () =>
        listenToScroll(isFooterVisible)
      );
    // eslint-disable-next-line
  }, [offset, isFooterVisible]);

  /**
   * Handle scroll event and determine if the element should stick based on scroll position and offset.
   *
   * @param {boolean} isFooter - Indicates whether the footer is visible.
   */
  const listenToScroll = (isFooter) => {
    // console.log({ sy: window.scrollY, offset });
    if (window.scrollY < 50) setStick(false);
    else if (window.scrollY > offset) {
      setStick(true);
    } else {
      setStick(false);
    }
  };

  return stick;
};

export default useSticky;
