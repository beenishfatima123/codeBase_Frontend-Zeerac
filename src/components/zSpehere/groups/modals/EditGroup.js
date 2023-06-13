import React, { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { Button, Modal } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import LoginContainer from "../../../loginComponents/LoginContainer";
import { getWordCount } from "../../../../utils/helperFunctions";
import ComponentLoader from "../../../globalComponents/ComponentLoader";
import GroupForm from "./GroupForm";
import {
  editGroup,
  resetEditGroup,
} from "../../../../redux/slices/groupsSlice";

const createButtonSx = {
  textTransform: "none",
  backgroundColor: "#134696",
  color: "#fff",
  borderRadius: "4px",
  fontSize: 16,
  fontFamily: "medium",
  mr: 2,
  "&:hover": {
    backgroundColor: "#134696",
  },
};
const cancelButtonSx = {
  textTransform: "none",
  backgroundColor: "#fff",
  color: "#134696",
  borderRadius: "4px",
  fontSize: 16,
  fontFamily: "medium",
  ml: 2,
  border: "1px solid lightGray",
};
const useStyles = makeStyles(() => ({
  container: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: 5,
    maxHeight: "90%",
    overflowY: "scroll",
    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
    display: "flex",
    flex: 1,
    flexDirection: "column",
    maxWidth: "98%",
    paddingRight: "0px !important",
  },
  buttonContainer: {
    display: "flex",
    flex: 1,
    margin: 10,
  },
  title: {
    fontSize: 22,
    color: "#134696",
    margin: "16px 10px",
    fontWeight: "bold",
  },
}));
/* This component is a modal for editing group details with form validation */
const EditGroupModal = ({ isOpen, setOpen }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [groupData, setGroupData] = useState();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const { selectedGroup, groupsApi } = useSelector((state) => state.groups);
  const { darkMode } = useSelector((state) => state.global);

  /* This custom hook retrieves the selected group and groups API status from the Redux store. */
  useEffect(() => {
    if (selectedGroup) {
      setGroupData(selectedGroup);
    }
  }, [selectedGroup]);

  /* This function handles the change events for the input fields in the GroupForm.
  It updates the 'groupData' state with the new values entered by the user. */
  const handleChange = (prop) => (event) => {
    setGroupData((prev) => ({
      ...prev,
      [prop]: event?.target?.value,
    }));
  };

  /*
  This function handles the update action when the user clicks the "Update Group" button.
  It performs form validation, dispatches an editGroup action with the updated group data, and displays success/error toasts.
  The groupData is converted into FormData using the getProfileFormData function.
  */
  const handleUpdate = () => {
    const invalid = validate(groupData);
    // console.log({ groupData, invalid });
    if (invalid) {
      toast.error(invalid, {
        position: toast.POSITION.BOTTOM_RIGHT,
        hideProgressBar: true,
      });
    } else {
      dispatch(
        editGroup({
          values: getProfileFormData(),
          token: currentUser?.token,
          id: selectedGroup?.id,
          from: "group",
        })
      );
      dispatch(resetEditGroup());
      setGroupData();
      setOpen(false);
      toast.success("Group Updated", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  /*
  This function validates the groupData object and checks for required fields and length limits.
  It returns an error message if any validation rule fails; otherwise, it returns null.
  */
  const validate = (data) => {
    if (
      !data?.description ||
      getWordCount(data?.description) < 3 ||
      getWordCount(data?.description) > 100
    )
      return "Description must be min. 3 and max. 100 words.";
    else if (!data?.name || data?.name?.length < 3 || data?.name?.length > 50)
      return "name must be between 3-50 characters";
    else if (!data?.cover_photo && !data?.new_cover_photo)
      return "A cover photo is required";
    else if (!data?.photo && !data?.new_photo)
      return "A group photo is required";
    else if (!data?.visibility) return "Please pick a visibility option";
    else return null;
  };

  /* This function constructs a FormData object based on the provided groupData, including fields like description, name, photo, cover_photo, and visibility. It is commonly used for sending data via HTTP requests. */
  const getProfileFormData = () => {
    const formData = new FormData();
    if (groupData?.description)
      formData?.append("description", groupData?.description);
    if (groupData?.name) formData?.append("name", groupData?.name);
    if (groupData?.new_photo) formData?.append("photo", groupData?.new_photo);
    if (groupData?.new_cover_photo)
      formData?.append("cover_photo", groupData?.new_cover_photo);
    formData?.append("visibility", groupData?.visibility);
    return formData;
  };

  return (
    <Modal
      open={isOpen}
      onClose={() => setOpen((prev) => !prev)}
      disableEnforceFocus
      disableAutoFocus
      disablePortal
    >
      <div
        className={classes.container}
        style={{
          backgroundColor: darkMode ? "#212124" : "#fff",
          minWidth: currentUser ? 500 : 350,
        }}
      >
        {currentUser ? (
          <>
            {groupsApi?.loadingCreate ? (
              <ComponentLoader />
            ) : (
              <>
                <p className={classes.title}>Group Details</p>
                <GroupForm
                  groupData={groupData}
                  handleChange={handleChange}
                  editing
                />
                <div className={classes.buttonContainer}>
                  <Button sx={createButtonSx} onClick={handleUpdate} fullWidth>
                    Update Group
                  </Button>
                  <Button
                    fullWidth
                    sx={cancelButtonSx}
                    onClick={() => setOpen((prev) => !prev)}
                  >
                    Cancel
                  </Button>
                </div>
              </>
            )}
          </>
        ) : (
          <LoginContainer
            style={{ backgroundColor: "white", alignSelf: "center" }}
          />
        )}
      </div>
    </Modal>
  );
};

export default EditGroupModal;
