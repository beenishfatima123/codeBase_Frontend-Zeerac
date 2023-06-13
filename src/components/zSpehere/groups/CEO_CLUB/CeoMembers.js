import React, { useCallback, useMemo, useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { TextTranslation } from "../../../../utils/translation";
import UserSkeleton from "../../../loadingSkeletons/UserSkeleton";

import _debounce from "lodash/debounce";
import { fetchSearchedMembers } from "../../../../api/socialApi";
import { useNavigate } from "react-router-dom";
import { SOCIAL_CONTENT_SELECTION } from "../../../../utils/constants";
import CeoCard from "./CeoCard";
import { getCEOClubMembers } from "../../../../redux/slices/zSphereCEOSlice";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
  },
  top: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: "2px solid #EAEAEA",
    padding: "8px 16px",
    margin: "5px 0px",
  },
  heading: {
    fontSize: 14,
    color: "#134696",
    fontFamily: "medium",
    margin: 0,
  },
  horizontal: {
    display: "flex",
    alignItems: "center",
  },
  searchContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "4px 12px",
    borderRadius: 30,
    position: "relative",
  },
  divider: {
    height: 2,
    width: "100%",
    backgroundColor: "#EAEAEA",
  },
  input: {
    display: "flex",
    border: "none",
    fontSize: 14,
    "&:focus": {
      outline: "none",
    },
    "&:placeholder": {
      color: "#FFFFFF",
    },
    color: "#9DAFBD",
    // width: 200,
  },
  endBtnContainer: {
    display: "flex",
    alignItems: "center",
  },
  cardContainer: {
    padding: 20,
    display: "flex",
    flexDirection: "column",
  },
}));
const CeoMembers = ({ setSelectedContent }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.auth);
  const { darkMode, langIndex } = useSelector((state) => state.global);
  const { selectedGroup, groupsApi } = useSelector((state) => state.groups);
  const { getCEOClubData, getCEOClubMembersData } = useSelector(
    (state) => state.zSphereCEO
  );

  const [searchQuery, setSearchQuery] = useState();
  const [searchedMembers, setSearchedMembers] = useState();

  const [loading, setLoading] = useState();

  useEffect(() => {
    dispatch(
      getCEOClubMembers({
        token: currentUser?.token,
        id: getCEOClubData?.id,
      })
    );
    // eslint-disable-next-line
  }, []);

  const membersToShow = useMemo(() => {
    if (searchQuery?.length > 1) return searchedMembers;
    else return getCEOClubMembersData;
  }, [searchedMembers, getCEOClubMembersData, searchQuery]);

  const handleDebounceFn = async (query) => {
    // console.log({ query });
    setLoading((prev) => ({ ...prev, loadingMods: true }));
    const response = await fetchSearchedMembers({
      id: selectedGroup?.id,
      query,
    });
    if (response) setSearchedMembers(response);
    setLoading((prev) => ({ ...prev, loadingMods: false }));
  };
  // eslint-disable-next-line
  const debounceFn = useCallback(_debounce(handleDebounceFn, 1000), []);
  const handleSearchInput = (e) => {
    setSearchQuery(e?.target?.value);
    if (e?.target?.value?.length > 1) debounceFn(e?.target?.value);
  };
  return (
    <div
      className={classes.container}
      style={{
        backgroundColor: darkMode ? "#2f2f33" : "#fff",
      }}
    >
      <div className={classes.top}>
        <div className={classes.horizontal}>
          <IconButton
            onClick={() =>
              navigate(
                `/zSphere/${SOCIAL_CONTENT_SELECTION[5]?.replace(" ", "_")}`
              )
            }
          >
            <KeyboardBackspaceIcon
              style={{ color: darkMode ? "#0ed864" : "#134696" }}
            />
          </IconButton>
          <p
            className={classes.heading}
            style={{
              color: darkMode ? "#0ed864" : "#134696",
            }}
          >
            CEOs ~ {getCEOClubMembersData?.count}
          </p>
        </div>

        <div
          className={classes.searchContainer}
          style={{
            border: darkMode ? "1px solid #FFFFFF" : "1px solid #9DAFBD",
          }}
        >
          <input
            type="text"
            className={classes.input}
            placeholder={TextTranslation.searchHere[langIndex]}
            style={{
              color: "#9DAFBD",
              backgroundColor: "transparent",
            }}
            value={searchQuery || ""}
            onChange={handleSearchInput}
          />
          <SearchIcon style={{ color: darkMode ? "#FFFFFF" : "#9DAFBD" }} />
        </div>
      </div>

      {groupsApi?.loadingModerators || loading?.loadingMods ? (
        <>
          {[...Array(3)]?.map((elem, index) => (
            <UserSkeleton
              key={index}
              customSize={{ height: 40, width: 40 }}
              containerStyle={{ flex: "auto" }}
            />
          ))}
        </>
      ) : (
        <div className={classes.cardContainer}>
          {membersToShow?.results?.map((item, index) => (
            <CeoCard key={index} ceo={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CeoMembers;
