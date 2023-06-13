import React, { useMemo } from "react";
import { makeStyles } from "@mui/styles";
import "../groups.css";
import { useSelector } from "react-redux";
import { Grid, IconButton } from "@mui/material";
import {
  MAX_IMAGE_FILE_NAME,
  MAX_IMAGE_SIZE,
} from "../../../../utils/constants";
import { toast } from "react-toastify";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { getWordCount } from "../../../../utils/helperFunctions";
const PRIVACY_OPTIONS = ["Public", "Private"];
const buttonSx = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 50,
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    margin: "5px 10px",
  },

  label: {
    fontSize: 15,
    opacity: 0.4,
    marginBottom: 10,
    fontWeight: "bold",
  },
  dropdownContainer: {
    display: "flex",
    flex: 1,
    padding: "8px 16px",
    borderRadius: 5,
    border: "1px solid lightGray",
  },
  imageContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    borderRadius: "10px",
    border: "1px solid lightGray",
    position: "relative",
    minHeight: 200,
  },
  coverPhoto: {
    objectFit: "cover",
    width: "100%",
    maxHeight: 200,
  },
  error: {
    color: "red",
    margin: 5,
    fontSize: 12,
  },
}));

/* Form for creating group */
const GroupForm = ({ groupData, handleChange, editing }) => {
  const classes = useStyles();
  const { darkMode } = useSelector((state) => state.global);

  /* Function to validate the selected image file */
  const validateImage = (file) => {
    if (file?.name?.length > MAX_IMAGE_FILE_NAME) {
      return "File name is invalid";
    } else if (file?.size / 1024 ** 2 > MAX_IMAGE_SIZE) {
      return "File size too large";
    } else return null;
  };
  /* Handle image input change using event target files */
  const handleImageInput = (prop) => (e) => {
    const inValid = validateImage(e?.target?.files[0]);
    if (inValid) {
      toast.error(inValid, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else handleChange(prop)({ target: { value: e?.target?.files[0] } });
  };

  /* Validate description length */
  const descriptionValidation = useMemo(() => {
    if (
      getWordCount(groupData?.description) < 3 ||
      getWordCount(groupData?.description) > 100
    )
      return "Description must be min. 3 and max. 100 words.";
  }, [groupData]);

  /* Validate name length */
  const nameValidation = useMemo(() => {
    if (groupData?.name?.length < 3 || groupData?.name?.length > 50)
      return "name must be between 3-50 characters";
  }, [groupData]);
  return (
    <div className={classes.container}>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <span
            className={classes.label}
            style={{
              color: darkMode ? "#fff" : "#000",
              opacity: darkMode ? 1 : 0.4,
            }}
          >
            Group Name
          </span>
          <input
            placeholder="Name"
            value={groupData?.name || ""}
            onChange={handleChange("name")}
            className="group-input"
            style={{
              color: darkMode ? "#fff" : "#000",
            }}
          />
          {nameValidation && (
            <span className={classes.error}>{nameValidation}</span>
          )}
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <span
            className={classes.label}
            style={{
              color: darkMode ? "#fff" : "#000",
              opacity: darkMode ? 1 : 0.4,
            }}
          >
            Group Privacy
          </span>
          <div className={classes.dropdownContainer}>
            <select
              className="group-select"
              onChange={handleChange("visibility")}
              value={groupData?.visibility || ""}
              style={{
                color: darkMode ? "#fff" : "#000",
                background: "none",
              }}
            >
              <option
                value=""
                disabled
                style={{ fontWeight: "bold", color: "red" }}
              >
                {"Please choose a privacy option"}
              </option>
              {PRIVACY_OPTIONS?.map((elem, index) => (
                <option value={elem} key={index}>
                  {elem}
                </option>
              ))}
            </select>
          </div>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <span
            className={classes.label}
            style={{
              color: darkMode ? "#fff" : "#000",
              opacity: darkMode ? 1 : 0.4,
            }}
          >
            Description
          </span>
          <textarea
            placeholder="Description"
            value={groupData?.description || ""}
            onChange={handleChange("description")}
            className="group-input"
            rows={5}
            style={{
              color: darkMode ? "#fff" : "#000",
            }}
          />
          {descriptionValidation && (
            <span className={classes.error}>{descriptionValidation}</span>
          )}
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span
            className={classes.label}
            style={{
              color: darkMode ? "#fff" : "#000",
              opacity: darkMode ? 1 : 0.4,
            }}
          >
            Cover Photo
          </span>
          <div
            className={classes.imageContainer}
            style={{ backgroundColor: darkMode ? "#2f2f33" : "#fff" }}
          >
            {groupData?.new_cover_photo ? (
              <img
                alt=""
                className={classes.coverPhoto}
                src={URL.createObjectURL(groupData?.new_cover_photo)}
              />
            ) : (
              <>
                {groupData?.cover_photo && (
                  <img
                    alt=""
                    className={classes.coverPhoto}
                    src={
                      editing
                        ? groupData?.cover_photo
                        : URL.createObjectURL(groupData?.cover_photo)
                    }
                  />
                )}
              </>
            )}

            <IconButton sx={buttonSx} component="label">
              <input
                hidden
                accept="image/png, image/jpeg"
                type="file"
                onInput={handleImageInput(
                  editing ? "new_cover_photo" : "cover_photo"
                )}
              />
              <FileUploadOutlinedIcon style={{ fontSize: 40, color: "#000" }} />
              <span
                style={{
                  color: darkMode ? "#fff" : "#000",
                  fontSize: 16,
                  marginTop: 5,
                  fontWeight: "bold",
                }}
              >
                {groupData?.cover_photo ? "Change" : "Upload"} Cover Photo
              </span>
            </IconButton>
          </div>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span
            className={classes.label}
            style={{
              color: darkMode ? "#fff" : "#000",
              opacity: darkMode ? 1 : 0.4,
            }}
          >
            Group Photo
          </span>
          <div
            className={classes.imageContainer}
            style={{ backgroundColor: darkMode ? "#2f2f33" : "#fff" }}
          >
            {groupData?.new_photo ? (
              <img
                alt=""
                className={classes.coverPhoto}
                src={URL.createObjectURL(groupData?.new_photo)}
              />
            ) : (
              <>
                {groupData?.photo && (
                  <img
                    alt=""
                    className={classes.coverPhoto}
                    src={
                      editing
                        ? groupData?.photo
                        : URL.createObjectURL(groupData?.photo)
                    }
                  />
                )}
              </>
            )}

            <IconButton sx={buttonSx} component="label">
              <input
                hidden
                accept="image/png, image/jpeg"
                type="file"
                onInput={handleImageInput(editing ? "new_photo" : "photo")}
              />
              <FileUploadOutlinedIcon style={{ fontSize: 40, color: "#000" }} />
              <span
                style={{
                  color: darkMode ? "#fff" : "#000",
                  fontSize: 16,
                  marginTop: 5,
                  fontWeight: "bold",
                }}
              >
                {groupData?.photo ? "Change" : "Upload"} Photo
              </span>
            </IconButton>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default GroupForm;
