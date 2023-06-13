import React, { useMemo } from "react";
import { makeStyles } from "@mui/styles";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Button } from "@mui/material";
import { useWindowDims } from "../../../utils/useWindowDims";
import GroupCard from "./GroupCard";
import PaginationContainer from "../members/memberDetail/PaginationContainer";
import { paginate } from "../../../redux/slices/groupsSlice";
import { useSelector } from "react-redux";

const backSx = {
  fontSize: 16,
  textTransform: "none",
  maxWidth: 150,
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  textAlign: "left",
  padding: "8px 0px",
};
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

/* takes groups, label, selectedTab setter and full bool, displays groups in selected tab in form of list under label, if full, show detailed view. */
const GroupList = ({ groups, label, setSelectedTab, full }) => {
  const classes = useStyles();
  const { width } = useWindowDims();
  const { groupsApi } = useSelector((state) => state.groups);
  const { darkMode } = useSelector((state) => state.global);

  // console.log({ groups });
  /* get top 3 groups to display. */
  const groupsToShow = useMemo(() => {
    return full ? groups?.results : groups?.results?.slice(0, 3);
  }, [groups, full]);
  return (
    <div
      className={classes.container}
      style={{
        backgroundColor: darkMode ? "#2f2f33" : "#fff",
      }}
    >
      {/* show back button if full is true and width > 850. */}
      {full && width > 850 && (
        <Button
          onClick={() => setSelectedTab()}
          sx={{ ...backSx, color: darkMode ? "#0ed864" : "#134696" }}
          startIcon={<ArrowBackIosNewIcon style={{ fontSize: 16 }} />}
        >
          Back
        </Button>
      )}
      {/* heading from props label. */}
      <div className={classes.header}>
        <div
          className={classes.heading}
          style={{
            color: darkMode ? "#0ed864" : "#134696",
          }}
        >{`${label?.replace("_", " ")}`}</div>
      </div>
      {/* map groups to show using groupcard */}
      {(groups?.count > 0) ? (
      groupsToShow?.map((item, index) => (
        <GroupCard key={index} group={item} />
      ))): (<p className={classes.seeMore}>No groups to show</p>)}
      {/* show pagination if groups are more than 10 */}
      {full && groups?.count > 10 && (
        <PaginationContainer
          paginationData={groups}
          loading={groupsApi?.loadingPagination}
          paginationFunction={paginate}
          label={{
            title: "No more groups to show",
          }}
          destination={label}
        />
      )}
      {/* see more button if groups are more */}
      {groups?.count >= 3 && !full && (
        <button
          className={classes.seeMore}
          onClick={() => setSelectedTab(label)}
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

export default GroupList;
