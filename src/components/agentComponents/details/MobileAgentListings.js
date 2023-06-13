import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    justifyContent: "space-between",
    width: "95%",
    borderBottom: "1px solid #000",
    alignSelf: "center",
    marginLeft: "2.5%",
    marginRight: "2.5%",
  },
  innerContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  userInfo: {
    display: "flex",
    flexDirection: "column",
    margin: 10,
  },
  fullname: {
    fontFamily: "heavy",
    fontSize: 18,
    color: "#000",
    textTransform: "capitalize",
  },
  address: {
    fontFamily: "light",
    fontSize: 16,
    color: "#8b8b8b",
  },
  company: {
    fontFamily: "light",
    fontSize: 16,
    color: "#8b8b8b",
  },
  listings: {
    fontFamily: "light",
    fontSize: 16,
    color: "#8b8b8b",
  },
}));

/* MobileAgentListings is shown on agentDetails page on the right 
side under Listings heading. */
const MobileAgentListings = ({
  size,
  unit,
  bedrooms,
  bathrooms,
  price,
  currency,
  area,
  city,
  country,
  onClick,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.container} onClick={onClick}>
      <div className={classes.innerContainer}>
        <div className={classes.userInfo}>
          <div className={classes.fullname}>
            {size} {unit} {bedrooms + " bedrooms"} {bathrooms + " bathrooms"}
          </div>
          <div className={classes.address}>
            {currency}&nbsp;{price}
          </div>
          <div className={classes.company}>{area}</div>
          <div className={classes.listings}>
            {city}&nbsp;{country}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileAgentListings;
