import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { makeStyles } from "@mui/styles";
import { Grid, IconButton } from "@mui/material";
import {
  setCreateUserVerificationData,
  resetCreateUserVerificationData,
  resetCreateUserVerificationApi,
  createUserVerificationRequest,
} from "../../../../../redux/slices/verificationRequestsSlice";
import { setSelectedAgent } from "../../../../../redux/slices/agentsSlice";
import { setSideMenuClick } from "../../../../../redux/slices/settingsSlice";
import CancelIcon from "@mui/icons-material/Cancel";
import AddIcon from "@mui/icons-material/Add";
import pdfIcon from "../../../../../assets/settings/pdficon.png";
import {
  DEFAULT_SHADOW,
  MAX_IMAGE_FILE_NAME,
  MAX_IMAGE_SIZE,
  VERIFICATION_STATUS,
} from "../../../../../utils/constants";
import { getVerificationData } from "../../../../../utils/helperFunctions";
import ComponentLoader from "../../../../globalComponents/ComponentLoader";
import { TextTranslation } from "../../../../../utils/translation";

const gridSx = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: 200,
  position: "relative",
};
const buttonSx = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  boxShadow: DEFAULT_SHADOW,
  borderRadius: "10px",
  height: "80%",
  width: "80%",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "white",
  },
};
const crossButton = {
  position: "absolute",
  top: 15,
  right: "5%",
  p: 0,
};
const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    padding: "20px 0px",
    flexDirection: "column",
  },
  expHeading: {
    fontSize: 20,
    fontFamily: "heavy",
    color: "#134696",
    marginTop: 20,
  },
  description: {
    fontSize: 16,
    fontFamily: "light",
    color: "#7d7d7d",
    marginTop: 10,
  },
  image: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "2px",
    boxShadow: DEFAULT_SHADOW,
    borderRadius: "10px",
    height: "80%",
    width: "80%",
  },
  button: {
    backgroundColor: "#134696",
    fontFamily: "medium",
    fontSize: 16,
    cursor: "pointer",
    color: "#fff",
    border: "none",
    borderRadius: 5,
    width: 100,
    height: 40,
  },
  helperText: {
    fontSize: 12,
    color: "red",
    alignSelf: "flex-start",
    marginLeft: 15,
  },
}));

