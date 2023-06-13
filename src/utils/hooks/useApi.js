import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

/*
  Custom hook for handling API responses and errors.

  Parameters:
  - apiError: The error object received from the API response.
  - apiResponse: The response object received from the API.
  - successMessage: The success message to display in the toast when the API response is successful.
  - dispatchFunction: The dispatch function to be executed when handling the API response or error.
*/
const useApi = (apiError, apiResponse, successMessage, dispatchFunction) => {
  const dispatch = useDispatch();

  /*
    Effect for handling API error.
    Displays an error toast message and dispatches the provided dispatch function.
  */
  useEffect(() => {
    if (apiError) {
      toast.error(apiError?.message, {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
      });
      dispatch(dispatchFunction());
    }
    // eslint-disable-next-line
  }, [apiError]);

  /*
    Effect for handling API response.
    Displays a success toast message and dispatches the provided dispatch function.
  */
  useEffect(() => {
    if (apiResponse) {
      toast.success(successMessage, {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
      });
      dispatch(dispatchFunction());
    }
    // eslint-disable-next-line
  }, [apiResponse]);
};

export default useApi;
