import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Button, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  resetUpdate,
  setPropertyToEdit,
  updateProperty,
} from "../../../../../redux/slices/propertiesSlice";
import { getPostUpdateFormData } from "../../../../../utils/helperFunctions";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "space-between",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    margin: "10px 3px",
  },
  title: {
    fontSize: 35,
    fontFamily: "heavy",
    textTransform: "uppercase",
  },
  btnContainer: {
    display: "flex",
  },
  "@media (max-width: 500px)": {
    title: {
      fontSize: 28,
    },
  },
}));
/* The top section on edit auctions page. Containing two buttons for save and cancel. */
const TopCard = ({ validation }) => {
  const classes = useStyles();
  const containerRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { darkMode } = useSelector((state) => state.global);
  const { propertyUpdateInfo, propertyToEdit, updateApiInfo } = useSelector(
    (state) => state.properties
  );
  const currentUser = useSelector((state) => state.auth.currentUser);

  const [containerWidth, setContainerWidth] = useState();

  useEffect(() => {
    if (updateApiInfo?.error) {
      toast.error("something went wrong", {
        position: toast.POSITION.TOP_CENTER,
        progressStyle: { backgroundColor: "#014493" },
      });
      dispatch(resetUpdate());
    }
    // eslint-disable-next-line
  }, [updateApiInfo?.error]);
  useEffect(() => {
    if (updateApiInfo?.success) {
      toast.success("Listing updated successfully", {
        position: toast.POSITION.TOP_CENTER,
        progressStyle: { backgroundColor: "#014493" },
      });
      dispatch(resetUpdate());
      dispatch(setPropertyToEdit(null));
    }
    // eslint-disable-next-line
  }, [updateApiInfo?.success]);

  /* this useEffect sets container width using containerRef. */
  useEffect(() => {
    if (containerRef)
      setContainerWidth(containerRef?.current?.parentElement?.offsetWidth);
  }, [containerRef]);

  /* upon submit, the handleUpdate dispatches updated slice information to the slice. If validation fails, display error in toast. */
  const handleUpdate = () => {
    // // console.log({ propertyUpdateInfo, propertyToEdit, validation });

    if (propertyUpdateInfo) {
      const invalid = checkValidation();
      if (invalid) {
        toast.error(invalid, {
          position: toast.POSITION.TOP_CENTER,
          progressStyle: { backgroundColor: "#014493" },
        });
      } else {
        dispatch(
          updateProperty({
            id: propertyToEdit?.id,
            token: currentUser?.token,
            form: getPostUpdateFormData(propertyUpdateInfo),
          })
        );
      }
    } else
      toast.info("No changes made", {
        position: toast.POSITION.TOP_CENTER,
        progressStyle: { backgroundColor: "#014493" },
      });
  };

  const checkValidation = () => {
    let invalid = false;
    Object.keys(validation).forEach((element) => {
      if (validation?.[element]) invalid = validation?.[element];
    });
    return invalid;
  };
  const handleCancel = () => {
    navigate(-1);
    dispatch(setPropertyToEdit(null));
  };
  return (
    <div
      className={classes.container}
      ref={containerRef}
      style={{
        flexDirection: containerWidth > 650 ? "row" : "column",
        alignItems: containerWidth > 650 ? "center" : "flex-start",
        backgroundColor: darkMode ? "#2f2f33" : "#fff",
      }}
    >
      <span
        className={classes.title}
        style={{
          color: darkMode ? "#0ed864" : "#134696",
        }}
      >
        Edit property
      </span>
      <Grid
        container
        sx={{ display: "flex", flex: 1, justifyContent: "flex-end" }}
        spacing={2}
      >
        <Grid item xs={6} md={4} sm={6} lg={3}>
          <Button
            fullWidth
            sx={{
              backgroundColor: darkMode ? "#0ed864" : "#134696",
              color: "#fff",
              fontFamily: "heavy",
              borderRadius: 25,
              fontSize: containerWidth > 500 ? 15 : 10,
              mr: 1,
              "&:hover": {
                backgroundColor: darkMode ? "#0ed864" : "#134696",
              },
            }}
            onClick={handleUpdate}
          >
            Save Changes
          </Button>
        </Grid>
        <Grid item xs={6} md={4} sm={6} lg={3}>
          <Button
            fullWidth
            sx={{
              backgroundColor: "#fff",
              color: "#134696",
              fontFamily: "heavy",
              borderRadius: 25,
              fontSize: containerWidth > 500 ? 15 : 10,
              boxShadow:
                "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
              "&:hover": {
                backgroundColor: "#fff",
              },
            }}
            onClick={handleCancel}
            endIcon={
              <CancelIcon style={{ color: darkMode ? "#0ed864" : "#134696" }} />
            }
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default TopCard;
