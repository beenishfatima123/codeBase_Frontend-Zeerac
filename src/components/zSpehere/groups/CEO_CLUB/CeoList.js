import React, { useMemo } from "react";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import CeoCard from "./CeoCard";
import { useNavigate } from "react-router-dom";
import { CEO_CLUB_PARAM_IDS } from "../../../../utils/constants";

const useStyles = makeStyles(() => ({
  container: {
    padding: 20,
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    margin: "10px 0",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  heading: {
    fontSize: 20,
    color: "#134696",
    fontFamily: "medium",
    textTransform: "capitalize",
  },
  icon: {
    cursor: "pointer",
  },
  infoContainer: {
    display: "flex",
    margin: "10px 0",
  },
  name: {
    textTransform: "capitalize",
    color: "#134696",
    fontFamily: "medium",
    fontSize: 20,
  },
  username: {
    color: "#B5B5BE",
    fontFamily: "medium",
    fontSize: 14,
  },

  seeMore: {
    backgroundColor: "#fff",
    border: "none",
    color: "#134696",
    cursor: "pointer",
    height: 40,
    width: "100%",
    borderRadius: 10,
    fontFamily: "medium",
    fontSize: 14,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
    marginTop: 20,
  },
  notFound: {
    fontFamily: "medium",
    fontSize: 16,
    marginTop: 20,
    color: "#000",
    alignSelf: "center",
    textAlign: "center",
  },
}));

/* List of CEOs to be displayed on CEO club. */
const CeoList = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const { darkMode } = useSelector((state) => state.global);
  const { groupMembers } = useSelector((state) => state.groups);

  const ceoToShow = useMemo(() => {
    return groupMembers?.results?.slice(0, 3);
  }, [groupMembers]);

  return (
    <div
      className={classes.container}
      style={{
        backgroundColor: darkMode ? "#2f2f33" : "#fff",
      }}
    >
      <div className={classes.header}>
        <div
          className={classes.heading}
          style={{
            color: darkMode ? "#0ed864" : "#134696",
          }}
        >
          CEOs
        </div>
      </div>
      {ceoToShow?.map((item, index) => (
        <CeoCard key={index} ceo={item} />
      ))}
      {groupMembers?.count > 3 && (
        <button
          className={classes.seeMore}
          onClick={() =>
            navigate(`/zSphere/CEO_Club/${CEO_CLUB_PARAM_IDS.MEMBERS}`)
          }
          style={{
            backgroundColor: darkMode ? "#212124" : "#fff",
            color: darkMode ? "#0ed864" : "#134696",
          }}
        >
          See More
        </button>
      )}
    </div>
  );
};

export default CeoList;
