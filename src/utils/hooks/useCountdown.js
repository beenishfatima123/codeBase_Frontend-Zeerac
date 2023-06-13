import { useEffect, useState } from "react";

/*
  Custom hook for countdown functionality based on a target date.

  Parameters:
  - targetDate: The target date for the countdown.

  Returns:
  - An array with the countdown values [days, hours, minutes, seconds].
*/
export const useCountdown = (targetDate) => {
  const countDownDate = new Date(targetDate).getTime();

  const [countDown, setCountDown] = useState(
    countDownDate - new Date().getTime()
  );
  /*
    Effect for updating the countdown values every second.
    Updates the countDown state based on the remaining time.
  */
  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countDownDate - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownDate]);

  return getReturnValues(countDown);
};

/*
  Helper function to calculate the countdown values.

  Parameters:
  - countDown: The remaining time in milliseconds.

  Returns:
  - An array with the countdown values [days, hours, minutes, seconds].
*/
const getReturnValues = (countDown) => {
  // calculate time left
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return [days, hours, minutes, seconds];
};
