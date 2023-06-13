import React, { useMemo, useState } from "react";
import { makeStyles } from "@mui/styles";
import defaultAvatar from "../../../assets/defaultAssets/defaultAgent1.png";
import { Avatar, IconButton } from "@mui/material";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PostOptionsMenu from "./PostOprionsMenu";
import ConfirmModal from "../../settingComponents/myListings/ConfirmModal";
import EditPostModal from "../feed/postModal/EditPostModal";
import ShareModal from "../../globalComponents/misc/ShareModal";
import { deletePost } from "../../../redux/slices/postsSlice";
import { useNavigate } from "react-router";
const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  content: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  ventricle: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 10,
  },
  name: {
    fontSize: 18,
    marginBottom: 5,
    textTransform: "capitalize",
    cursor: "pointer",
  },
  time: {
    fontSize: 12,
  },
}));

/* Displaying information of post's author with name and avatar. */
const AuthorInfo = ({ post }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openShareModal, setOpenShareModal] = useState(false);

  const author = useMemo(() => post?.user, [post]);
  const { darkMode } = useSelector((state) => state.global);
  const { currentUser } = useSelector((state) => state.auth);

  /* when delete button is clicked by the user who made the post, dispath deletePost to the slice and close Modal. */
  const handleDelete = () => {
    // console.log({ post });
    setAnchorEl(null);
    dispatch(deletePost({ id: post?.id, token: currentUser?.token }));
    setOpenConfirmModal(false);
  };

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <Avatar
          alt={author?.full_name}
          src={` ${author?.photo}` || defaultAvatar}
          sx={{ width: 40, height: 40, fontSize: 22 }}
        />
        <div className={classes.ventricle}>
          <span
            className={classes.name}
            style={{
              color: darkMode ? "#0ED864" : "#134696",
            }}
            onClick={() => navigate(`/zSphere/user/${author?.id}`)}
          >
            {author?.full_name}
          </span>
          <span
            className={classes.time}
            style={{
              color: darkMode ? "#fff" : "#6B7B88",
            }}
          >
            {moment(post?.created_at)?.add(5, "h")?.from(moment())}
          </span>
        </div>
      </div>
      <IconButton onClick={(event) => setAnchorEl(event.currentTarget)}>
        <MoreHorizIcon />
      </IconButton>

      <PostOptionsMenu
        anchorEl={anchorEl}
        handleClose={() => setAnchorEl(null)}
        handleAfterClick={() => setAnchorEl(null)}
        post={post}
        setOpenConfirmModal={setOpenConfirmModal}
        setOpenEditModal={setOpenEditModal}
        setOpenShareModal={setOpenShareModal}
      />
      {openConfirmModal && (
        <ConfirmModal
          open={openConfirmModal}
          setOpen={setOpenConfirmModal}
          title="Are you sure you want to remove this post"
          handleConfirm={handleDelete}
        />
      )}
      {openEditModal && (
        <EditPostModal
          isOpen={openEditModal}
          setOpen={setOpenEditModal}
          post={post}
          closeParent={() => setAnchorEl(null)}
        />
      )}
      {openShareModal && (
        <ShareModal
          open={openShareModal}
          setOpen={setOpenShareModal}
          post={post}
        />
      )}
    </div>
  );
};

export default AuthorInfo;
