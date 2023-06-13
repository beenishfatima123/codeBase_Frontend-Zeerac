import React from "react";
import { makeStyles } from "@mui/styles";
import AuthorInfo from "./AuthorInfo";
import ReactionsContainer from "./ReactionsContainer";
import { useSelector } from "react-redux";
import CommentCard from "./comments/CommentCard";
import CommentSkeleton from "../../loadingSkeletons/CommentsSkeleton";
import PostImages from "./PostImages";
import PostSkeleton from "../../loadingSkeletons/PostSkeleton";
import FinishedCommentsContainer from "../feed/FinishedCommentsContainer";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    marginTop: 20,
    backgroundColor: "white",
    padding: "10px 20px",
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    borderRadius: 8,
  },
  description: {
    fontSize: 16,
    color: "#6B7B88",
    margin: "20px 10px",
  },
  image: {
    width: "100%",
    maxHeight: 450,
    alignSelf: "center",
  },
  commentsContainer: {
    display: "flex",
    flexDirection: "column",
    transition: "height 0.5s",
  },
  "@media (max-width: 1024px)": {
    container: {
      flexDirection: "column",
    },
  },
}));

/* Post takes post, commentsa dn details and displays the post in form of card on the feed. It also renders the comments on the post. */
const Post = ({ post, showAllComments, details, setOpenDetailsContainer }) => {
  const classes = useStyles();
  const { darkMode } = useSelector((state) => state.global);
  const { allPostsApiInfo } = useSelector((state) => state.posts);
  return (
    <div
      className={classes.container}
      style={{
        backgroundColor: darkMode ? "#2f2f33" : "#fff",
      }}
    >
      {`${allPostsApiInfo?.loadingDelete}` === `${post?.id}` ? (
        <PostSkeleton />
      ) : (
        <>
          <AuthorInfo post={post} />
          <span
            className={classes.description}
            style={{
              color: darkMode ? "#fff" : "#6B7B88",
            }}
          >
            {post?.description || ""}
          </span>
          {post?.images?.length > 0 && <PostImages images={post?.images} />}
          <ReactionsContainer
            post={post}
            details={details}
            setOpenDetailsContainer={setOpenDetailsContainer}
          />
          {showAllComments ? (
            <>
              {allPostsApiInfo?.loadingComments === `${post?.id}` ? (
                <CommentSkeleton />
              ) : (
                <div className={classes.commentsContainer}>
                  {post?.comments &&
                    post?.fetchedComments?.results?.length <= 0 && (
                      <CommentCard
                        comment={post?.comments}
                        details={details}
                        post={post}
                      />
                    )}
                  {post?.fetchedComments?.results?.map((elem, index) => (
                    <CommentCard
                      key={index}
                      comment={elem}
                      details={details}
                      post={post}
                    />
                  ))}
                  {post?.fetchedComments?.count > 10 && (
                    <FinishedCommentsContainer />
                  )}
                </div>
              )}
            </>
          ) : (
            <>
              {post?.comments && (
                <CommentCard
                  comment={post?.comments}
                  details={details}
                  post={post}
                />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Post;
