import React, { useMemo } from "react";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";

import { currencyFormatInitials } from "../../../utils/helperFunctions";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  winnerText: {
    fontSize: 18,
    fontFamily: "medium",
    margin: 0,
  },
  bidContainer: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    minWidth: "90%",
  },
  data: {
    fontSize: 20,
    fontFamily: "heavy",
    color: "#000000",
  },
  "@media (max-width: 1024px)": {
    container: {
      flexDirection: "column",
    },
  },
}));
const WinningAuction = () => {
  const classes = useStyles();
  const { auctionDetail } = useSelector((state) => state.auction);
  const { darkMode } = useSelector((state) => state.global);

  const winningBid = useMemo(() => {
    return auctionDetail?.result?.closing_bid[0];
  }, [auctionDetail]);
  return (
    <div className={classes.container}>
      <p
        className={classes.winnerText}
        style={{
          color: darkMode ? "#0ed864" : "#134696",
        }}
      >
        Winning bid by:{" "}
        <span
          style={{
            fontWeight: "bold",
            fontSize: 22,
            color: darkMode ? "#fff" : "#0ed864",
          }}
        >
          {winningBid?.user_fk?.full_name}
        </span>
      </p>
      <div className={classes.bidContainer}>
        <p className={classes.data} style={{ marginRight: 10 }}>
          {currencyFormatInitials(
            winningBid?.price,
            auctionDetail?.result?.currency
          )}
        </p>
      </div>
    </div>
  );
};

export default WinningAuction;
