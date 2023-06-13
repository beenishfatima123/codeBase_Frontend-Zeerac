import React, { useEffect, useMemo, useState } from "react";
import { makeStyles } from "@mui/styles";
import { CONTENT_WIDTH } from "../../../utils/constants";
import GroupList from "./GroupList";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllGroups,
  getJoinedGroups,
  getMyGroups,
} from "../../../redux/slices/groupsSlice";
import { useWindowDims } from "../../../utils/useWindowDims";
import GroupTabs from "./GroupTabs";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DetailsContainer from "./details/DetailsContainer";
import CreateGroup from "./modals/CreateGroup";
import { useParams } from "react-router-dom";
import useDebounceSearch from "../../../utils/hooks/useDebounceSearch";
import { searchGroups } from "../../../api/socialApi";
import SearchResults from "./SearchResults";

const TOP_TABS = [
  "group_posts",
  "your_groups",
  "joined_groups",
  "suggested_groups",
];
const addBtnSx = {
  backgroundColor: "#CAF4F4",
  textTransform: "none",
  borderRadius: "8px",
  minHeight: "50px",
  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
  color: "#134696",
  fontSize: 14,
  fontWeight: "bold",
  fontFamily: "light",
};
const useStyles = makeStyles(() => ({
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    margin: "20px 0px",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: CONTENT_WIDTH,
    maxWidth: "98%",
    alignSelf: "center",
  },
  leftPanel: {
    display: "flex",
    flexDirection: "column",
    maxWidth: 350,
    marginRight: 10,
  },
  rightPanel: {
    display: "flex",
    flex: 1,
    marginLeft: 10,
    flexDirection: "column",
  },

  "@media (max-width: 850px)": {
    container: {
      flexDirection: "column",
    },
    leftPanel: {
      flexDirection: "row",
      maxWidth: "100%",
      flex: 1,
      marginRight: 0,
      backgroundColor: "#fff",
      boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
      borderRadius: 5,
    },
    rightPanel: {
      marginLeft: 0,
    },
  },
}));

/* renders the main groups page. */
const GroupsContainer = () => {
  const classes = useStyles();
  const params = useParams();
  const dispatch = useDispatch();
  const { width } = useWindowDims();

  const currentUser = useSelector((state) => state.auth.currentUser);
  const { allGroups, myGroups, joinedGroups, groupSearch } = useSelector(
    (state) => state.groups
  );
  const [selectedTab, setSelectedTab] = useState(TOP_TABS[0]);
  const [openCreateModal, setOpenCreateModal] = useState(false);

  const { loading, searchResult } = useDebounceSearch(
    groupSearch,
    searchGroups
  );

  // useEffect(() => {
  //   console.log({ groupSearch, loading, searchResult });
  // }, [groupSearch, loading, searchResult]);
  /* set selected tab from params. */
  useEffect(() => {
    if (params?.id) setSelectedTab(TOP_TABS[0]);
    // eslint-disable-next-line
  }, [params?.id]);

  /* get all groups from store using token. */
  useEffect(() => {
    dispatch(
      getAllGroups({
        token: currentUser?.token,
      })
    );
    // eslint-disable-next-line
  }, []);

  /* get all joined and personally created groups for user. */
  useEffect(() => {
    if (currentUser)
      dispatch(
        getJoinedGroups({
          token: currentUser?.token,
        })
      );
    dispatch(
      getMyGroups({
        token: currentUser?.token,
      })
    );
    // eslint-disable-next-line
  }, [currentUser]);

  /* leftContent contains create group action, user's created groups, user's joined groups and suggested groups. */
  const renderLeftContent = useMemo(() => {
    // console.log({ allGroups, myGroups, joinedGroups });
    return (
      <>
        <Button
          fullWidth
          sx={addBtnSx}
          startIcon={<AddIcon />}
          onClick={() => setOpenCreateModal(true)}
        >
          Create New Group
        </Button>
        {currentUser && (
          <>
            <GroupList
              label={TOP_TABS[1]}
              setSelectedTab={setSelectedTab}
              groups={myGroups}
            />
            <GroupList
              label={TOP_TABS[2]}
              setSelectedTab={setSelectedTab}
              groups={joinedGroups}
            />
          </>
        )}

        <GroupList
          label={TOP_TABS[3]}
          setSelectedTab={setSelectedTab}
          groups={allGroups}
        />
      </>
    );
  }, [allGroups, myGroups, joinedGroups, currentUser]);

  /* right content contains dynamically changes on tab selected on left content. It can be suggested groups, group detailed view and recent group activity. */
  const renderRightContent = useMemo(() => {
    switch (selectedTab) {
      case TOP_TABS[0]:
        return <DetailsContainer />;
      case TOP_TABS[1]:
        return (
          <GroupList
            full
            label={TOP_TABS[1]}
            setSelectedTab={setSelectedTab}
            groups={myGroups}
          />
        );
      case TOP_TABS[2]:
        return (
          <GroupList
            full
            label={TOP_TABS[2]}
            setSelectedTab={setSelectedTab}
            groups={joinedGroups}
          />
        );
      case TOP_TABS[3]:
        return (
          <GroupList
            full
            label={TOP_TABS[3]}
            setSelectedTab={setSelectedTab}
            groups={allGroups}
          />
        );
      default:
        return <DetailsContainer />;
    }
  }, [selectedTab, myGroups, joinedGroups, allGroups]);

  return (
    <div className={classes.mainContainer}>
      <div className={classes.container}>
        {groupSearch?.length > 2 ? (
          <SearchResults loading={loading} searchResults={searchResult} />
        ) : (
          <>
            <div className={classes.leftPanel}>
              {width < 850 ? (
                <GroupTabs
                  tabs={TOP_TABS}
                  tab={selectedTab}
                  setTab={setSelectedTab}
                />
              ) : (
                <>{renderLeftContent}</>
              )}
            </div>
            <div className={classes.rightPanel}>{renderRightContent}</div>
          </>
        )}
      </div>
      {openCreateModal && (
        <CreateGroup isOpen={openCreateModal} setOpen={setOpenCreateModal} />
      )}
    </div>
  );
};

export default GroupsContainer;
