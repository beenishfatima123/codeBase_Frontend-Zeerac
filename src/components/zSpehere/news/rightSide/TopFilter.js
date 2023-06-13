import React from "react";
import { makeStyles } from "@mui/styles";
// import { NEWS_FILTER } from "../../../../utils/constants";
import "../newsStyles.css";
const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  filterContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#134696",
  },
  sort: {
    fontSize: 14,
    color: "#9DB1BC",
  },
  "@media (max-width: 1024px)": {
    container: {
      flexDirection: "row",
    },
  },
}));

/* Top header in on news and blogs page. Show label as heading. */
const TopFilter = ({ blogs, label }) => {
  const classes = useStyles();
  return (
    <div
      className={classes.container}
      style={{
        borderBottom: blogs ? "1px solid #C9C9C9" : "",
        paddingBottom: blogs ? 10 : 0,
        display: "flex",
      }}
    >
      <span className={classes.title}>{label || "Top Trending"}</span>
      {/* <div className={classes.filterContainer}>
        <span className={classes.sort}>Sort By:</span>
        <div className="newsSelectDiv">
          <select>
            {NEWS_FILTER?.map((elem, index) => (
              <option key={index} value={elem[0]}>
                {elem[0]}
              </option>
            ))}
          </select>
        </div>
      </div> */}
    </div>
  );
};

export default TopFilter;
