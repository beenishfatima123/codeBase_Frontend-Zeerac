import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  MAX_IMAGE_FILE_NAME,
  MAX_IMAGE_SIZE,
} from "../../../../../utils/constants";
import useColor from "../../../../../utils/hooks/useColor";
import smsIcon from "../../../../../assets/settings/sms.png";
import editIcon from "../../../../../assets/settings/editW.png";
import phoneIcon from "../../../../../assets/settings/phone.png";
import calendarIcon from "../../../../../assets/settings/calendar.png";
import ComponentLoader from "../../../../globalComponents/ComponentLoader";
import defaultUser from "../../../../../assets/defaultAssets/defaultAvatar.png";
import {
  updateUserInfo,
  userInfo,
} from "../../../../../redux/slices/settingsSlice";
import { toast } from "react-toastify";
import { setCurrentUser } from "../../../../../redux/slices/authSlice";
import { TextTranslation } from "../../../../../utils/translation";
import { Button, Grid } from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

const editSx = {
  border: "1px solid #fff",
  fontSize: 16,
  fontFamily: "medium",
  color: "#fff",
  backgroundColor: "#134696",
  textTransform: "none",
  cursor: "pointer",
  position: "absolute",
  top: 10,
  left: 10,
  width: 120,
};

const useStyles = makeStyles(() => ({
  backgroundContainer: {
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    border: "1px solid #CCCCCC",
    marginTop: 10,
    // backgroundColor: "#134696",
    display: "flex",
    flexDirection: "column-reverse",
    position: "relative",
  },
  backgroundInnerContainer: {
    display: "flex",
    justifyContent: "space-between",
    margin: "0 20px 20px 20px",
    zIndex: 999999,
  },
  userContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  name: {
    fontSize: 18,
    fontFamily: "heavy",
    color: "#ffffff",
  },
  userType: {
    fontSize: 12,
    fontFamily: "medium",
    color: "#0ED864",
  },
  userImageContainer: {
    width: 133,
    height: 133,
    borderRadius: "50%",
    backgroundColor: "#ffffff",
  },
  profilePic: {
    width: 133,
    height: 133,
    borderRadius: "50%",
    objectFit: "cover",
  },
  userInfoContainer: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    border: "1px solid #CCCCCC",
    display: "flex",
    flexDirection: "column",
    padding: "10px 0 10px 10px",
  },
  userInfo: {
    fontSize: 15,
    fontFamily: "light",
    color: "#134696",
    padding: "5px 0",
    display: "flex",
    alignItems: "center",
  },
  icons: {
    marginRight: 10,
  },
  biographyContainer: {
    borderRadius: 10,
    border: "1px solid #CCCCCC",
    marginTop: 10,
  },
  biographyHeader: {
    padding: 10,
    fontSize: 14,
    fontFamily: "medium",
    display: "flex",
    alignItems: "center",
    color: "#ffffff",
    backgroundColor: "#134696",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  biographyDescription: {
    fontSize: 14,
    fontFamily: "light",
    color: "#134696",
    padding: 10,
  },
}));

