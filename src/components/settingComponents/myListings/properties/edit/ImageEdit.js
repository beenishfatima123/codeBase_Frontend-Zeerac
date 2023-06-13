import React from "react";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  DEFAULT_SHADOW,
  MAX_IMAGE_FILE_NAME,
  MAX_IMAGE_SIZE,
} from "../../../../../utils/constants";
import {
  deletePropertyImage,
  setPropertyUpdateInfo,
} from "../../../../../redux/slices/propertiesSlice";
import { Grid, IconButton } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import AddIcon from "@mui/icons-material/Add";
import { useWindowDims } from "../../../../../utils/useWindowDims";
import { useState } from "react";
import ConfirmModal from "../../ConfirmModal";
import ComponentLoader from "../../../../globalComponents/ComponentLoader";

const gridSx = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: 200,
  transition: "0.5s",
};
const buttonSx = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  boxShadow: DEFAULT_SHADOW,
  borderRadius: "10px",

  textTransform: "none",
  "&:hover": {
    backgroundColor: "white",
  },
};
const crossButton = {
  position: "absolute",
  top: -10,
  right: -10,
  p: 0,
};
const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    padding: 20,
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    margin: "10px 3px",
  },
  title: {
    fontSize: 24,
    fontFamily: "heavy",
    textTransform: "uppercase",
  },
  image: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "2px",
    boxShadow: DEFAULT_SHADOW,
    borderRadius: "10px",
    height: 150,
    width: 150,
    objectFit: "cover",
  },
  helperText: {
    fontSize: 12,
    color: "red",
    alignSelf: "flex-start",
    marginLeft: 15,
  },
  "@media (max-width: 500px)": {
    title: {
      fontSize: 28,
    },
    image: {
      height: 100,
      width: 100,
    },
  },
}));

/* Edit images container on the edit properties page. It contains add and remove image options. */
const ImageEdit = ({ attribute, label, refProp }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { width } = useWindowDims();

  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [imageToDelete, setImageToDelete] = useState(null);
  const [discarded, setDiscarded] = useState({
    [`${attribute}Count`]: 0,
  });

  const { darkMode } = useSelector((state) => state.global);
  const { showDrawer } = useSelector((state) => state.settings);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const { propertyToEdit, propertyUpdateInfo, allGlobalPropertiesApiInfo } =
    useSelector((state) => state.properties);

  // TODO
  // const limit = useMemo(() => {
  //   let imageLimit = IMAGE_LIMIT;
  //   if (propertyToEdit?.[attribute]?.length > 0)
  //     imageLimit = IMAGE_LIMIT - propertyToEdit?.[attribute]?.length;
  //   if (propertyUpdateInfo?.[attribute]?.length > 0)
  //     imageLimit = imageLimit - propertyUpdateInfo?.[attribute]?.length;
  //   return imageLimit;
  // }, [propertyToEdit, propertyUpdateInfo]);

  // // console.log({ attribute, limit });
  const handleImagePicker = (prop) => (event) => {
    var files = event.target.files;
    files = [...files].filter(
      (file) =>
        file.size / 1024 ** 2 < MAX_IMAGE_SIZE &&
        file?.name?.length < MAX_IMAGE_FILE_NAME
    );
    setDiscarded({
      ...discarded,
      [`${prop}Count`]: event.target.files?.length - files?.length,
    });
    dispatch(
      setPropertyUpdateInfo({
        ...propertyUpdateInfo,
        [prop]: propertyUpdateInfo?.[prop]?.length
          ? [...propertyUpdateInfo?.[prop], ...Array.from(event?.target?.files)]
          : files,
      })
    );
  };
  const handleRemoveImage = (removeExisting) => (position) => {
    if (removeExisting) {
      setImageToDelete(propertyToEdit?.[attribute][position]);
      setOpenConfirmModal(true);
    } else
      dispatch(
        setPropertyUpdateInfo({
          ...propertyUpdateInfo,
          [attribute]: propertyUpdateInfo?.[attribute]?.filter(
            (elem, index) => index !== position
          ),
        })
      );
  };

  /* handleDeleteImage dispatches deletePropertyImage method in the slice method to remove the image from the property details. */
  const handleDeleteImage = () => {
    // console.log({ imageToDelete });
    dispatch(
      deletePropertyImage({
        id: imageToDelete?.id,
        token: currentUser?.token,
        property: propertyToEdit?.id,
        attribute,
      })
    );
    setOpenConfirmModal(false);
  };
  return (
    <div
      className={classes.container}
      ref={refProp}
      style={{
        backgroundColor: darkMode ? "#2f2f33" : "#fff",
      }}
    >
      {openConfirmModal && (
        <ConfirmModal
          open={openConfirmModal}
          setOpen={setOpenConfirmModal}
          title={`Are you sure you want to delete this Image?`}
          handleConfirm={handleDeleteImage}
        />
      )}
      <span
        className={classes.title}
        style={{
          color: darkMode ? "#0ed864" : "#134696",
        }}
      >
        {label}
      </span>
      {allGlobalPropertiesApiInfo?.deletingImage ? (
        <ComponentLoader />
      ) : (
        <Grid container columnSpacing={2} sx={{ transition: "0.5s" }}>
          {propertyToEdit?.[attribute]?.map((elem, index) => (
            <Grid
              item
              xs={12}
              sm={showDrawer ? 5 : 4}
              md={showDrawer ? 5 : 3}
              lg={showDrawer ? 3 : 2}
              sx={gridSx}
              key={index}
            >
              <div style={{ position: "relative" }}>
                <img
                  src={`${elem?.[attribute]}`}
                  alt=""
                  className={classes.image}
                />
                <IconButton
                  sx={crossButton}
                  component="label"
                  onClick={() => handleRemoveImage(true)(index)}
                >
                  <CancelIcon
                    style={{ color: darkMode ? "#0ed864" : "#134696" }}
                  />
                </IconButton>
              </div>
            </Grid>
          ))}
          {propertyUpdateInfo?.[attribute]?.map((elem, index) => (
            <Grid item xs={6} sm={4} md={3} lg={2} sx={gridSx} key={index}>
              <div style={{ position: "relative" }}>
                <img
                  src={URL.createObjectURL(elem)}
                  alt=""
                  className={classes.image}
                />
                <IconButton
                  sx={crossButton}
                  component="label"
                  onClick={() => handleRemoveImage(false)(index)}
                >
                  <CancelIcon
                    style={{ color: darkMode ? "#0ed864" : "#134696" }}
                  />
                </IconButton>
              </div>
            </Grid>
          ))}
          <Grid item xs={12} sm={4} md={3} lg={2} sx={gridSx}>
            <IconButton
              sx={{
                ...buttonSx,
                backgroundColor: darkMode ? "#212124" : "#fff",
                width: width > 500 ? 150 : 100,
                height: width > 500 ? 150 : 100,
              }}
              component="label"
            >
              <input
                hidden
                accept="image/png, image/jpeg"
                type="file"
                onInput={handleImagePicker(attribute)}
                multiple
              />
              <AddIcon style={{ color: darkMode ? "#0ed864" : "#134696" }} />
            </IconButton>
            {discarded?.[`${attribute}Count`] > 0 && (
              <span className={classes.helperText}>
                {discarded?.[`${attribute}Count`]} image(s) discarded (file
                size/name too large).
              </span>
            )}
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default ImageEdit;
