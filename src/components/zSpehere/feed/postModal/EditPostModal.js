import React, { useEffect, useMemo } from "react";
import { makeStyles } from "@mui/styles";
import { Button, Modal } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoginContainer from "../../../loginComponents/LoginContainer";
import { toast } from "react-toastify";
import { editPost, setAllApiInfo } from "../../../../redux/slices/postsSlice";

import AddIcon from "@mui/icons-material/Add";
import Top from "./Top";
import User from "./User";
import { IconButton } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import {
  MAX_IMAGE_COUNT,
  MAX_IMAGE_FILE_NAME,
  MAX_IMAGE_SIZE,
} from "../../../../utils/constants";
import CancelIcon from "@mui/icons-material/Cancel";
import PostSkeleton from "../../../loadingSkeletons/PostSkeleton";
import useResponseStatus from "../../../../utils/hooks/useResponeStatus";

const buttonSx = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  textTransform: "none",
  flex: 1,
  borderRadius: 0,
  zIndex: 10,
};
const imageCrossButton = {
  position: "absolute",
  top: 0,
  right: 0,
  p: 0,
  zIndex: 20,
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
  discardedText: {
    fontSize: 12,
    color: "red",
    margin: "10px 0px",
  },
}));

const EditPostModal = ({ isOpen, setOpen, post, closeParent }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [postData, setPostData] = useState({
    deletedImages: [],
    newImages: [],
  });
  const [discardedFiles, setDiscardedFiles] = useState();

  const currentUser = useSelector((state) => state.auth.currentUser);
  const { allPostsApiInfo } = useSelector((state) => state.posts);
  const { darkMode } = useSelector((state) => state.global);
  const filesLength = useMemo(() => {
    // console.log({ postData });

    return (postData?.newImages?.length || 0) + (postData?.images?.length || 0);
  }, [postData]);

  /* if anything in the post is updated, setPostData to new data. */
  useEffect(() => {
    setPostData((prev) => ({
      ...prev,
      title: post?.description,
      images: post?.images,
      visibility: post?.visibility,
    }));
  }, [post]);

  /* set post data to changed value from event target. */
  const handleChange = (prop) => (event) => {
    setPostData((prev) => ({
      ...prev,
      [prop]: event?.target?.value,
    }));
  };

  /* on post submit, validate and dispatch, if invalid, throw error in toast. */
  const handleEditPost = () => {
    const invalid = validate();
    if (invalid) {
      toast.error(invalid, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else {
      dispatch(
        editPost({
          id: post?.id,
          values: getPostFormData(),
          token: currentUser?.token,
        })
      );
    }
  };

  /* validate if the user had created any data or not, if not, throw error. */
  const validate = () => {
    if (
      (!postData?.images || postData?.images?.length < 1) &&
      (!postData?.title || postData?.title?.length < 1) &&
      (!postData?.newImages || postData?.newImages?.length < 1) &&
      (!postData?.deletedImages || postData?.deletedImages?.length < 1)
    )
      return "either a post photo or title is required";
    else return null;
  };

  /* create form data from the entered post data and return. */
  const getPostFormData = () => {
    const formData = new FormData();
    formData?.append("description", postData?.title);
    formData?.append("visibility", postData?.visibility);
    let toDelete = [];
    postData?.deletedImages?.forEach((element) => {
      toDelete?.push(element?.id);
    });
    formData?.append("images_to_delete", JSON.stringify(toDelete));
    postData?.newImages?.forEach((element) => {
      formData?.append("image", element);
    });
    return formData;
  };

  /* on error response, dispatch null edit response to slice. */
  const errorCallback = () => {
    dispatch(setAllApiInfo({ ...allPostsApiInfo, editResponseStatus: null }));
  };

  /* on success response, dispatch null edit response to slice and close modal. */
  const successCallback = () => {
    dispatch(setAllApiInfo({ ...allPostsApiInfo, editResponseStatus: null }));
    setOpen(false);
    closeParent();
  };
  useResponseStatus(
    allPostsApiInfo?.editResponseStatus,
    "Post updated",
    allPostsApiInfo?.editError,
    errorCallback,
    successCallback
  );

  /* on image insert, get it from event and valiate its size and dispatch if validated. */
  const handleImageInput = (event) => {
    const limit =
      MAX_IMAGE_COUNT -
      ((postData?.newImages?.length || 0) + (postData?.images?.length || 0));

    setDiscardedFiles(
      Array.from(event?.target?.files).filter(
        (file) => file.size / 1024 ** 2 > MAX_IMAGE_SIZE
      )
    );
    setPostData((prev) => ({
      ...prev,
      newImages:
        prev?.newImages?.length > 0
          ? [
              ...prev?.newImages,
              ...Array.from(event?.target?.files)
                .filter(
                  (file) =>
                    file.size / 1024 ** 2 < MAX_IMAGE_SIZE &&
                    file?.name?.length < MAX_IMAGE_FILE_NAME
                )
                .filter((elem) => {
                  let isOriginal = true;
                  if (postData?.newImages?.length > 0) {
                    postData?.newImages?.forEach((imgElem) => {
                      if (
                        imgElem?.name === elem?.name &&
                        imgElem?.size === elem?.size &&
                        imgElem?.type === elem?.type
                      ) {
                        isOriginal = false;
                      }
                    });
                  }
                  return isOriginal;
                })
                .slice(0, limit),
            ]
          : [
              ...Array.from(event?.target?.files)
                .filter((file) => file.size / 1024 ** 2 < MAX_IMAGE_SIZE)
                .filter((elem) => {
                  let isOriginal = true;
                  if (postData?.newImages?.length > 0) {
                    postData?.newImages?.forEach((imgElem) => {
                      if (
                        imgElem?.name === elem?.name &&
                        imgElem?.size === elem?.size &&
                        imgElem?.type === elem?.type
                      ) {
                        isOriginal = false;
                      }
                    });
                  }
                  return isOriginal;
                })
                .slice(0, limit),
            ],
    }));
  };

  return (
    <Modal open={isOpen} onClose={() => setOpen((prev) => !prev)}>
      <div
        className={classes.container}
        style={{
          backgroundColor: darkMode ? "#212124" : "#fff",
          width: currentUser ? 500 : "",
        }}
      >
        {currentUser ? (
          <>
            {allPostsApiInfo?.loadingEdit ? (
              <PostSkeleton />
            ) : (
              <>
                <Top handleClose={() => setOpen(false)} label="Edit Post" />

                <div className={classes.contentContainer}>
                  <User
                    value={postData?.visibility || ""}
                    onChange={handleChange("visibility")}
                  />
                  <div className={classes.textContainer}>
                    <textarea
                      className="post-creation-input"
                      rows={2}
                      placeholder={"Whats on your mind"}
                      value={postData?.title || ""}
                      onChange={handleChange("title")}
                      style={{
                        color: darkMode ? "#fff" : "#000",
                      }}
                    />
                  </div>
                  {(postData?.images?.length > 0 ||
                    postData?.newImages?.length > 0) && (
                    <ImageList
                      variant="quilted"
                      cols={2}
                      gap={8}
                      sx={{ height: 315, overflow: "scroll" }}
                    >
                      {postData?.images?.map((item, index) => (
                        <ImageListItem key={index}>
                          <img
                            src={` ${item?.image}`}
                            alt={item.name}
                            loading="lazy"
                            style={{
                              borderRadius: 4,
                              position: "relative",
                            }}
                          />
                          <IconButton
                            sx={imageCrossButton}
                            component="label"
                            onClick={() =>
                              setPostData((prev) => ({
                                ...prev,
                                images: prev?.images?.filter(
                                  (elem, pos) => pos !== index
                                ),
                                deletedImages: [...prev?.deletedImages, item],
                              }))
                            }
                          >
                            <CancelIcon
                              style={{
                                color: "#fff",
                              }}
                            />
                          </IconButton>
                        </ImageListItem>
                      ))}
                      {postData?.newImages?.map((item, index) => (
                        <ImageListItem key={index}>
                          <img
                            src={item?.name ? URL.createObjectURL(item) : ""}
                            alt={item?.name}
                            loading="lazy"
                            style={{
                              borderRadius: 4,
                              position: "relative",
                            }}
                          />
                          <IconButton
                            sx={imageCrossButton}
                            component="label"
                            onClick={() =>
                              setPostData((prev) => ({
                                ...prev,
                                newImages: prev?.newImages?.filter(
                                  (elem, pos) => pos !== index
                                ),
                              }))
                            }
                          >
                            <CancelIcon
                              style={{
                                color: "#fff",
                              }}
                            />
                          </IconButton>
                        </ImageListItem>
                      ))}
                    </ImageList>
                  )}
                  <IconButton
                    sx={{
                      ...buttonSx,
                      backgroundColor: darkMode ? "#2f2f33" : "#fff",
                    }}
                    component="label"
                  >
                    <input
                      hidden
                      accept="image/png, image/jpeg"
                      type="file"
                      onInput={handleImageInput}
                      multiple
                    />
                    <span style={{ color: darkMode ? "#fff" : "#000" }}>
                      {filesLength < 1 || filesLength === undefined
                        ? "Add Images"
                        : filesLength < 5
                        ? `Add Images ${filesLength || 0}/5`
                        : "5/5"}
                    </span>
                    {filesLength < 5 && (
                      <AddIcon
                        style={{
                          color: darkMode ? "#0ed864" : "#134696",
                        }}
                      />
                    )}
                  </IconButton>
                  {discardedFiles?.length > 0 && (
                    <>
                      <span className={classes.discardedText}>
                        The following files were discarded because their size
                        exceeds the allowed limit of {MAX_IMAGE_SIZE} MBs:
                      </span>
                      {discardedFiles?.map((elem, index) => (
                        <span
                          className={classes.discardedText}
                          style={{ fontWeight: "bold", margin: 0 }}
                          key={index}
                        >
                          {elem?.name}
                        </span>
                      ))}
                    </>
                  )}
                  <div className={classes.buttonContainer}>
                    <Button
                      sx={createButtonSx}
                      startIcon={<AddIcon />}
                      onClick={handleEditPost}
                    >
                      Update Post
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

export default EditPostModal;
