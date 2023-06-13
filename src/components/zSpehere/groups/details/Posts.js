import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { getPostsFromGroups } from "../../../../redux/slices/postsSlice";
import PostSkeleton from "../../../loadingSkeletons/PostSkeleton";
import PostDetails from "../../feed/PostDetails";
import Post from "../../socialPost/Post";
import FinishedContainer from "../../feed/FinishedContainer";
import SuggestedGroupCard from "./SuggestedGroupCard";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { joinGroup } from "../../../../api/socialApi";
import ComponentLoader from "../../../globalComponents/ComponentLoader";
import {
  resetSendJoinRequest,
  sendJoinRequest,
  setAllGroups,
  setJoinedGroups,
} from "../../../../redux/slices/groupsSlice";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    margin: "10px 0px",
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
  },
  heading: {
    fontSize: 20,
    fontFamily: "medium",
    marginTop: 24,
    marginLeft: 16,
    marginBottom: 0,
  },
}));

/* Posts displays recent group posts on groups page. */
const Posts = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.auth);
  const { darkMode } = useSelector((state) => state.global);
  const { allPosts, allPostsApiInfo } = useSelector((state) => state.posts);
  const { allGroups, joinedGroups, groupsApi } = useSelector(
    (state) => state.groups
  );

  const [openDetailsContainer, setOpenDetailsContainer] = useState(null);
  const [loading, setLoading] = useState(false);
  //console.log({ allGroups });
  /*  */
  useEffect(() => {
    dispatch(getPostsFromGroups({ token: currentUser?.token }));
    // eslint-disable-next-line
  }, [currentUser]);

  /* upon clicking join group, pass group object to this method, it dispatches join request and navigates to that group page. */
  const handleGroupMembership = async (group) => {
    // console.log({ group, allGroups });
    if (currentUser) {
      setLoading(group?.id);
      const joinResponse = await joinGroup({
        id: group?.id,
        token: currentUser?.token,
        user: currentUser?.id,
      });
      if (joinResponse) {
        // console.log({ joinResponse });
        dispatch(
          setAllGroups({
            ...allGroups,
            count: allGroups?.count - 1,
            results: allGroups?.results?.filter(
              (elem) => elem?.id !== group?.id
            ),
          })
        );
        dispatch(
          setJoinedGroups(
            joinedGroups
              ? {
                  ...joinedGroups,
                  count: joinedGroups?.count + 1,
                  results: [
                    ...joinedGroups?.results,
                    {
                      ...group,
                      members: [...group?.members, currentUser?.id],
                    },
                  ],
                }
              : {
                  count: 1,
                  results: [
                    {
                      ...group,
                      members: [...group?.members, currentUser?.id],
                    },
                  ],
                }
          )
        );
        toast.success(`You are now a member of ${group?.name}`, {
          position: toast.POSITION.TOP_CENTER,
          hideProgressBar: true,
        });
        navigate(`/zSphere/Groups/${group?.id}`);
      } else {
        // console.log({ error: joinResponse });
        toast.error("Something went wrong, please try again later", {
          position: toast.POSITION.BOTTOM_RIGHT,
          hideProgressBar: true,
        });
      }
      setLoading(false);
    } else
      toast.error("You need to login first", {
        position: toast.POSITION.BOTTOM_RIGHT,
        hideProgressBar: true,
      });
  };

  /* read response from api and display message in toast. */
  useEffect(() => {
    if (groupsApi?.responseSendJoinRequest) {
      toast.success("Request has been sent to join this group", {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
      });
      dispatch(resetSendJoinRequest());
    }
    // eslint-disable-next-line
  }, [groupsApi?.responseSendJoinRequest]);
  /* read response from api and display message in toast. */
  useEffect(() => {
    if (groupsApi?.errorSendJoinRequest) {
      toast.error("You already requested to join this group", {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
      });
      dispatch(resetSendJoinRequest());
    }
    // eslint-disable-next-line
  }, [groupsApi?.errorSendJoinRequest]);
  return (
    <>
      <Grid container justifyContent={"center"} spacing={2}>
        <Grid item sm={12} md={12}>
          <p
            className={classes.heading}
            style={{ color: darkMode ? "#0ed864" : "#134696" }}
          >
            Suggested Groups
          </p>
        </Grid>
        {allGroups?.results?.map(
          (elem, index) =>
            index < 2 && (
              <Grid item xs={11} sm={6} lg={6} key={index}>
                {loading === elem?.id ? (
                  <ComponentLoader
                    customImageStyle={{ width: "100%", height: 300 }}
                  />
                ) : (
                  <SuggestedGroupCard
                    privateGroup={elem?.visibility === "Private" ? true : false}
                    groupPhoto={elem?.photo}
                    groupName={elem?.name}
                    members={elem?.members?.length + elem?.moderators?.length}
                    posts={elem?.posts_count}
                    events={elem?.events_count}
                    viewClick={() => navigate(`/zSphere/Groups/${elem?.id}`)}
                    joinClick={() => handleGroupMembership(elem)}
                    sendRequestClick={() => {
                      if (currentUser) {
                        let formData = new FormData();
                        formData.append("group", elem?.id);
                        dispatch(
                          sendJoinRequest({
                            formData,
                            token: currentUser?.token,
                          })
                        );
                        dispatch(
                          setAllGroups({
                            ...allGroups,
                            count: allGroups?.count - 1,
                            results: allGroups?.results?.filter(
                              (_elem) => _elem?.id !== elem?.id
                            ),
                          })
                        );
                      } else
                        toast.error("You need to login first", {
                          position: toast.POSITION.BOTTOM_RIGHT,
                          hideProgressBar: true,
                        });
                    }}
                  />
                )}
              </Grid>
            )
        )}
      </Grid>
      <div className={classes.container}>
        <p
          className={classes.heading}
          style={{ color: darkMode ? "#0ed864" : "#134696" }}
        >
          Recent Group Activity
        </p>
        {allPostsApiInfo?.loadingPostsFromGroups ? (
          <PostSkeleton />
        ) : (
          <>
            {openDetailsContainer && (
              <PostDetails
                isOpen={Boolean(openDetailsContainer)}
                postId={openDetailsContainer}
                handleClose={() => setOpenDetailsContainer(null)}
              />
            )}
            {allPosts?.results?.map((elem, index) => (
              <Post
                post={elem}
                key={index}
                setOpenDetailsContainer={setOpenDetailsContainer}
              />
            ))}
            <FinishedContainer posts={allPosts} label1={"No Group posts"} />
          </>
        )}
      </div>
    </>
  );
};

export default Posts;
