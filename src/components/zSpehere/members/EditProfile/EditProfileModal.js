import React, { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { Button, Modal } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import LoginContainer from "../../../loginComponents/LoginContainer";
import ComponentLoader from "../../../globalComponents/ComponentLoader";
import TopSection from "./TopSection";
import { getWordCount } from "../../../../utils/helperFunctions";
import { updateUserInfo } from "../../../../redux/slices/authSlice";

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
    overflowY: "scroll",
    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
    display: "flex",
    flex: 1,
    flexDirection: "column",
    maxWidth: "98%",
    paddingRight: "0px !important",
  },
  buttonContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    margin: 10,
  },
}));

const EditProfileModal = ({ isOpen, setOpen }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [profileData, setProfileData] = useState();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const { createPostApiInfo } = useSelector((state) => state.posts);
  const { darkMode } = useSelector((state) => state.global);

  useEffect(() => {
    // console.log({ profileData, currentUser });
  }, [currentUser, profileData]);
  const handleChange = (prop) => (event) => {
    setProfileData((prev) => ({
      ...prev,
      [prop]: event?.target?.value,
    }));
  };
  const handleEditProfile = () => {
    const invalid = validate(profileData);
    // console.log({ profileData, invalid });
    if (invalid) {
      toast.error(invalid, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else {
      dispatch(
        updateUserInfo({
          id: currentUser?.id,
          values: getProfileFormData(),
          token: currentUser?.token,
        })
      );
      setOpen(false);
      setProfileData();
    }
  };
  const validate = (data) => {
    if (
      data?.personal_description &&
      (getWordCount(data?.personal_description) < 10 ||
        getWordCount(data?.personal_description) > 100)
    )
      return "Description must be min. 10 and max. 100 words.";
    else if (data?.name && (data?.name?.length < 3 || data?.name?.length > 50))
      return "name must be between 3-50 characters";
    else return null;
  };

  const getProfileFormData = () => {
    const formData = new FormData();
    if (profileData?.personal_description)
      formData?.append(
        "personal_description",
        profileData?.personal_description
      );
    if (profileData?.handle) formData?.append("handle", profileData?.handle);
    if (profileData?.new_photo)
      formData?.append("photo", profileData?.new_photo);
    if (profileData?.cover_photo)
      formData?.append("cover_photo", profileData?.cover_photo);
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
                <TopSection
                  handleChange={handleChange}
                  profileData={profileData}
                />
                <div className={classes.buttonContainer}>
                  <Button sx={createButtonSx} onClick={handleEditProfile}>
                    Update Profile
                  </Button>
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

export default EditProfileModal;
