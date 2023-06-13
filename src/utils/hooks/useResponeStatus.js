import { useEffect } from "react";
import { toast } from "react-toastify";
import { API_RESPONSES } from "../constants";

/**
 * Custom hook to handle different API response statuses and display corresponding toast messages.
 *
 * @param {string} responseCondition - Condition representing the API response status.
 * @param {string} successMessage - Message to display on success.
 * @param {string} errorMessage - Message to display on error.
 * @param {function} errorFunction - Function to execute on error.
 * @param {function} successFunction - Function to execute on success.
 */
const useResponseStatus = (
  responseCondition,
  successMessage,
  errorMessage,
  errorFunction,
  successFunction
) => {
  useEffect(() => {
    // Handle error response
    if (responseCondition === API_RESPONSES?.ERROR) {
      toast.error(errorMessage, {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
      });
      errorFunction();
    }

    // Handle success response
    if (responseCondition === API_RESPONSES?.SUCCESS) {
      toast.success(successMessage, {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
      });
      successFunction();
    }
  }, [
    responseCondition,
    successMessage,
    errorMessage,
    errorFunction,
    successFunction,
  ]);
};

export default useResponseStatus;
