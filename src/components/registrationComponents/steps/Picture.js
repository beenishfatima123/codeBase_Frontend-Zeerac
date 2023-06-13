import React from "react";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { setAccountCreationData } from "../../../redux/slices/createAccountSlice";
import "./steps.css";
import { Button } from "@mui/material";
import { MAX_IMAGE_SIZE, MAX_IMAGE_FILE_NAME } from "../../../utils/constants";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
    width: "60%",
  },
  topLabel: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#134696",
    margin: "20px 0px",
    textTransform: "uppercase",
  },
  image: {
    height: 200,
    width: 200,
    borderRadius: 100,
    backgroundColor: "#C9C9C9",
    marginTop: 20,
    objectFit: "cover",
  },
  helperText: {
    fontSize: 12,
    color: "red",
    alignSelf: "flex-start",
    margin: "auto",
    marginTop: 3,
  },
  "@media (max-width: 1024px)": {
    container: {
      width: "90%",
    },
  },
}));
const Picture = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const accountCreationData = useSelector(
    (state) => state.createAccount.accountCreationData
  );

  const handleImagePicker = (event) => {
    if (event?.target?.files?.length > 0) {
      const fileMb = event?.target?.files[0]?.size / 1024 ** 2;
      const fileName = event?.target?.files[0]?.name?.length;
      dispatch(
        setAccountCreationData({
          ...accountCreationData,
          profilePicture: event?.target?.files[0],
          isPictureValid:
            fileMb <= MAX_IMAGE_SIZE && fileName < MAX_IMAGE_FILE_NAME
              ? true
              : false,
        })
      );
    }
  };

  return (
    <div className={classes.container}>
      <span className={classes.topLabel}>Upload your profile picture</span>
      {accountCreationData?.profilePicture ? (
        <img
          src={URL.createObjectURL(accountCreationData?.profilePicture)}
          alt=""
          className={classes.image}
        />
      ) : (
        <div className={classes.image} />
      )}
      {accountCreationData?.isPictureValid === false ? (
        <span className={classes.helperText}>
          Profile image file/name is too large.
        </span>
      ) : null}

      <Button
        sx={{
          backgroundColor: "#134696",
          fontSize: 16,
          fontWeight: "bold",
          fontFamily: "medium",
          textTransform: "none",
          height: 40,
          width: 100,
          borderRadius: 20,
          color: "white",
          mt: 4,
        }}
        component="label"
      >
        Upload
        <input
          hidden
          accept="image/png, image/jpeg"
          type="file"
          onInput={handleImagePicker}
          multiple
        />
      </Button>
    </div>
  );
};

export default Picture;
