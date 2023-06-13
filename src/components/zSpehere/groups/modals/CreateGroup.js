import React from "react";
import { makeStyles } from "@mui/styles";
import { Button, Modal } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import LoginContainer from "../../../loginComponents/LoginContainer";
import { getWordCount } from "../../../../utils/helperFunctions";
import ComponentLoader from "../../../globalComponents/ComponentLoader";
import GroupForm from "./GroupForm";
import { createGroup } from "../../../../redux/slices/groupsSlice";

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

/* Modal component for creating group. */
const CreateModal = ({ isOpen, setOpen }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [groupData, setGroupeData] = useState();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const { groupsApi } = useSelector((state) => state.groups);
  const { darkMode } = useSelector((state) => state.global);

  /* Set group data with updated changed event target value. */
  const handleChange = (prop) => (event) => {
    setGroupeData((prev) => ({
      ...prev,
      [prop]: event?.target?.value,
    }));
  };

  /* validate group data and dispatch to create group. */
  const handleCreate = () => {
    //console.log({ groupData });
    const invalid = validate(groupData);
    //console.log({ groupData, invalid });
    if (invalid) {
      toast.error(invalid, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else {
      dispatch(
        createGroup({
          values: getProfileFormData(),
          token: currentUser?.token,
        })
      );
      setGroupeData();
      setOpen(false);
      toast.success("Group Created.", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  /* Take data from form and validate each entry. If invalid, return error message. */
  const validate = (data) => {
    if (
      !data?.description ||
      getWordCount(data?.description) < 3 ||
      getWordCount(data?.description) > 100
    )
      return "Description must be min. 10 and max. 100 words.";
    else if (!data?.name || data?.name?.length < 3 || data?.name?.length > 50)
      return "name must be between 3-50 characters";
    else if (!data?.cover_photo) return "A cover photo is required";
    else if (!data?.photo) return "A group photo is required";
    else if (!data?.visibility) return "Please select any privacy option";
    else return null;
  };

  /* Construct a FormData object based on the provided groupData, including fields like description, name, photo, cover_photo, and visibility. */
  const getProfileFormData = () => {
    const formData = new FormData();
    if (groupData?.description)
      formData?.append("description", groupData?.description);
    if (groupData?.name) formData?.append("name", groupData?.name);
    if (groupData?.photo) formData?.append("photo", groupData?.photo);
    if (groupData?.cover_photo)
      formData?.append("cover_photo", groupData?.cover_photo);
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
                <GroupForm groupData={groupData} handleChange={handleChange} />
                <div className={classes.buttonContainer}>
                  <Button
                    sx={{
                      ...createButtonSx,
                      backgroundColor: darkMode ? "#0ed864" : "#134696",
                    }}
                    onClick={handleCreate}
                    fullWidth
                  >
                    Create Group
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

export default CreateModal;
