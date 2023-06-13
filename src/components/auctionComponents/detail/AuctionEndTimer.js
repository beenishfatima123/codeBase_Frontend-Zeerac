import React, { useMemo } from "react";
import { makeStyles } from "@mui/styles";
import leftLines from "../../../assets/auctions/auctionLeft.png";
import rightLines from "../../../assets/auctions/auctionRight.png";
import { TextTranslation } from "../../../utils/translation";
import "./OtherAuctions.css";
import { useCountdown } from "../../../utils/hooks/useCountdown";
import { useSelector } from "react-redux";
import moment from "moment";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    minHeight: 150,
    borderTop: "1px solid #0ed864",
  },
  auctionEndText: {
    fontFamily: "heavy",
    fontSize: 30,
    color: "#134696",
    textTransform: "uppercase",
  },

  "@media (max-width: 1024px)": {
    container: {
      flexDirection: "column",
    },
  },
}));

const DateTimeDisplay = ({ value, type, isDanger }) => {
  return (
    <div className={isDanger ? "countdown danger" : "countdown"}>
      <p>{value + ""}</p>
      <span>{type + ""}</span>
    </div>
  );
};

/* AuctionEndTimer gives the total time remaining in the auction expiry. */
const AuctionEndTimer = () => {
  const classes = useStyles();

  const { langIndex, darkMode } = useSelector((state) => state.global);
  const { auctionDetail } = useSelector((state) => state.auction);

  const [days, hours, minutes, seconds] = useCountdown(
    moment(auctionDetail?.result?.end_date).add(1, "day")
  );

  const hasEnded = useMemo(() => {
    if (auctionDetail?.result?.available_files <= 0) return true;
    else return false;
  }, [auctionDetail]);

  // console.log({ hasEnded });
  return (
    <div className={classes.container}>
      <img
        alt=""
        src={leftLines}
        style={{ position: "absolute", left: 0, maxWidth: "25%" }}
      />
      {!hasEnded ? (
        <div className={classes.auctionEndText}>
          <span style={{ color: "#0ed864" }}>
            {TextTranslation.auctionEnds[langIndex]}:{" "}
          </span>
          {auctionDetail?.result?.end_date}
        </div>
      ) : (
        <div className={classes.auctionEndText}>Auction has Ended</div>
      )}

      <img
        alt=""
        src={rightLines}
        style={{ position: "absolute", right: 0, maxWidth: "25%" }}
      />

      {!hasEnded && (
        <div
          className={"show-counter"}
          style={{
            backgroundColor: darkMode ? "#2f2f33" : "#fff",
            color: darkMode ? "#0ed864" : "#134696",
          }}
        >
          <DateTimeDisplay value={days} type={"Days"} isDanger={days <= 3} />
          <p>:</p>
          <DateTimeDisplay value={hours} type={"Hours"} isDanger={false} />
          <p>:</p>
          <DateTimeDisplay value={minutes} type={"Mins"} isDanger={false} />
          <p>:</p>
          <DateTimeDisplay value={seconds} type={"Seconds"} isDanger={false} />
        </div>
      )}
    </div>
  );
};

export default AuctionEndTimer;