const PersonalInfo = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [photo, setPhoto] = useState(null);
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [flag, setFlag] = useState(false);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const { colors, darkMode, langIndex } = useSelector((state) => state.global);
  useColor(colors);
  const { userDetail, userDetailApiInfo } = useSelector(
    (state) => state.settings
  );

  useEffect(() => {
    dispatch(userInfo({ id: currentUser?.id, token: currentUser?.token }));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // console.log({ userDetail, currentUser });
    if (userDetail?.result?.photo !== currentUser?.photo) {
      dispatch(
        setCurrentUser({ ...currentUser, photo: userDetail?.result?.photo })
      );
    }

    // eslint-disable-next-line
  }, [userDetail]);

  const handlePhotoUpload = (e) => {
    if (e.currentTarget.files[0]) {
      let file = e?.currentTarget?.files[0];
      if (
        file?.name?.length < MAX_IMAGE_FILE_NAME &&
        file?.size / 1024 ** 2 < MAX_IMAGE_SIZE
      ) {
        setPhoto(file);
        setFlag(false);
      } else {
        setFlag(true);
        toast.error("file name/size too lengthy", {
          position: toast.POSITION.TOP_CENTER,
          hideProgressBar: true,
        });
      }
    }
  };
  const handleCoverPhotoUpload = (e) => {
    if (e.currentTarget.files[0]) {
      let file = e?.currentTarget?.files[0];
      if (
        file?.name?.length < MAX_IMAGE_FILE_NAME &&
        file?.size / 1024 ** 2 < MAX_IMAGE_SIZE
      ) {
        setCoverPhoto(file);
        setFlag(false);
      } else {
        setFlag(true);
        toast.error("file name/size too lengthy", {
          position: toast.POSITION.TOP_CENTER,
          hideProgressBar: true,
        });
      }
    }
  };

  useEffect(() => {}, [userDetail, flag]);

  return (
    <>
      {userDetailApiInfo?.loading ? (
        <ComponentLoader />
      ) : (
        <div style={{ overflow: "hidden" }}>
          <div className={classes.backgroundContainer}>
            {/* cover photo update */}
            <div>
              <img
                style={{
                  zIndex: -1,
                  position: "absolute",
                  width: "100%",
                  top: 0,
                  height: 200,
                  objectFit: "cover",
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                }}
                alt={userDetail?.result?.cover_photo}
                src={
                  coverPhoto
                    ? URL.createObjectURL(coverPhoto)
                    : userDetail?.result?.cover_photo
                    ? userDetail?.result?.cover_photo
                    : defaultUser
                }
              />
              <Button sx={editSx}>Edit Cover</Button>
              <input
                id="cover_photo"
                name="cover_photo"
                accept="image/png, image/jpeg"
                type="file"
                style={{
                  marginTop: -10,
                  marginLeft: 50,
                  border: "none",
                  backgroundColor: "transparent",
                  color: "transparent",
                  cursor: "pointer",
                  position: "absolute",
                  top: 20,
                  left: -40,
                  width: 120,
                  height: 40,
                  zIndex: 10,
                }}
                onInput={handleCoverPhotoUpload}
                onChange={(e) => {
                  let formData = new FormData();
                  formData.append(
                    "cover_photo",
                    coverPhoto !== null ? coverPhoto : currentUser?.cover_photo
                  );
                  if (!flag) {
                    if (
                      window.confirm("Are you sure to change the cover photo?")
                    ) {
                      dispatch(
                        updateUserInfo({
                          user: formData,
                          id: currentUser?.id,
                          token: currentUser?.token,
                        })
                      ).then((response) => {
                        if (response?.payload?.status) {
                          dispatch(
                            setCurrentUser({
                              ...response?.payload?.result,
                              token: currentUser?.token,
                              cover_photo:
                                response?.payload?.result?.cover_photo,
                            })
                          );
                          toast.success(response?.payload?.message, {
                            position: toast.POSITION.BOTTOM_RIGHT,
                            hideProgressBar: true,
                          });
                        } else {
                          toast.error(response?.payload?.message, {
                            position: toast.POSITION.BOTTOM_RIGHT,
                            hideProgressBar: true,
                          });
                        }
                      });
                    }
                  }
                }}
              />
            </div>
            <div className={classes.backgroundInnerContainer}>
              <div className={classes.userContainer}>
                <div className={classes.name}>
                  {userDetail?.result?.first_name}&nbsp;
                  {userDetail?.result?.last_name}
                </div>
                <div
                  className={classes.userType}
                  style={{ color: darkMode ? colors?.white : "" }}
                >
                  {userDetail?.result?.user_type === 0
                    ? TextTranslation.realEstateAdmin[langIndex]
                    : userDetail?.result?.user_type === 1
                    ? TextTranslation.realEstateUser[langIndex]
                    : userDetail?.result?.user_type === 2
                    ? TextTranslation.realEstateAgent[langIndex]
                    : userDetail?.result?.user_type === 3
                    ? TextTranslation.realEstateCEO[langIndex]
                    : TextTranslation.realEstateModerator[langIndex]}
                </div>
              </div>
              {/* profile photo update */}
              <div className={classes.userImageContainer}>
                <img
                  alt=""
                  src={
                    photo
                      ? URL.createObjectURL(photo)
                      : userDetail?.result?.photo
                      ? userDetail?.result?.photo
                      : defaultUser
                  }
                  className={classes.profilePic}
                />

                <div
                  style={{
                    right: 70,
                    marginTop: -50,
                    color: "#ffffff",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer",
                      position: "-webkit-sticky",
                    }}
                  >
                    <img alt="edit" src={editIcon} />
                    <div
                      style={{
                        fontSize: 12,
                        fontFamily: "light",
                      }}
                    >
                      {TextTranslation.changePicture[langIndex]}
                    </div>
                    <input
                      id="photo"
                      name="photo"
                      accept="image/png, image/jpeg"
                      type="file"
                      style={{
                        marginTop: -10,
                        marginLeft: 50,
                        border: "none",
                        backgroundColor: "transparent",
                        color: "transparent",
                        cursor: "pointer",
                      }}
                      onInput={handlePhotoUpload}
                      onChange={(e) => {
                        let formData = new FormData();
                        formData.append(
                          "photo",
                          photo !== null ? photo : currentUser?.photo
                        );
                        if (!flag) {
                          if (
                            window.confirm(
                              TextTranslation.areYouSureToChangeProfilePicture[
                                langIndex
                              ]
                            )
                          ) {
                            dispatch(
                              updateUserInfo({
                                user: formData,
                                id: currentUser?.id,
                                token: currentUser?.token,
                              })
                            ).then((response) => {
                              if (response?.payload?.status) {
                                dispatch(
                                  setCurrentUser({
                                    ...response?.payload?.result,
                                    token: currentUser?.token,
                                    firebaseDocId:
                                      response?.payload?.result?.email,
                                    photo: response?.payload?.result?.photo,
                                  })
                                );
                                toast.success(response?.payload?.message, {
                                  position: toast.POSITION.BOTTOM_RIGHT,
                                  hideProgressBar: true,
                                });
                              } else {
                                toast.error(response?.payload?.message, {
                                  position: toast.POSITION.BOTTOM_RIGHT,
                                  hideProgressBar: true,
                                });
                              }
                            });
                          }
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.userInfoContainer}>
            <Grid container>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <div
                  className={classes.userInfo}
                  style={{ color: colors?.primary }}
                >
                  <img
                    alt="calendar"
                    src={calendarIcon}
                    className={classes.icons}
                    style={{ color: colors?.primary }}
                  />
                  {userDetail?.result?.date_of_birth}
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <div
                  className={classes.userInfo}
                  style={{ color: colors?.primary }}
                >
                  <img alt="sms" src={smsIcon} className={classes.icons} />
                  {userDetail?.result?.email}
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <div
                  className={classes.userInfo}
                  style={{ color: colors?.primary }}
                >
                  <img alt="phone" src={phoneIcon} className={classes.icons} />
                  {userDetail?.result?.phone_number}
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <div
                  className={classes.userInfo}
                  style={{ color: colors?.primary }}
                >
                  <LocationOnOutlinedIcon sx={{ color: "#0ed864" }} />
                  {userDetail?.result?.city}
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <div
                  className={classes.userInfo}
                  style={{ color: colors?.primary }}
                >
                  <LocationOnOutlinedIcon sx={{ color: "#0ed864" }} />
                  {userDetail?.result?.area}
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <div
                  className={classes.userInfo}
                  style={{ color: colors?.primary }}
                >
                  <LocationOnOutlinedIcon sx={{ color: "#0ed864" }} />
                  {userDetail?.result?.address}
                </div>
              </Grid>
            </Grid>
          </div>
          <div className={classes.biographyContainer}>
            <div
              className={classes.biographyHeader}
              style={{ backgroundColor: colors?.primary }}
            >
              {TextTranslation.biography[langIndex]}
            </div>
            <div
              className={classes.biographyDescription}
              style={{ color: colors?.primary }}
            >
              {userDetail?.result?.personal_description}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PersonalInfo;
