import React, { useEffect, useMemo, useState } from "react";
import TopHeader from "./TopHeader";
import { CONTENT_WIDTH } from "../../../../utils/constants";
import About from "./About";
import FollowList from "./FollowList";
import MemberPosts from "./MemberPosts";
import { makeStyles } from "@mui/styles";
import { useWindowDims } from "../../../../utils/useWindowDims";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import CreatePostModal from "../../feed/postModal/CreatePostModal";
import { useParams } from "react-router-dom";
import {
  getFollowers,
  getFollowing,
  getSelectedMember,
  setSelectedMember,
} from "../../../../redux/slices/zSphereMemberSlice";
import ComponentLoader from "../../../globalComponents/ComponentLoader";
import EditProfileModal from "../EditProfile/EditProfileModal";

const TOP_TABS = ["Posts", "About", "Followers", "Following"];
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
    maxWidth: "95%",
    alignSelf: "center",
  },
  leftPanel: {
    display: "flex",
    flexDirection: "column",
    maxWidth: 300,
    marginRight: 10,
  },
  rightPanel: {
    display: "flex",
    flex: 1,
    marginLeft: 10,
    flexDirection: "column",
  },
  createPostContainer: {
    display: "flex",
    flexDirection: "column",
    padding: "10px 20px",
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    borderRadius: 8,
    marginTop: 20,
  },
  createPostTitle: {
    fontSize: 18,
    fontFamily: "medium",
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

/* Detailed profile view for every member with header, about, following, follower sections. */
const MemberDetailContainer = () => {
  const classes = useStyles();
  const params = useParams();
  const dispatch = useDispatch();

  const { width } = useWindowDims();

  const { zSphereMembersData, zSphereMembersApi, selectedMember } = useSelector(
    (state) => state.zSphereMembers
  );
  const { currentUser, zsphereData } = useSelector((state) => state.auth);
  const { darkMode } = useSelector((state) => state.global);

  const [selectedTab, setSelectedTab] = useState(TOP_TABS[0]);
  const [editProfile, setEditProfile] = useState(false);

  const [showMore, setShowMore] = useState({});
  const [createPost, setCreatePost] = useState(false);
  // console.log({ zSphereMembersData });
  useEffect(() => {
    if (params?.id + "" !== currentUser?.id + "") {
      dispatch(getSelectedMember({ id: params?.id }));
    } else dispatch(setSelectedMember(currentUser));
    // eslint-disable-next-line
  }, [params?.id, currentUser]);

  useEffect(() => {
    if (selectedMember) {
      // console.log({ selectedMember });
      dispatch(
        getFollowers({
          id: selectedMember?.id,
        })
      );
      dispatch(
        getFollowing({
          id: selectedMember?.id,
        })
      );
    }
    // eslint-disable-next-line
  }, [selectedMember]);

  const followers = useMemo(() => {
    // console.log({
    //   zSphereMembersData,
    //   currentUser,
    //   params,
    //   zsphereData,
    // });
    if (params?.id + "" === currentUser?.id + "") {
      if (zsphereData?.followers?.results?.length > 3)
        return {
          ...zsphereData?.followers,
          results: zsphereData?.followers?.results?.slice(0, 3),
        };
      else return zsphereData?.followers;
    } else {
      if (zSphereMembersData?.followers?.results?.length > 3)
        return {
          ...zSphereMembersData?.followers,
          results: zSphereMembersData?.followers?.results?.slice(0, 3),
        };
      else return zSphereMembersData?.followers;
    }
    // eslint-disable-next-line
  }, [
    zSphereMembersData?.followers,
    currentUser?.id,
    params?.id,
    zsphereData?.followers,
  ]);
  const following = useMemo(() => {
    if (zSphereMembersData?.following?.results?.length > 3)
      return {
        ...zSphereMembersData?.following,
        results: zSphereMembersData?.following?.results?.slice(0, 3),
      };
    else return zSphereMembersData?.following;
    // eslint-disable-next-line
  }, [zSphereMembersData?.following]);

  const renderSmContent = useMemo(() => {
    switch (selectedTab) {
      case TOP_TABS[0]:
        return <MemberPosts />;
      case TOP_TABS[1]:
        return <About openEdit={handleOpenEdit} />;
      case TOP_TABS[2]:
        return (
          <FollowList
            label={"Followers"}
            setShowMore={setShowMore}
            users={
              currentUser?.id + "" === params?.id + ""
                ? zsphereData?.followers
                : zSphereMembersData?.followers
            }
            full
          />
        );
      case TOP_TABS[3]:
        return (
          <FollowList
            label={"Following"}
            setShowMore={setShowMore}
            users={zSphereMembersData?.following}
            following
            full
          />
        );

      default:
        return <MemberPosts />;
    }
  }, [
    selectedTab,
    currentUser?.id,
    params?.id,
    zsphereData,
    zSphereMembersData,
  ]);
  const renderContent = useMemo(() => {
    if (showMore?.Followers)
      return (
        <FollowList
          label={"Followers"}
          setShowMore={setShowMore}
          users={
            currentUser?.id + "" === params?.id + ""
              ? zsphereData?.followers
              : zSphereMembersData?.followers
          }
          full
        />
      );
    else if (showMore?.Following)
      return (
        <FollowList
          label={"Following"}
          setShowMore={setShowMore}
          users={zSphereMembersData?.following}
          following
          full
        />
      );
    else return <MemberPosts />;
  }, [showMore, currentUser?.id, params?.id, zsphereData, zSphereMembersData]);

  const handleOpenEdit = () => {
    setEditProfile(true);
  };
  return (
    <div className={classes.mainContainer}>
      {zSphereMembersApi?.loadingSelectedMember ? (
        <ComponentLoader />
      ) : (
        <>
          <EditProfileModal isOpen={editProfile} setOpen={setEditProfile} />
          <TopHeader openEdit={handleOpenEdit} />
          <div className={classes.container}>
            <div className={classes.leftPanel}>
              {width > 850 ? (
                <>
                  <About openEdit={handleOpenEdit} />
                  <FollowList
                    label={"Followers"}
                    count={zSphereMembersData?.followers?.results?.length}
                    setShowMore={setShowMore}
                    users={followers}
                  />
                  <FollowList
                    label={"Following"}
                    count={zSphereMembersData?.following?.results?.length}
                    setShowMore={setShowMore}
                    users={following}
                    following
                  />
                </>
              ) : (
                <>
                  {TOP_TABS?.map((elem, index) => (
                    <Button
                      sx={{
                        color: "#134696",
                        textTransform: "none",
                        fontSize: 16,
                        padding: "8px 16px",
                        textDecorationLine:
                          selectedTab === elem ? "underline" : "none",
                      }}
                      key={index}
                      onClick={() => setSelectedTab(elem)}
                    >
                      {elem}
                    </Button>
                  ))}
                </>
              )}
            </div>
            <div className={classes.rightPanel}>
              <div
                className={classes.createPostContainer}
                style={{
                  backgroundColor: darkMode ? "#2f2f33" : "#fff",
                }}
              >
                <span
                  className={classes.createPostTitle}
                  style={{
                    color: darkMode ? "#0ed864" : "#134696",
                  }}
                >
                  Post
                </span>
                <Button
                  onClick={() => setCreatePost(true)}
                  sx={{
                    border: "1px solid lightGray",
                    borderRadius: 5,
                    mt: 1,
                    color: darkMode ? "#fff" : "#6B7B88",
                    fontSize: 14,
                    textTransform: "none",
                    display: "flex",
                    justifyContent: "flex-start",
                    padding: "4px 16px",
                  }}
                >
                  Whats on your mind, {currentUser?.first_name}?
                </Button>
              </div>
              {width > 850 ? renderContent : renderSmContent}
            </div>
          </div>
          {createPost && (
            <CreatePostModal isOpen={createPost} setOpen={setCreatePost} />
          )}
        </>
      )}
    </div>
  );
};

export default MemberDetailContainer;
