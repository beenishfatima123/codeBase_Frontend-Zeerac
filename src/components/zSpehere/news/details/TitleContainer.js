import React, { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { IconButton } from "@mui/material";
import { ReactComponent as Like } from "../../../../assets/icons/property/like.svg";
import { ReactComponent as Liked } from "../../../../assets/icons/property/likeFocused.svg";
import { ReactComponent as Share } from "../../../../assets/icons/property/share.svg";
import { ReactComponent as ShareFocused } from "../../../../assets/icons/property/shareFocused.svg";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  likeBlogStory,
  likeNewsStory,
} from "../../../../redux/slices/newsSlice";
import { toast } from "react-toastify";
import ShareModal from "../../../globalComponents/misc/ShareModal";

const useStyles = makeStyles(() => ({
  titleContainer: {
    margin: "16px 2%",
    display: "flex",
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    // marginTop: 455,
    borderBottom: "1px solid #C9C9C9",
    paddingBottom: 10,
  },
  propertyText: {
    fontSize: 18,
    color: "#0ED864",
  },
  title: {
    fontSize: 40,
    color: "#134696",
    fontWeight: "bold",
    margin: 0,
  },
  iconsContainer: {
    display: "flex",
    justifyContent: "space-between",
    width: 130,
  },
}));

/* takes story and displays its title along with like and share actions. */
const TitleContainer = ({ story, blog }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [newsActions, setNewsActions] = useState();
  const { newsApiInfo, blogsApiInfo } = useSelector((state) => state.news);
  const currentUser = useSelector((state) => state.auth.currentUser);

  // // console.log({ newsActions });
  /* if news like button is clicked, update liked value. */

  useEffect(() => {
    if (newsApiInfo?.likeResponse) {
      setNewsActions((prev) => ({
        ...prev,
        liked:
          newsApiInfo?.likeResponse?.message === "News liked" ? true : false,
      }));
    }
    if (blogsApiInfo?.bloglikeResponse) {
      setNewsActions((prev) => ({
        ...prev,
        liked:
          blogsApiInfo?.bloglikeResponse?.message === "Blog liked"
            ? true
            : false,
      }));
    }
  }, [newsApiInfo, blogsApiInfo]);
  const handleLike = () => {
    if (currentUser) {
      if (blog) {
        dispatch(
          likeBlogStory({
            values: { blog_id: story?.id },
            token: currentUser?.token,
          })
        );
      } else {
        dispatch(
          likeNewsStory({
            values: { news_id: story?.id },
            token: currentUser?.token,
          })
        );
      }
    } else
      toast.error("Please Login First", {
        position: toast.POSITION.TOP_CENTER,
        progressStyle: { backgroundColor: "#014493" },
      });
  };
  return (
    <div className={classes.titleContainer}>
      <div>
        <span className={classes.propertyText}>Property</span>
        <p className={classes.title}>{story?.title}</p>
      </div>
      <div className={classes.iconsContainer}>
        <IconButton
          onClick={() => {
            handleLike();
          }}
          sx={{ color: "black" }}
          disabled={newsApiInfo?.loadingLikeNews}
        >
          {newsActions?.liked ? (
            <Liked
              style={{
                height: 40,
                width: 40,
                fill: "black",
              }}
            />
          ) : (
            <Like
              style={{
                height: 40,
                width: 40,
                fill: "black",
              }}
            />
          )}
        </IconButton>
        {/* SHARE */}
        <IconButton
          onClick={() =>
            setNewsActions((prev) => ({ ...prev, shared: !prev?.shared }))
          }
        >
          {newsActions?.shared ? (
            <ShareFocused
              style={{
                height: 40,
                width: 40,
                fill: "black",
              }}
            />
          ) : (
            <Share
              style={{
                height: 40,
                width: 40,
                fill: "black",
              }}
            />
          )}
        </IconButton>
      </div>
      {story && newsActions?.shared && (
        <ShareModal
          open={newsActions?.shared}
          setOpen={(value) =>
            setNewsActions((prev) => ({ ...prev, shared: value }))
          }
          news={story}
        />
      )}
    </div>
  );
};

export default TitleContainer;