const GetVerified = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { darkMode, langIndex } = useSelector((state) => state.global);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const { selectedAgent } = useSelector((state) => state.agents);
  const { createUserVerificationData, createUserVerificationApiInfo } =
    useSelector((state) => state.verification);
  const [discarded, setDiscarded] = useState({ documentsCount: 0 });

  useEffect(() => {
    if (createUserVerificationApiInfo?.response?.status) {
      toast.success(TextTranslation.verificationRequestSubmitted[langIndex], {
        position: toast.POSITION.BOTTOM_RIGHT,
        hideProgressBar: true,
      });
      dispatch(
        setSelectedAgent({
          ...selectedAgent,
          verification_status_by_admin: VERIFICATION_STATUS?.IN_PROGRESS,
        })
      );
      dispatch(resetCreateUserVerificationApi());
      dispatch(resetCreateUserVerificationData());
      dispatch(setSideMenuClick("overview"));
    }
    // eslint-disable-next-line
  }, [createUserVerificationApiInfo?.response]);

  useEffect(() => {
    if (createUserVerificationApiInfo?.error) {
      toast.error(createUserVerificationApiInfo?.error, {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
      });
      dispatch(resetCreateUserVerificationApi());
      dispatch(resetCreateUserVerificationData());
    }
    // eslint-disable-next-line
  }, [createUserVerificationApiInfo?.error]);

  const handleImagePicker = (prop) => (event) => {
    var files = event.target.files;
    files = [...files].filter(
      (file, index) =>
        file?.size / 1024 ** 2 < MAX_IMAGE_SIZE &&
        file?.name?.length < MAX_IMAGE_FILE_NAME &&
        index < 5
    );
    setDiscarded({
      ...discarded,
      [`${prop}Count`]: event.target.files?.length - files?.length,
    });
    dispatch(
      setCreateUserVerificationData({
        ...createUserVerificationData,
        [prop]: createUserVerificationData?.[prop]?.length
          ? [
              ...createUserVerificationData?.[prop],
              ...Array.from(files).slice(
                0,
                5 - createUserVerificationData?.[prop]?.length
              ),
            ]
          : files,
      })
    );
  };
  const handleRemoveImage = (prop) => (position) => {
    dispatch(
      setCreateUserVerificationData({
        ...createUserVerificationData,
        [prop]: createUserVerificationData?.[prop]?.filter(
          (elem, index) => index !== position
        ),
      })
    );
    setDiscarded({
      ...discarded,
      [`${prop}Count`]: 0,
    });
  };
  const submitRequest = () => {
    dispatch(
      createUserVerificationRequest({
        values: getVerificationData(
          createUserVerificationData,
          "agent",
          currentUser?.id
        ),
        token: currentUser?.token,
      })
    );
  };

  // eslint-disable-next-line
  {
    if (
      selectedAgent?.verification_status_by_admin ===
      VERIFICATION_STATUS.IN_PROGRESS
    ) {
      return (
        <>
          <div className={classes.expHeading}>
            {TextTranslation.alreadyRequested[langIndex]}
          </div>
          <div className={classes.expHeading}>
            {TextTranslation.checkLater[langIndex]}
          </div>
        </>
      );
    }
  }
  // eslint-disable-next-line
  {
    if (
      selectedAgent?.verification_status_by_admin ===
      VERIFICATION_STATUS.VERIFIED
    ) {
      return (
        <>
          <div className={classes.expHeading}>
            {TextTranslation.congratulations[langIndex]}!!
          </div>
          <div className={classes.expHeading}>
            {TextTranslation.yourAccountIsVerified[langIndex]}
          </div>
        </>
      );
    }
  }
  // eslint-disable-next-line
  {
    if (
      selectedAgent?.verification_status_by_admin ===
      VERIFICATION_STATUS.DECLINED
    ) {
      return (
        <>
          <div className={classes.expHeading}>
            {TextTranslation.couldNotVerify[langIndex]}
          </div>
          <div className={classes.expHeading}>
            {TextTranslation.contactSupport[langIndex]}
          </div>
          <div className={classes.expHeading}>
            {TextTranslation.thanks[langIndex]}
          </div>
        </>
      );
    }
  }

  return (
    <>
      {createUserVerificationApiInfo?.loading ? (
        <ComponentLoader />
      ) : (
        <>
          <Grid
            container
            justifyContent={"flex-start"}
            columnSpacing={2}
            sx={{ mb: 2 }}
          >
            <Grid item xs={12} sm={10} lg={8.4}>
              <div className={classes.expHeading}>
                {TextTranslation.uploadDocForVerification[langIndex]}
              </div>
            </Grid>
            <Grid item xs={12} sm={10} lg={8.4}>
              <div className={classes.description}>
                {TextTranslation.upload5Images[langIndex]}
              </div>
            </Grid>
          </Grid>
          <>
            <Grid container justifyContent={"flex-start"} columnSpacing={2}>
              <Grid container columnSpacing={1} sx={{ transition: "0.5s" }}>
                {createUserVerificationData?.documents?.map((elem, index) => (
                  <Grid item xs={4} sx={gridSx} key={index}>
                    {elem?.type.includes("image") ? (
                      <img
                        src={URL.createObjectURL(elem)}
                        alt=""
                        className={classes.image}
                      />
                    ) : (
                      <img src={pdfIcon} alt="" className={classes.image} />
                    )}
                    <IconButton
                      sx={crossButton}
                      component="label"
                      onClick={() => handleRemoveImage("documents")(index)}
                    >
                      <CancelIcon
                        style={{
                          color: darkMode ? "#0ed864" : "#134696",
                        }}
                      />
                    </IconButton>
                  </Grid>
                ))}
                <Grid item xs={4} sx={gridSx}>
                  <IconButton
                    sx={{
                      ...buttonSx,
                      backgroundColor: darkMode ? "#2f2f33" : "#fff",
                    }}
                    component="label"
                    disabled={createUserVerificationData?.documents.length >= 5}
                  >
                    <input
                      hidden
                      accept="image/png, image/jpeg, .doc, .pdf"
                      type="file"
                      onInput={handleImagePicker("documents")}
                      multiple
                    />
                    <AddIcon
                      style={{ color: darkMode ? "#0ed864" : "#134696" }}
                    />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
            {discarded?.documentsCount > 0 && (
              <span className={classes.helperText}>
                {discarded?.documentsCount} image(s) discarded (file size/name
                too large).
              </span>
            )}
            {createUserVerificationData?.documents?.length > 0 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  marginTop: 20,
                }}
              >
                <button className={classes.button} onClick={submitRequest}>
                  {TextTranslation.submit[langIndex]}
                </button>
              </div>
            )}
          </>
        </>
      )}
    </>
  );
};

export default GetVerified;
