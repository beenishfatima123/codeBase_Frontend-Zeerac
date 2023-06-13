import React from "react";
import { Button, IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import {
  CONTENT_WIDTH,
  MAX_IMAGE_FILE_NAME,
  MAX_IMAGE_SIZE,
} from "../../../../utils/constants";
import coverImage from "../../../../assets/defaultAssets/podcastBackground.png";
import { toast } from "react-toastify";
import EditIcon from "@mui/icons-material/Edit";
import "./editProfile.css";

const changePhotoButton = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  p: 0,
  zIndex: 20,
};

const useStyles = makeStyles(() => ({
  container: {
    width: CONTENT_WIDTH,
    maxWidth: "95%",
    margin: "auto",
  },

  innerContainer: {
    margin: "10px 0",
  },

  cover: {
    width: "100%",
    height: 200,
    objectFit: "cover",
    zIndex: 10,
    //marginTop: 20,
  },

  userContainer: {
    display: "flex",
    justifyContent: "space-between",
    margin: "0 5%",
    flexDirection: "column",
  },
  profileImageContainer: {
    width: 150,
    height: 150,
    border: "2px solid #134696",
    marginTop: -100,
    zIndex: 20,
    position: "relative",
  },
  profileImage: {
    width: 150,
    height: 150,
    objectFit: "cover",
    borderRadius: 5,
  },
  name: {
    textTransform: "capitalize",
    color: "#134696",
    fontFamily: "medium",
    fontSize: 26,
  },
  username: {
    color: "#B5B5BE",
    fontFamily: "medium",
    fontSize: 18,
  },
  leftContainer: {
    display: "flex",
  },
  rightContainer: {
    display: "flex",
  },

  "@media (max-width: 800px)": {
    userContainer: {
      margin: "0 8px",
    },
  },
  "@media (max-width: 650px)": {
    rightContainer: {
      display: "flex",
      flexDirection: "column",
    },

    profileImage: {
      width: 100,
      height: 100,
    },
    profileImageContainer: {
      width: 100,
      height: 100,
      marginTop: -50,
    },
  },
  "@media (max-width: 500px)": {
    userContainer: {
      flexDirection: "column",
    },
    rightContainer: {
      display: "flex",
      flexDirection: "row",
      alignSelf: "flex-end",
      margin: "10px 0px",
    },

    innerContainer: {
      height: "auto",
    },
  },
}));

const TopSection = ({ handleChange, profileData }) => {
  const classes = useStyles();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const { darkMode } = useSelector((state) => state.global);

  const validateImage = (file) => {
    if (file?.name?.length > MAX_IMAGE_FILE_NAME) {
      return "File name is invalid";
    } else if (file?.size / 1024 ** 2 > MAX_IMAGE_SIZE) {
      return "File size too large";
    } else return null;
  };
  const handleImageInput = (prop) => (e) => {
    const inValid = validateImage(e?.target?.files[0]);
    if (inValid) {
      toast.error(inValid, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else handleChange(prop)({ target: { value: e?.target?.files[0] } });
  };
  return (
    <div className={classes.container}>
      <div className={classes.innerContainer}>
        <div style={{ position: "relative" }}>
          <Button
            sx={{
              position: "absolute",
              right: 20,
              top: 20,
              backgroundColor: "transparent",
              border: "1px solid #fff",
              color: "#fff",
              cursor: "pointer",
              height: 40,
              width: 100,
              borderRadius: "10px",
              fontFamily: "medium",
              fontSize: 14,
            }}
            component="label"
          >
            <input
              hidden
              accept="image/png, image/jpeg"
              type="file"
              onInput={handleImageInput("cover_photo")}
            />
            <span style={{ color: "#fff" }}>Change</span>
          </Button>
          {profileData?.cover_photo ? (
            <img
              className={classes.cover}
              alt=""
              src={URL.createObjectURL(profileData?.cover_photo)}
            />
          ) : (
            <img
              className={classes.cover}
              alt=""
              src={
                currentUser?.cover_photo ? currentUser?.cover_photo : coverImage
              }
            />
          )}
        </div>
        <div className={classes.userContainer}>
          <div className={classes.leftContainer}>
            <div className={classes.profileImageContainer}>
              {profileData?.new_photo ? (
                <img
                  className={classes.profileImage}
                  alt=""
                  src={URL.createObjectURL(profileData?.new_photo)}
                />
              ) : (
                <img
                  className={classes.profileImage}
                  alt=""
                  src={currentUser?.photo}
                />
              )}
              <IconButton sx={changePhotoButton} component="label">
                <EditIcon
                  style={{
                    color: "#fff",
                    border: "2px solid #fff",
                    borderRadius: 50,
                    fontSize: 50,
                    padding: 5,
                  }}
                />
                <input
                  hidden
                  accept="image/png, image/jpeg"
                  type="file"
                  onInput={handleImageInput("new_photo")}
                />
              </IconButton>
            </div>
            <div style={{ marginLeft: 10 }}>
              <input
                type={"text"}
                className="edit-input"
                placeholder={
                  profileData?.name ||
                  `${currentUser?.first_name} ${currentUser?.last_name}`
                }
                value={profileData?.name || ""}
                onChange={handleChange("name")}
                style={{
                  color: darkMode ? "#fff" : "#134696",
                }}
                readOnly
              />
              <input
                type={"text"}
                className="edit-input-handle"
                placeholder={`@${
                  profileData?.handle || currentUser?.handle || "Anonymous"
                }`}
                value={profileData?.handle || ""}
                onChange={(e) =>
                  handleChange("handle")(
                    e?.target?.value?.includes("@")
                      ? e
                      : { target: { value: `@${e?.target?.value}` } }
                  )
                }
                style={{
                  color: darkMode ? "#fff" : "#134696",
                }}
              />
            </div>
          </div>
          <textarea
            rows="4"
            className="edit-input"
            placeholder={
              profileData?.personal_description ||
              `${currentUser?.personal_description}`
            }
            value={profileData?.personal_description || ""}
            onChange={handleChange("personal_description")}
            style={{
              color: darkMode ? "#fff" : "#134696",
              maxWidth: "100%",
              marginTop: 10,
              fontSize: 18,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TopSection;
