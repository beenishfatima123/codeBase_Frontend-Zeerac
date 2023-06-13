import React, { useCallback, useMemo, useState } from "react";
import { makeStyles } from "@mui/styles";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Button, IconButton, Skeleton } from "@mui/material";
import { GROUP_DETAIL_CONTENT } from "../../../../utils/constants";
import { toast } from "react-toastify";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { TextTranslation } from "../../../../utils/translation";
import GroupMemberCard from "./GroupMemberCard";
import { leaveGroup } from "../../../../redux/slices/groupsSlice";
import UserSkeleton from "../../../loadingSkeletons/UserSkeleton";

import GroupUserList from "./GroupUserList";
import _debounce from "lodash/debounce";
import { fetchSearchedMods } from "../../../../api/socialApi";

const btnSx = {
  textTransform: "none",
  color: "#696974",
  backgroundColor: "#F1F1F5",
  "&:hover": {
    color: "#000",
    backgroundColor: "#F1F1F5",
  },
  borderRadius: "5px",
  mr: 1,
  padding: "6px 24px",
};

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    margin: "10px 0",
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
}));
const GroupMembers = ({ setSelectedContent }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { darkMode, langIndex } = useSelector((state) => state.global);
  const { currentUser } = useSelector((state) => state.auth);
  const { selectedGroup, groupsApi, groupMembers, groupModerators } =
    useSelector((state) => state.groups);

  const [searchQuery, setSearchQuery] = useState();
  const [searchedMods, setSearchedMods] = useState();
  const [searchedMembers, setSearchedMembers] = useState();

  const [loading, setLoading] = useState();

  // console.log({ searchedMods });

  /* get moderators to display */
  const modsToShow = useMemo(() => {
    if (searchQuery?.mods?.length > 1) return searchedMods;
    else return groupModerators;
  }, [searchedMods, groupModerators, searchQuery?.mods]);

  /* get members to display */
  const membersToShow = useMemo(() => {
    if (searchQuery?.members?.length > 1) return searchedMembers;
    else return groupMembers;
  }, [searchedMembers, groupMembers, searchQuery?.members]);
  // console.log({ groupModerators, groupMembers });

  /* decide whether to show the current user in the groups member list or not. */
  const showUserInList = useMemo(() => {
    // console.log({ selectedGroup, currentUser });

    let _show = false;
    selectedGroup?.members?.forEach((elem) => {
      if (elem === currentUser?.id) _show = true;
    });
    selectedGroup?.moderators?.forEach((elem) => {
      if (elem === currentUser?.id) _show = true;
    });
    if (selectedGroup?.admin === currentUser?.id) _show = true;
    return _show;
  }, [currentUser, selectedGroup]);

  /* on clicking leave group, dispatch leave group data, if not logged in, show error. */
  const handleGroupMembership = () => {
    if (currentUser) {
      dispatch(
        leaveGroup({
          id: selectedGroup?.id,
          token: currentUser?.token,
          user: currentUser?.id,
        })
      );
    } else
      toast.error("You need to login first", {
        position: toast.POSITION.BOTTOM_RIGHT,
        hideProgressBar: true,
      });
  };
  const handleDebounceFn = async (query) => {
    // console.log({ query });
    setLoading((prev) => ({ ...prev, loadingMods: true }));
    const response = await fetchSearchedMods({
      id: selectedGroup?.id,
      query,
    });
    if (response) setSearchedMods(response);
    setLoading((prev) => ({ ...prev, loadingMods: false }));
  };
  // eslint-disable-next-line
  const debounceFn = useCallback(_debounce(handleDebounceFn, 1000), []);
  const handleModSearchInput = (e) => {
    setSearchQuery((prev) => ({ ...prev, mods: e?.target?.value }));
    if (e?.target?.value?.length > 1) debounceFn(e?.target?.value);
  };
  return (
    <div
      className={classes.container}
      style={{
        backgroundColor: darkMode ? "#2f2f33" : "#fff",
      }}
    >
      {/* top header in members section. */}
      <div className={classes.top}>
        
        <div className={classes.horizontal}>
          <IconButton
            onClick={() => setSelectedContent(GROUP_DETAIL_CONTENT.POSTS)}
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
            Members ~ {groupMembers?.count + modsToShow?.count + 1}
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
            value={searchQuery?.mods || ""}
            onChange={handleModSearchInput}
          />
          <SearchIcon style={{ color: darkMode ? "#FFFFFF" : "#9DAFBD" }} />
        </div>
      </div>
      {showUserInList && (
        <div style={{ padding: 16 }}>
          <GroupMemberCard
            member={{ ...currentUser, first_name: "You", last_name: "" }}
            endButton={
              <>
                {groupsApi?.loadingLeave ? (
                  <>
                    <Skeleton
                      height={40}
                      width={100}
                      variant="rectangular"
                      sx={{ marginRight: "5px" }}
                    />
                  </>
                ) : (
                  <Button
                    sx={btnSx}
                    onClick={handleGroupMembership}
                    disabled={
                      selectedGroup?.admin + "" === currentUser?.id + ""
                    }
                  >
                    Leave Group
                  </Button>
                )}
              </>
            }
          />
          <div className={classes.divider} />
        </div>
      )}
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
        <GroupUserList users={modsToShow} label={"Admin & Moderators"} admin />
      )}
      <div
        className={classes.divider}
        style={{ width: "calc(100% - 24px)", alignSelf: "center" }}
      />

      {groupsApi?.loadingMembers || loading?.loadingMembers ? (
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
        <GroupUserList
          users={membersToShow}
          label={"Members"}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setSearchedMembers={setSearchedMembers}
          setLoadingParent={setLoading}
          showSearch
        />
      )}
    </div>
  );
};

export default GroupMembers;
