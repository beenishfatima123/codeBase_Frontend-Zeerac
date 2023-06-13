import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import TableContent from "./TableContent";
import { useWindowDims } from "../../../utils/useWindowDims";
import { COMPARISON_TABS, SIZE_CONVERSION } from "../../../utils/constants";
import { useEffect } from "react";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    flex: 1,
  },
  tabsContainer: {
    backgroundColor: "#134696",
    borderRadius: 5,
    paddingLeft: 10,
  },
  tab: {
    color: "#fff",
    fontSize: 22,
    margin: "20px 0px",
  },
  "@media (max-width: 720px)": {
    tab: {
      fontSize: 17,
    },
  },
  "@media (max-width: 480px)": {
    tab: {
      fontSize: 13,
    },
  },
}));
const TableBody = () => {
  const classes = useStyles();
  const { width } = useWindowDims();
  const [sizeConversion, setSizeConversion] = useState();

  const { propertiesToCompare, langIndex, darkMode } = useSelector(
    (state) => state.global
  );

  useEffect(() => {}, [sizeConversion]);

  return (
    <div className={classes.container}>
      <div
        className={classes.tabsContainer}
        style={{
          width: width > 800 ? 250 : width * 0.25 || 250,
        }}
      >
        {COMPARISON_TABS?.map((elem, index) => (
          <p key={index} className={classes.tab}>
            {elem[langIndex]}
            {elem[langIndex] === "Space" ? (
              <span>
                <select
                  value={sizeConversion ? sizeConversion : "DEFAULT"}
                  onChange={(e) => setSizeConversion(e?.target?.value)}
                  style={{
                    backgroundColor: darkMode ? "#212124" : "white",
                    color: darkMode ? "white" : "#134696",
                    marginLeft: 10,
                    textTransform: "none",
                    borderRadius: 2,
                    fontSize: 14,
                    height: 20,
                    border: "1px solid #FFFF",
                    position: "relative",
                    outline: "none",
                  }}
                >
                  <option value="DEFAULT" disabled>
                    Convert
                  </option>
                  {SIZE_CONVERSION?.map((elem, index) => (
                    <option key={index} value={elem?.value}>
                      {elem?.label}
                    </option>
                  ))}
                </select>
              </span>
            ) : null}
          </p>
        ))}
      </div>
      {propertiesToCompare?.map((elem, index) => (
        <TableContent
          key={index}
          property={elem}
          sizeConversion={sizeConversion}
        />
      ))}
    </div>
  );
};

export default TableBody;
