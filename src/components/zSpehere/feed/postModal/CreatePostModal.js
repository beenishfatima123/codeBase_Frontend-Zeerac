import React, { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { Button, Modal } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ComponentLoader from "../../../globalComponents/ComponentLoader";
import LoginContainer from "../../../loginComponents/LoginContainer";
import { toast } from "react-toastify";
import {
  createPost,
  resetCreateApi,
} from "../../../../redux/slices/postsSlice";

import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import AddIcon from "@mui/icons-material/Add";
import useApi from "../../../../utils/hooks/useApi";
import Top from "./Top";
import User from "./User";
import ImagePicker from "./ImagePicker";

const buttonSx = {
  border: "1px solid lightGray",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  textTransform: "none",
  fontSize: 14,
};
const createButtonSx = {
  textTransform: "none",
  backgroundColor: "#0ED864",
  color: "#134696",
  borderRadius: 10,
  minWidth: 125,
  fontSize: 16,
  fontFamily: "medium",
  pl: 2,
  pr: 2,
};
const useStyles = makeStyles(() => ({
  container: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: 5,
    maxHeight: "90%",
    maxWidth: "95%",
    overflowY: "scroll",
    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
    display: "flex",
    flex: 1,
    flexDirection: "column",
  },
  topContainer: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 0px",
    borderBottom: "1px solid lightGray",
  },
  heading: {
    color: "#014493",
    textAlign: "center",
    fontSize: 18,
    fontFamily: "heavy",
  },
  contentContainer: {
    display: "flex !important",
    flex: 1,
    padding: 20,
    flexDirection: "column",
  },

  textContainer: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  subText: {
    color: "#014493",
    textAlign: "center",
    fontSize: 16,
    fontWeight: 600,
    width: "100%",
    margin: "10px 0px",
  },
  buttonContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  searchContainer: {
    display: "flex",
    alignItems: "center",
    padding: "8px 12px",
    borderRadius: 30,
    backgroundColor: "#F0F2F5",
    flex: 1,
    height: 40,
    margin: 10,
  },
  input: {
    display: "flex",
    flex: 1,
    border: "none",
    backgroundColor: "#F0F2F5",
    fontSize: 16,
    "&:focus": {
      outline: "none",
    },
  },
  profileMain: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 200,
    position: "relative",
  },
  postImg: {
    margin: "auto",
    width: "100%",
    height: 170,
    borderRadius: 8,
    border: "2px solid #014493",
    marginTop: 10,
    marginBottom: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    objectFit: "cover",
    position: "relative",
  },
  fileUpload: {
    position: "absolute",
    color: "#fff",
    backgroundColor: "#014493",
    borderRadius: "50%",
    cursor: "pointer",
    padding: 1,
  },
  noResults: {
    color: "#014493",
    fontFamily: "Poopins-Bold",
    fontSize: 30,
    textAlign: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
}));

/* create post button on zsphere feed leads to this modal which takes isOpen, group and CEO */
const CreatePostModal = ({ isOpen, setOpen, group, CEO }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [postData, setPostData] = useState({
    visibility: "Public",
  });
  const [showImagePicker, setShowImagePicker] = useState(false);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const { createPostApiInfo } = useSelector((state) => state.posts);
  const { darkMode } = useSelector((state) => state.global);

  useApi(
    createPostApiInfo.error,
    createPostApiInfo?.response,
    "Post Created",
    resetCreateApi
  );

  /* close model on successful post. */
  useEffect(() => {
    if (createPostApiInfo?.response) setOpen(false);

    // eslint-disable-next-line
  }, [createPostApiInfo?.response]);

  /* take prop event and update the post data with new attribute, if image is added, append and if previously no image existed, then create. */
  const handleChange = (prop) => (event) => {
    setPostData((prev) => ({
      ...prev,
      [prop]:
        prop === "images"
          ? prev?.[prop]?.length > 0
            ? [...prev?.[prop], ...event?.target?.value]
            : event?.target?.value
          : event?.target?.value,
    }));
  };

  /* on submitting post, validate it and dispatch if successful otherwise display error in toast. */
  const handleCreatePost = () => {
    const invalid = validate(postData);
    // console.log({ postData, invalid });
    if (invalid) {
      toast.error(invalid, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else {
      dispatch(
        createPost({
          values: getPostFormData(),
          token: currentUser?.token,
        })
      );
      setPostData();
    }
  };

  /* validate if the user had created any data or not, if not, throw error. */
  const validate = (data) => {
    if (
      (!data?.images || data?.images?.length < 1) &&
      (!data?.title || data?.title?.trim()?.length < 1)
    )
      return "either a post photo or title is required";
    else return null;
  };

  /* create form data from the entered post data and return. */
  const getPostFormData = () => {
    const formData = new FormData();
    if (postData?.title) formData?.append("description", postData?.title);
    if (group) formData?.append("group", group);
    formData?.append("visibility", postData?.visibility);
    if (CEO) formData?.append("ceo_club", true);
    if (CEO && currentUser?.user_type !== 3) {
      formData?.append("is_sponsored", true);
    }
    postData?.images?.forEach((element) => {
      formData?.append("image", element);
    });
    return formData;
  };

  return (
    <Modal
      open={isOpen}
      onClose={() => setOpen((prev) => !prev)}
      disableEnforceFocus
      disableAutoFocus
      disablePortal
    >
      <div
        className={classes.container}
        style={{
          backgroundColor: darkMode ? "#212124" : "#fff",
          width: currentUser ? 500 : "",
        }}
      >
        {currentUser ? (
          <>
            {createPostApiInfo?.loading ? (
              <ComponentLoader />
            ) : (
              <>
                <Top handleClose={() => setOpen(false)} />

                <div className={classes.contentContainer}>
                  <User
                    value={postData?.visibility || ""}
                    onChange={handleChange("visibility")}
                  />
                  <div className={classes.textContainer}>
                    <textarea
                      className="post-creation-input"
                      rows={showImagePicker ? "2" : "5"}
                      placeholder={"Whats on your mind"}
                      value={postData?.title || ""}
                      onChange={handleChange("title")}
                      style={{
                        color: darkMode ? "#fff" : "#000",
                      }}
                    />
                  </div>
                  {showImagePicker && (
                    <ImagePicker
                      images={postData?.images}
                      onChange={handleChange}
                      handleClose={() => setShowImagePicker(false)}
                      setPostData={setPostData}
                    />
                  )}

                  <Button
                    sx={{ ...buttonSx, color: darkMode ? "#fff" : "#000" }}
                    fullWidth
                    onClick={() => setShowImagePicker(true)}
                  >
                    <span>Add to your post</span>
                    <InsertPhotoIcon
                      sx={{ color: darkMode ? "#fff" : "#000" }}
                    />
                  </Button>

                  <div className={classes.buttonContainer}>
                    <Button
                      sx={createButtonSx}
                      startIcon={<AddIcon />}
                      onClick={handleCreatePost}
                    >
                      Create Post
                    </Button>
                  </div>
                </div>
              </>
            )}
          </>
        ) : (
          <LoginContainer
            style={{ backgroundColor: "white", alignSelf: "center" }}
          />
        )}
      </div>
    </Modal>
  );
};

export default CreatePostModal;
