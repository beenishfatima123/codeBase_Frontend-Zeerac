import { useEffect, useState } from "react";

/*
  Custom hook to track if an element is visible on the screen.

  Parameters:
  - ref: Reference to the element to track.

  Returns:
  - isIntersecting: Boolean value indicating if the element is intersecting with the viewport.
*/
export default function useOnScreen(ref) {
  const [isIntersecting, setIntersecting] = useState(false);
  // Update the state when the visibility of the element changes
  const observer = new IntersectionObserver(([entry]) =>
    setIntersecting(entry.isIntersecting)
  );

  useEffect(() => {
    observer.observe(ref.current);
    // Remove the observer as soon as the component is unmounted
    return () => {
      observer.disconnect();
    };
    // eslint-disable-next-line
  }, []);

  return isIntersecting;
}
