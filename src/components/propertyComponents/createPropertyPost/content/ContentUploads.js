import React, { useMemo, useState } from "react";
import { makeStyles } from "@mui/styles";
import { DEFAULT_SHADOW, MAX_IMAGE_COUNT } from "../../../../utils/constants";
import { Grid, IconButton, Skeleton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { setPropertyData } from "../../../../redux/slices/createPropertySlice";
import CancelIcon from "@mui/icons-material/Cancel";
import { TextTranslation } from "../../../../utils/translation";
import {
  validateImageFiles,
  watermarkImages,
} from "../../../../utils/helperFunctions";

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
  top: 5,
  right: "5%",
  p: 0,
};
const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    padding: "20px 0px",
    flexDirection: "column",
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
    height: "80%",
    width: "80%",
  },
  helperContainer: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    padding: "8px 16px",
  },
  helperText: {
    fontSize: 12,
    color: "red",
    alignSelf: "flex-start",
    marginLeft: 15,
  },
  helperTextTitle: {
    fontSize: 14,
    color: "red",
    alignSelf: "flex-start",
    marginLeft: 15,
    fontFamily: "heavy",
    marginBottom: 10,
  },
}));
const ContentUploads = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [discarded, setDiscarded] = useState();
  const [loading, setLoading] = useState();

  const propertyData = useSelector(
    (state) => state.createProperty.propertyData
  );
  const { darkMode, langIndex } = useSelector((state) => state.global);

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
                <span className={classes.helperText}>{`- ${elem?.name} `}</span>
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
  const handleImagePicker = (prop) => async (event) => {
    setLoading(prop);
    var files = Array.from(event?.target?.files);
    // console.log({ files });
    const validFiles = validateImageFiles(files, propertyData?.[prop]);
    // console.log({ validFiles });
    setDiscarded({
      ...discarded,
      [`${prop}Count`]: validFiles?.discarded,
    });
    const watermarkedFiles = await watermarkImages(
      Array.from(validFiles?.filesToSave)
    );
    dispatch(
      setPropertyData({
        ...propertyData,
        [prop]: propertyData?.[prop]?.length
          ? [...propertyData?.[prop], ...watermarkedFiles]
          : watermarkedFiles,
      })
    );
    setLoading(null);
  };
  const handleRemoveImage = (prop) => (position) => {
    dispatch(
      setPropertyData({
        ...propertyData,
        [prop]: propertyData?.[prop]?.filter(
          (elem, index) => index !== position
        ),
      })
    );
  };
  const renderImageHelperText = useMemo(() => {
    return getDiscardedImageHelperText(discarded?.imagesCount);
    // eslint-disable-next-line
  }, [discarded?.imagesCount]);
  const renderFloorImageHelperText = useMemo(() => {
    return getDiscardedImageHelperText(discarded?.floorPlanCount);
    // eslint-disable-next-line
  }, [discarded?.floorPlanCount]);
  return (
    <div className={classes.container}>
      <span
        className={classes.title}
        style={{
          borderBottom: darkMode ? "1px solid #0ed864" : "1px solid #134696",
          color: darkMode ? "#0ed864" : "#134696",
        }}
      >
        {TextTranslation.uploadImages[langIndex]}
      </span>
      <Grid container columnSpacing={1} sx={{ transition: "0.5s" }}>
        {propertyData?.images?.map((elem, index) => (
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
              <CancelIcon style={{ color: darkMode ? "#0ed864" : "#134696" }} />
            </IconButton>
          </Grid>
        ))}
        {loading === "images" ? (
          <Grid item xs={6} sx={gridSx}>
            <Skeleton
              width={250}
              height={150}
              variant={"rectangular"}
              sx={{ borderRadius: "10px" }}
            />
          </Grid>
        ) : (
          <>
            <Grid item xs={6} sx={gridSx}>
              <IconButton
                sx={{
                  ...buttonSx,
                  backgroundColor: darkMode ? "#2f2f33" : "#fff",
                }}
                component="label"
                disabled={Boolean(propertyData?.["images"]?.length >= 5)}
              >
                <input
                  hidden
                  accept="image/png, image/jpeg"
                  type="file"
                  onInput={handleImagePicker("images")}
                  multiple
                />
                <span style={{ color: darkMode ? "#fff" : "#000" }}>
                  {propertyData?.["images"]?.length < 1 ||
                  propertyData?.["images"]?.length === undefined
                    ? "Add Images"
                    : propertyData?.["images"]?.length < 5
                    ? `Add Images ${
                        propertyData?.["images"]?.length || 0
                      }/${MAX_IMAGE_COUNT}`
                    : "5/5"}
                </span>
                {(propertyData?.["images"]?.length < 5 ||
                  propertyData?.["images"]?.length === undefined) && (
                  <AddIcon
                    style={{
                      color: darkMode ? "#0ed864" : "#134696",
                    }}
                  />
                )}
              </IconButton>
            </Grid>
          </>
        )}
      </Grid>
      {discarded?.imagesCount?.total > 0 && loading !== "images" && (
        <>{renderImageHelperText}</>
      )}

      <span
        className={classes.title}
        style={{
          borderBottom: darkMode ? "1px solid #0ed864" : "1px solid #134696",
          color: darkMode ? "#0ed864" : "#134696",
        }}
      >
        {TextTranslation.uploadFloorPlan[langIndex]}
      </span>
      <Grid container columnSpacing={1} sx={{ transition: "0.5s" }}>
        {propertyData?.floorPlan?.map((elem, index) => (
          <Grid item xs={6} sx={gridSx} key={index}>
            <img
              src={URL.createObjectURL(elem)}
              alt=""
              className={classes.image}
            />
            <IconButton
              sx={crossButton}
              component="label"
              onClick={() => handleRemoveImage("floorPlan")(index)}
            >
              <CancelIcon style={{ color: darkMode ? "#0ed864" : "#134696" }} />
            </IconButton>
          </Grid>
        ))}
        {loading === "floorPlan" ? (
          <Grid item xs={6} sx={gridSx}>
            <Skeleton
              width={250}
              height={150}
              variant={"rectangular"}
              sx={{ borderRadius: "10px" }}
            />
          </Grid>
        ) : (
          <Grid item xs={6} sx={gridSx}>
            <IconButton
              sx={{
                ...buttonSx,
                backgroundColor: darkMode ? "#2f2f33" : "#fff",
              }}
              component="label"
              disabled={Boolean(propertyData?.["floorPlan"]?.length >= 5)}
            >
              <input
                hidden
                type="file"
                onInput={handleImagePicker("floorPlan")}
                accept="image/png, image/jpeg"
                multiple
              />
              <span style={{ color: darkMode ? "#fff" : "#000" }}>
                {propertyData?.["floorPlan"]?.length < 1 ||
                propertyData?.["floorPlan"]?.length === undefined
                  ? "Add Images"
                  : propertyData?.["floorPlan"]?.length < 5
                  ? `Add Images ${
                      propertyData?.["floorPlan"]?.length || 0
                    }/${MAX_IMAGE_COUNT}`
                  : "5/5"}
              </span>
              {(propertyData?.["floorPlan"]?.length < 5 ||
                propertyData?.["floorPlan"]?.length === undefined) && (
                <AddIcon
                  style={{
                    color: darkMode ? "#0ed864" : "#134696",
                  }}
                />
              )}
            </IconButton>
          </Grid>
        )}
      </Grid>
      {discarded?.floorPlanCount?.total > 0 && loading !== "floorPlan" && (
        <>{renderFloorImageHelperText}</>
      )}
    </div>
  );
};

export default ContentUploads;
