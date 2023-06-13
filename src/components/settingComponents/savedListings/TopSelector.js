import React, { useMemo } from "react";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import { NEWS_FILTER, SAVE_LIST_ITEMS } from "../../../utils/constants";
import "../myListings/myListingStyles.css";
import { Button, Grid } from "@mui/material";
import { TextTranslation } from "../../../utils/translation";
import { useLocation, useNavigate } from "react-router-dom";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: "1px solid lightGray",
    margin: "20px 0px",
    paddingBottom: 10,
  },
  filterContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 8,
  },
  sort: {
    fontSize: 14,
  },
  "@media (max-width: 685px)": {
    container: {
      flexDirection: "column",
      alignItems: "flex-start",
    },
  },
}));
/* TopSelector contains options properties, agents, agencies and sort by using which we can select which favourites we want to view. */
const TopSelector = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { darkMode, langIndex } = useSelector((state) => state.global);

  const path = useMemo(
    () => pathname?.split("/")?.filter((elem) => elem !== ""),
    [pathname]
  );
  const getButtonColor = (elem) => {
    // console.log({ elem, path });
    if (elem[0] === path[2])
      return {
        color: darkMode ? "#0ed864" : "#134696",
        fontSize: "24px",
      };
    else
      return {
        color: darkMode ? "#fff" : "#6B7B88",
        fontSize: "14px",
      };
  };

  return (
    <div className={classes.container}>
      <Grid
        container
        sx={{
          display: "flex",
          flex: 1,
        }}
      >
        {SAVE_LIST_ITEMS?.map((elem, index) => (
          <Grid item xs={6} lg={2} md={3} sm={4} key={index}>
            <Button
              sx={{
                ...getButtonColor(elem),
                fontFamily: "medium",
                textTransform: "capitalize",
                "&:hover": {
                  ...getButtonColor(elem),
                },
                height: "100%",
              }}
              onClick={() => navigate(elem[0])}
            >
              {elem[langIndex]}
            </Button>
          </Grid>
        ))}
      </Grid>
      <div className={classes.filterContainer}>
        <span
          className={classes.sort}
          style={{
            color: darkMode ? "#fff" : "#9DB1BC",
          }}
        >
          {TextTranslation.sortBy[langIndex]}:
        </span>
        <div className="listingsSelectDiv">
          <select>
            {NEWS_FILTER?.map((elem, index) => (
              <option key={index} value={elem}>
                {elem[langIndex]}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default TopSelector;
