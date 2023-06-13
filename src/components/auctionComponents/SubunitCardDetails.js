import React from "react";
import { makeStyles } from "@mui/styles";
import {
  currencyFormatInitials,
  getConcatenatedPrice,
} from "../../utils/helperFunctions";
import CustomTooltip from "../globalComponents/CustomTooltip";

const useStyles = makeStyles(() => ({
  valueContainer: {
    display: "flex",
    margin: "5px 0px",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: "1px solid #0ED864",
    paddingBottom: 10,
  },
  value: {
    fontSize: 18,
    color: "#134696",
    marginTop: 0,
    fontFamily: "medium",
    fontWeight: "bold",
  },
  auctionEnd: {
    fontSize: 18,
    color: "#D0021B ",
    marginTop: 0,
    fontFamily: "medium",
  },
  verticalContainer: {
    display: "flex",
    flexDirection: "column",
    margin: "0px 10px",
    width: 200,
  },
  title: {
    fontSize: 13,
    color: '#707070',
    fontFamily: 'medium',
    margin: '5px 0px',
  },
}));

/* SubunitCardDetails is the individual component that is mapped on
auctions page for sub unit auctions only. */
const SubunitCardDetails = ({ auction }) => {
  const classes = useStyles();

  return (
    <div className={classes.valueContainer}>
      <div className={classes.verticalContainer}>
        <p className={classes.title}>Price value</p>
        <CustomTooltip
          title={
            currencyFormatInitials(
              auction?.sub_unit_value,
              auction?.currency
            ) || ""
          }
        >
          <span className={classes.value}>
            {/* {currencyFormatInitials(auction?.sub_unit_value, auction?.currency)} */}
            {getConcatenatedPrice(
              `${currencyFormatInitials(
                auction?.sub_unit_value,
                auction?.currency
              )}`,
              10
            )}
          </span>
        </CustomTooltip>
      </div>
      <div className={classes.verticalContainer}>
        <p className={classes.title}>Shares available</p>
        <span className={classes.value}>
          {auction?.available_sub_unit_share_percentage
            ? parseInt(auction?.available_sub_unit_share_percentage)
            : 0 + "%"}
        </span>
      </div>
    </div>
  );
};

export default SubunitCardDetails;
