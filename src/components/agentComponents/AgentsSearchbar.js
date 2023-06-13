import React from "react";
import { makeStyles } from "@mui/styles";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector } from "react-redux";
import "./agents.css";
import { HEADER_CONTENT_WIDTH } from "../../utils/constants";
import { TextTranslation } from "../../utils/translation";
const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "3px 20px",
    borderRadius: 30,
    border: "1px solid black",
    height: 30,
    width: HEADER_CONTENT_WIDTH,
    maxWidth: "90%",
    margin: "auto",
    alignSelf: "center",
  },
}));

/* The search bar under the featured icons on agents page.
It takes search query and setter as input and displays agents based on search query. */
const AgentsSearchbar = ({ searchQuery, setSearchQuery }) => {
  const classes = useStyles();
  const { darkMode, langIndex } = useSelector((state) => state.global);

  return (
    <div
      className={classes.container}
      style={{
        backgroundColor: darkMode ? "#2F2F33" : "",
        border: darkMode ? "none" : "1px solid #9DAFBD",
      }}
    >
      <input
        type="text"
        className="agent-input"
        placeholder={`${TextTranslation.searchByName[langIndex]}, ${TextTranslation.area[langIndex]}, ${TextTranslation.city[langIndex]}`}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e?.target?.value)}
        style={{
          color: darkMode ? "#fff" : "#000",
          "&:placeholder": {
            color: darkMode ? "#fff" : "#134696",
          },
        }}
        id="agentsSearchBar"
      />
      <SearchIcon
        style={{
          color: darkMode ? "#fff" : "#000",
        }}
      />
    </div>
  );
};

export default AgentsSearchbar;
