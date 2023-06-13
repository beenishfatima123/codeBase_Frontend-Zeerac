import React from "react";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import ReactGoogleAutocomplete from "react-google-autocomplete";
import { resetSearchAgent } from "../../redux/slices/agentsSlice";
import { buildAgentsSearchQuery } from "../../utils/helperFunctions";
import "./agents.css";
import { TextTranslation } from "../../utils/translation";
import { HEADER_CONTENT_WIDTH } from "../../utils/constants";

const useStyles = makeStyles(() => ({
  container: {
    width: HEADER_CONTENT_WIDTH,
    maxWidth: "90%",
    border: "2px solid #e3e3e3",
    borderRadius: 5,
    marginTop: 20,
  },
  section: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    padding: "20px 0 20px 0",
    flexWrap: "wrap",
  },
  subSection: {
    display: "flex",
    flexDirection: "column",
    minWidth: "30%",
    justifyContent: "center",
  },
  heading: {
    fontFamily: "medium",
    fontSize: 14,
    color: "#134696",
    // margin: '10px 0',
  },
  input: {
    border: "none",
    borderBottom: "2px solid #e3e3e3",
    color: "#134696",
    fontSize: 18,
    marginTop: 5,
    fontFamily: "medium",
    "&:focus": {
      outline: "none",
    },
  },
  selectContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderBottom: "1px solid #c9c9c9",
    margin: "10px 0px",
  },
  btn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#134696",
    border: "none",
    color: "#fff",
    fontFamily: "medium",
    width: 100,
    height: 35,
    borderRadius: 20,
    cursor: "pointer",
  },
  "@media (max-width: 600px)": {
    section: {
      display: "flex",
      flexDirection: "column",
      padding: 10,
      justifyContent: "center",
      alignItems: "flex-start",
    },
    subSection: {
      width: "100%",
    },
    heading: {
      marginTop: 20,
    },
  },
}));

/* AgentFilter is displayed under search bar which apply filters like area and city. */
const AgentFilter = ({ searchAgents, setLocation, location }) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { langIndex, darkMode } = useSelector((state) => state.global);

  /* in case if anything from event changes, this action takes prop and event 
  and uses them for locaton button. */
  const handleLocationChange = (prop) => (event) => {
    setLocation((prev) => ({
      ...prev,
      [prop]: event?.target.value,
    }));
  };

  return (
    <div
      className={classes.container}
      style={{
        backgroundColor: darkMode ? "#2F2F33" : "",
        border: darkMode ? "none" : "2px solid #e3e3e3",
      }}
    >
      <div className={classes.section}>
        <div className={classes.subSection}>
          <div
            className={classes.heading}
            style={{ marginTop: -5, color: darkMode ? "#0ed864" : "#134696" }}
          >
            {TextTranslation.area[langIndex]}
          </div>
          <input
            type="text"
            className={classes.input}
            value={location?.area || ""}
            onChange={handleLocationChange("area")}
            placeholder={TextTranslation.agentArea[langIndex]}
            style={{
              color: darkMode ? "#fff" : "#000",
              backgroundColor: darkMode ? "#2F2F33" : "",
            }}
          />
        </div>

        <div className={classes.subSection}>
          <div
            className={classes.heading}
            style={{ color: darkMode ? "#0ed864" : "#134696" }}
          >
            {TextTranslation.city[langIndex]}
          </div>
          <div className={classes.selectContainer}>
            <ReactGoogleAutocomplete
              apiKey={process.env.REACT_APP_GOOGLE_MAPS_API}
              className={"login-input"}
              style={{
                fontFamily: "medium",
                fontSize: 18,
                color: darkMode ? "#fff" : "#000",
                backgroundColor: darkMode ? "#2F2F33" : "",
              }}
              value={location?.city || ""}
              onChange={handleLocationChange("city")}
              onPlaceSelected={(val) =>
                setLocation((prev) => ({
                  ...prev,
                  city: val?.name?.split(",")[0],
                }))
              }
              placeholder={TextTranslation.agentCity[langIndex]}
              options={{
                types: ["(cities)"],
                fields: ["name"],
              }}
            />
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <button
            className={classes.btn}
            onClick={() => {
              searchAgents(buildAgentsSearchQuery(location));
            }}
            style={{
              backgroundColor: darkMode ? "#0ed864" : "#134696",
              color: darkMode ? "#000" : "#fff",
            }}
          >
            {TextTranslation.apply[langIndex]}
          </button>
          <button
            className={classes.btn}
            style={{
              backgroundColor: darkMode ? "#0ed864" : "#134696",
              color: darkMode ? "#000" : "#fff",
              marginLeft: 5,
            }}
            onClick={() => {
              setLocation(null);
              dispatch(resetSearchAgent());
            }}
          >
            {TextTranslation.clear[langIndex]}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgentFilter;
