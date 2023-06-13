import { toast } from "react-toastify";
import { makeStyles } from "@mui/styles";
import AddIcon from "@mui/icons-material/Add";
import React, { useState, useEffect } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Modal, IconButton, Button } from "@mui/material";
import ComponentLoader from "../../../globalComponents/ComponentLoader";
import {
  DEFAULT_SHADOW,
  MAX_IMAGE_FILE_NAME,
  MAX_IMAGE_SIZE,
} from "../../../../utils/constants";
import {
  resetVerifySoldListingsApi,
  setVerifySoldListings,
  verifySoldListings,
} from "../../../../redux/slices/propertiesSlice";
import { TextTranslation } from "../../../../utils/translation";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  height: "60vh",
  bgcolor: "white",
  border: "1px solid #134696",
  boxShadow: DEFAULT_SHADOW,
  p: 4,
};
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
  height: 200,
  width: "80%",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "white",
  },
};
const crossButton = {
  position: "absolute",
  top: 5,
  right: "7%",
  p: 0,
};

const useStyles = makeStyles(() => ({
  description: {
    fontSize: 14,
    fontFamily: "light",
    color: "#7d7d7d",
    margin: "10px 0 10px 40px",
  },
  container: {
    display: "flex",
    height: "100%",
    flexDirection: "column",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    color: "#134696",
    borderBottom: "1px solid #134696",
    padding: "10px 5%",
    marginRight: "5%",
    fontFamily: "heavy",
  },
  image: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "2px",
    boxShadow: DEFAULT_SHADOW,
    borderRadius: "10px",
    height: 200,
    width: "80%",
    objectFit: "cover",
  },
  submitButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#134696",
    border: "none",
    color: "#fff",
    cursor: "pointer",
    fontSize: 16,
    fontFamily: "light",
    width: "max-content",
    textTransform: "capitalize",
    marginTop: 20,
    margin: "auto",
    "&:hover": {
      backgroundColor: "#134696",
    },
  },
}));

/* This modal is displayed when agent clicks get verified on the property card.  */
const ListingVerifyModal = ({ open, setOpen, property }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [discarded, setDiscarded] = useState({ documentsCount: 0 });

  const { darkMode, langIndex } = useSelector((state) => state.global);
  const { currentUser } = useSelector((state) => state.auth);
  const { verifySoldListingsData, verifySoldListingsDataApiInfo } = useSelector(
    (state) => state.properties
  );

  /* handleImagePicker takes prop event and sets file equal to the image uploaded on the event target. It also validated image sizes and dispatches to update property info. */
  const handleImagePicker = (prop) => (event) => {
    var files = event.target.files;
    files = [...files].filter(
      (file, index) =>
        file.size / 1024 ** 2 < MAX_IMAGE_SIZE &&
        file?.length < MAX_IMAGE_FILE_NAME &&
        index < 2
    );
    setDiscarded({
      ...discarded,
      [`${prop}Count`]: event.target.files?.length - files?.length,
    });
    dispatch(
      setVerifySoldListings({
        ...verifySoldListingsData,
        [prop]: verifySoldListingsData?.[prop]?.length
          ? [
              ...verifySoldListingsData?.[prop],
              ...Array.from(event?.target?.files),
            ]
          : Array.from(event?.target?.files),
      })
    );
  };
  /* handles click on the cross button on uploaded images. */
  const handleRemoveImage = (prop) => (position) => {
    dispatch(
      setVerifySoldListings({
        ...verifySoldListingsData,
        [prop]: verifySoldListingsData?.[prop]?.filter(
          (elem, index) => index !== position
        ),
      })
    );
  };

  /* handle submit after uploading verification documents. */
  const handleSubmit = () => {
    let formData = new FormData();
    formData.append("type", "sold_on_zeerac");
    formData.append("property", property?.id);
    verifySoldListingsData?.images?.forEach((file, i) => {
      formData.append("file", file);
    });

    dispatch(
      verifySoldListings({
        token: currentUser?.token,
        formData,
      })
    );
  };

  /* If property is set to sold, dispatch the sold property data and display in toast. */
  useEffect(() => {
    if (verifySoldListingsDataApiInfo?.response) {
      toast.success(TextTranslation.docSubmittedSuccessfully[langIndex], {
        position: toast.POSITION.BOTTOM_RIGHT,
        hideProgressBar: true,
      });
      dispatch(resetVerifySoldListingsApi());
      dispatch(setVerifySoldListings(null));
      setOpen(false);
    }
    // eslint-disable-next-line
  }, [verifySoldListingsDataApiInfo?.response]);

  /* If sold listing API gives error, display in toast and dispatch reset. */
  useEffect(() => {
    if (verifySoldListingsDataApiInfo?.error) {
      toast.error(verifySoldListingsDataApiInfo?.response?.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
        hideProgressBar: true,
      });
      dispatch(resetVerifySoldListingsApi());
    }
    // eslint-disable-next-line
  }, [verifySoldListingsDataApiInfo?.error]);

  return (
    <Modal open={open} style={style}>
      <>
        {verifySoldListingsDataApiInfo?.loading ? (
          <ComponentLoader />
        ) : (
          <div className={classes.container}>
            <IconButton
              sx={{ ...crossButton, position: "absolute", right: 0, top: 0 }}
              component="label"
              onClick={() => setOpen((prev) => !prev)}
            >
              <CancelIcon style={{ color: darkMode ? "#0ed864" : "#134696" }} />
            </IconButton>
            <span
              className={classes.title}
              style={{
                borderBottom: darkMode
                  ? "1px solid #0ed864"
                  : "1px solid #134696",
                color: darkMode ? "#0ed864" : "#134696",
              }}
            >
              {TextTranslation.uploadDocForVerification[langIndex]}
            </span>
            <Grid container justifyContent={"flex-start"} columnSpacing={2}>
              <Grid item xs={12} sm={10} lg={8.4}>
                <div className={classes.description}>
                  {TextTranslation.upload2Images[langIndex]}
                </div>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ transition: "0.5s" }}>
              {verifySoldListingsData?.images?.map((elem, index) => (
                <Grid item xs={6} sx={gridSx} key={index}>
                  <img
                    src={URL.createObjectURL(elem)}
                    alt=""
                    className={classes.image}
                  />
                  <IconButton
                    sx={crossButton}
                    component="label"
                    onClick={() => handleRemoveImage("images")(index)}
                  >
                    <CancelIcon
                      style={{ color: darkMode ? "#0ed864" : "#134696" }}
                    />
                  </IconButton>
                </Grid>
              ))}
              {verifySoldListingsData == null ||
              verifySoldListingsData?.images?.length < 2 ? (
                <Grid item xs={6} sx={gridSx}>
                  <IconButton
                    sx={{
                      ...buttonSx,
                      backgroundColor: darkMode ? "#2f2f33" : "#fff",
                    }}
                    component="label"
                    disabled={verifySoldListingsData?.images?.length >= 2}
                  >
                    <input
                      hidden
                      accept="image/png, image/jpeg"
                      type="file"
                      onInput={handleImagePicker("images")}
                      multiple
                    />
                    <AddIcon
                      style={{ color: darkMode ? "#0ed864" : "#134696" }}
                    />
                  </IconButton>
                </Grid>
              ) : null}
            </Grid>
            <Button className={classes.submitButton} onClick={handleSubmit}>
              {TextTranslation.submit[langIndex]}
            </Button>
          </div>
        )}
      </>
    </Modal>
  );
};

export default ListingVerifyModal;
