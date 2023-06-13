import React, { useCallback, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import GroupMemberCard from "./GroupMemberCard";
import MemberDetailsMenu from "./MemberDetailsMenu";
import { setZsphereData } from "../../../../redux/slices/authSlice";
import { fetchSearchedMembers, followAgent } from "../../../../api/socialApi";
import PaginationContainer from "../../members/memberDetail/PaginationContainer";
import { GROUP_PAGINATION_TARGETS } from "../../../../utils/constants";
import { paginate } from "../../../../redux/slices/groupsSlice";
import { TextTranslation } from "../../../../utils/translation";
import _debounce from "lodash/debounce";
import SearchIcon from "@mui/icons-material/Search";

import CardEndButton from "./CardEndButton";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    // margin: "10px 0px",
  },
  endBtnContainer: {
    display: "flex",
    alignItems: "center",
  },
  label: {
    fontSize: 14,
    color: "#134696",
    fontFamily: "medium",
    marginTop: 0,
    marginBottom: 5,
  },
  topContainer: {
    display: "flex",
    alignItems: "center",
    flex: 1,
    justifyContent: "space-between",
  },
  searchContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "4px 12px",
    borderRadius: 30,
    position: "relative",
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
  notFound: {
    fontSize: 24,
    color: "#134696",
    textAlign: "center",
    fontFamily: "medium",
    display: "flex",
    flex: 1,
    alignSelf: "center",
  },
}));
const GroupUserList = ({
  users,
  admin,
  label,
  searchQuery,
  setSearchQuery,
  showSearch,
  setSearchedMembers,
  setLoadingParent,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { currentUser, zsphereData } = useSelector((state) => state.auth);
  const { groupAdmin, groupsApi, selectedGroup } = useSelector(
    (state) => state.groups
  );
  const { darkMode, langIndex } = useSelector((state) => state.global);
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [seeAll, setSeeAll] = useState(false);

  const handleFollow = async (user) => {
    setLoading(user?.id);
    const response = await followAgent({
      token: currentUser?.token,
      id: user?.id,
    });
    if (response) {
      if (response?.Following === "false") {
        dispatch(
          setZsphereData({
            ...zsphereData,
            followingIds: zsphereData?.followingIds?.filter(
              (elem) => elem + "" !== user?.id + ""
            ),
            following: {
              ...zsphereData?.following,
              count: zsphereData?.following?.count - 1,
              results: zsphereData?.following?.results?.filter(
                (elem) => elem?.id + "" !== user?.id + ""
              ),
            },
          })
        );
      } else if (response?.Following === "true") {
        dispatch(
          setZsphereData({
            ...zsphereData,
            followingIds: [...zsphereData?.followingIds, user?.id],
            following: {
              ...zsphereData?.following,
              count: zsphereData?.following?.count + 1,
              results: [...zsphereData?.following?.results, user],
            },
          })
        );
      }
      // console.log({ response });
    }

    setLoading(null);
  };
  const handleDebounceFn = async (query) => {
    setLoadingParent((prev) => ({ ...prev, loadingMembers: true }));
    const response = await fetchSearchedMembers({
      id: selectedGroup?.id,
      query,
    });
    if (response) setSearchedMembers(response);
    setLoadingParent((prev) => ({ ...prev, loadingMembers: false }));
  };
  // eslint-disable-next-line
  const debounceFn = useCallback(_debounce(handleDebounceFn, 1000), []);
  const handleModSearchInput = (e) => {
    setSearchQuery((prev) => ({ ...prev, members: e?.target?.value }));
    if (e?.target?.value?.length > 1) debounceFn(e?.target?.value);
  };
  // console.log({ users, searchQuery });

  return (
    <div className={classes.container}>
      <div style={{ padding: 16, display: "flex", flexDirection: "column" }}>
        <div className={classes.topContainer}>
          <p
            className={classes.label}
            style={{ color: darkMode ? "#0ed864" : "#134696" }}
          >
            {label}
            {admin ? ` ~ ${users?.count + 1}` : ""}
          </p>
          {showSearch && (
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
                value={searchQuery?.members || ""}
                onChange={handleModSearchInput}
              />
              <SearchIcon style={{ color: darkMode ? "#FFFFFF" : "#9DAFBD" }} />
            </div>
          )}
        </div>
        {admin && currentUser?.id !== groupAdmin?.id && (
          <GroupMemberCard
            member={groupAdmin}
            endButton={
              <CardEndButton
                setAnchorEl={setAnchorEl}
                setSelectedUser={setSelectedUser}
                handleFollow={handleFollow}
                user={groupAdmin}
                loading={loading === groupAdmin?.id}
              />
            }
          />
        )}
        {users?.results?.map((elem, index) => (
          <GroupMemberCard
            key={index}
            member={elem}
            endButton={
              <CardEndButton
                setAnchorEl={setAnchorEl}
                setSelectedUser={setSelectedUser}
                handleFollow={handleFollow}
                user={elem}
                loading={
                  loading === elem?.id ||
                  groupsApi?.addingModerator + "" === elem?.id + "" ||
                  groupsApi?.removingModerator + "" === elem?.id + "" ||
                  groupsApi?.removingMember + "" === elem?.id + ""
                }
              />
            }
          />
        ))}
        {users?.count === 0 && !showSearch && (
          <span className={classes.notFound}>No Moderators found</span>
        )}
        {users?.results?.length === 0 &&
          (searchQuery?.members?.length >= 0 || label === "Members") && (
            <span className={classes.notFound}>No members found</span>
          )}
        <MemberDetailsMenu
          menuAnchor={anchorEl}
          handleClose={() => setAnchorEl(null)}
          selectedUser={selectedUser}
        />
      </div>
      {seeAll && (
        <PaginationContainer
          paginationData={users}
          loading={groupsApi?.loadingPagination}
          paginationFunction={paginate}
          label={{
            title: "No more members to show",
          }}
          destination={GROUP_PAGINATION_TARGETS.MODERATORS}
        />
      )}
      {users?.count > 10 && (
        <Button
          fullWidth
          sx={{
            textTransform: "none",
            backgroundColor: "#F1F1F5",
            color: "#696974",
            fontSize: 14,
          }}
          onClick={() => setSeeAll(true)}
        >
          See All
        </Button>
      )}
    </div>
  );
};

export default GroupUserList;
