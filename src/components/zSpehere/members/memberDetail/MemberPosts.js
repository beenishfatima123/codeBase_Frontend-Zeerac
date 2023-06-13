import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostSkeleton from "../../../loadingSkeletons/PostSkeleton";
import Post from "../../socialPost/Post";
import { getUserPosts } from "../../../../redux/slices/postsSlice";
import { useParams } from "react-router";
import FinishedMemberPostsContainer from "./FinishedMemberPostsContainer";
import PostDetails from "../../feed/PostDetails";

/* Posts made by a member displayed on the member detailed container. */
const MemberPosts = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const { userPosts, allPostsApiInfo } = useSelector((state) => state.posts);
  const { currentUser } = useSelector((state) => state.auth);
  // console.log({ userPosts, currentUser });

  const [openDetailsContainer, setOpenDetailsContainer] = useState(null);
  /* Get all posts made by the user */
  useEffect(() => {
    dispatch(
      getUserPosts({
        token: currentUser?.token,
        id: params?.id,
      })
    );
    // eslint-disable-next-line
  }, [params?.id, currentUser]);

  return (
    <div>
      {allPostsApiInfo?.loadingUserPost ? (
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
          {userPosts?.results?.map((elem, index) => (
            <Post
              post={elem}
              key={index}
              setOpenDetailsContainer={setOpenDetailsContainer}
            />
          ))}
          <FinishedMemberPostsContainer posts={userPosts} />
        </>
      )}
    </div>
  );
};

export default MemberPosts;
