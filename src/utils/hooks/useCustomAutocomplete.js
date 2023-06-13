import { useEffect } from "react";

/*
  Custom hook for handling autocomplete functionality.

  Parameters:
  - inputRef: Ref object for the input element.
  - autocompleteRef: Ref object for the Autocomplete instance.
  - options: Options object for configuring Autocomplete.
  - setInputValue: Function to set the input value based on selected place.

  Note:
  - Requires the Google Maps JavaScript API to be loaded before using this hook.
*/
export const useCustomAutocomplete = (
  inputRef,
  autocompleteRef,
  options,
  setInputValue
) => {
  /*
    Initialize the Autocomplete instance when the inputRef and window.google are available.
    Store the instance in the autocompleteRef.
  */
  if (inputRef?.current && window?.google && !autocompleteRef?.current) {
    autocompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      options
    );
  }

  /*
    Effect for adding a place_changed event listener to the Autocomplete instance.
    Calls handlePlaceChange when a place is selected.
  */
  useEffect(() => {
    if (autocompleteRef?.current) {
      autocompleteRef.current.addListener("place_changed", handlePlaceChange);
    }
    // eslint-disable-next-line
  }, [autocompleteRef?.current]);

  /*
    Callback function called when a place is selected.
    Extracts the place name and sets it as the input value.
  */
  const handlePlaceChange = async () => {
    const place = await autocompleteRef.current.getPlace();
    setInputValue(place?.name?.split(",")[0]);
  };
};
