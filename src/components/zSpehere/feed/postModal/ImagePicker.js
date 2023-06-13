import React, { useMemo, useState } from "react";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Cancel";
import "./feedStyles.css";
import { Box, IconButton } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { validateImageFiles } from "../../../../utils/helperFunctions";

const crossButton = {
  position: "absolute",
  top: 0,
  right: 0,
  p: 0,
  zIndex: 20,
};
const imageCrossButton = {
  position: "absolute",
  top: 0,
  right: 0,
  p: 0,
  zIndex: 20,
};
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

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    minHeight: 200,
    position: "relative",
    flex: 1,
    padding: 10,
    border: "1px solid lightGray",
    borderRadius: "10px",
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
  helperContainer: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
  },
  helperText: {
    fontSize: 12,
    color: "red",
    alignSelf: "flex-start",
  },
  helperTextTitle: {
    fontSize: 14,
    color: "red",
    alignSelf: "flex-start",
    fontFamily: "heavy",
    marginBottom: 10,
  },
}));

/* image selector component taking images, onchange, close call and post data setter as parameters.  */
const ImagePicker = ({ images, onChange, handleClose, setPostData }) => {
  const classes = useStyles();
  const { darkMode } = useSelector((state) => state.global);
  const [discardedFiles, setDiscardedFiles] = useState();

  /* get all discarded images using values. */
  const getDiscardedImageHelperText = (values) => {
    return (
      <div className={classes.helperContainer}>
        {values?.discardedForDuplicates?.length > 0 && (
          <>
            <span
              className={classes.helperTextTitle}
            >{`${values?.discardedForDuplicates?.length} files(s) discarded due to duplication: `}</span>
            {values?.discardedForDuplicates?.map((elem, index) => (
              <div key={index}>
                <span className={classes.helperText}>{`- ${elem?.name} `}</span>
              </div>
            ))}
            <br />
          </>
        )}

        {values?.discardedForName?.length > 0 && (
          <>
            <span
              className={classes.helperTextTitle}
            >{`${values?.discardedForName?.length} files(s) discarded due to invalid name: `}</span>
            {values?.discardedForName?.map((elem, index) => (
              <div key={index}>
                <span
                  className={classes.helperText}
                >{`- ${`${elem?.name}`?.substring(0, 10)}...`}</span>
                <br />
              </div>
            ))}
            <br />
          </>
        )}
        {values?.discardedForSize?.length > 0 && (
          <>
            <span
              className={classes.helperTextTitle}
            >{`${values?.discardedForSize?.length} files(s) discarded due to size limit: `}</span>
            {values?.discardedForSize?.map((elem, index) => (
              <div key={index}>
                <span className={classes.helperText}>{`- ${elem?.name} `}</span>
                <br />
              </div>
            ))}
          </>
        )}
      </div>
    );
  };

  /* on image input, store and validate and discard invalid. */
  const handleImageInput = async (event) => {
    var files = Array.from(event?.target?.files);
    const validFiles = validateImageFiles(files, images);
    setDiscardedFiles(validFiles?.discarded);

    onChange("images")({
      target: {
        value: validFiles?.filesToSave,
      },
    });
  };

  /* rendering text for image picker on each discard and upload. */
  const renderImageHelperText = useMemo(() => {
    return getDiscardedImageHelperText(discardedFiles);
    // eslint-disable-next-line
  }, [discardedFiles]);
  return (
    <div className={classes.container}>
      <IconButton
        sx={crossButton}
        component="label"
        onClick={() => {
          handleClose();
          setPostData((prev) => ({ ...prev, images: [] }));
        }}
      >
        <CancelIcon
          style={{
            color: "lightGray",
          }}
        />
      </IconButton>
      {images?.length > 0 && (
        <Box sx={{ width: "100%", height: 250, overflowY: "scroll" }}>
          <ImageList variant="quilted" cols={2} gap={8}>
            {images.map((item, index) => (
              <ImageListItem key={index}>
                <img
                  src={URL.createObjectURL(item)}
                  // src={item}
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
        </Box>
      )}
      <IconButton
        sx={{
          ...buttonSx,
          backgroundColor: darkMode ? "#2f2f33" : "#fff",
        }}
        component="label"
        disabled={Boolean(images?.length >= 5)}
      >
        <input
          hidden
          accept="image/png, image/jpeg"
          type="file"
          onInput={handleImageInput}
          multiple
        />
        <span style={{ color: darkMode ? "#fff" : "#000" }}>
          {images?.length < 1 || images?.length === undefined
            ? "Add Images"
            : images?.length < 5
            ? `Add Images ${images?.length || 0}/5`
            : "5/5"}
        </span>
        {images?.length < 5 && (
          <AddIcon
            style={{
              color: darkMode ? "#0ed864" : "#134696",
            }}
          />
        )}
      </IconButton>

      {discardedFiles?.total > 0 && <>{renderImageHelperText}</>}
    </div>
  );
};

export default ImagePicker;
