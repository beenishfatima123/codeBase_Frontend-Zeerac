import React from "react";
import { makeStyles } from "@mui/styles";
import { Button, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { useMemo } from "react";
import { useSelector } from "react-redux";
import ComponentLoader from "../../../globalComponents/ComponentLoader";
const btnSx = {
  textTransform: "none",
  color: "#696974",
  backgroundColor: "#F1F1F5",
  "&:hover": {
    color: "#000",
    backgroundColor: "#F1F1F5",
  },
  borderRadius: "5px",
  mr: 1,
  padding: "6px 24px",
};
const followingBtnSx = {
  textTransform: "none",
  color: "#fff",
  backgroundColor: "#134696",
  "&:hover": {
    color: "#000",
    backgroundColor: "#F1F1F5",
  },
  borderRadius: "5px",
  mr: 1,
  padding: "6px 24px",
  maxWidth: 100,
};
const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
  },
  endBtnContainer: {
    display: "flex",
    alignItems: "center",
  },
}));

/* follow and menu button at end of member card in group details. */
const CardEndButton = ({
  setAnchorEl,
  setSelectedUser,
  handleFollow,
  user,
  loading,
}) => {
  const classes = useStyles();
  const { currentUser, zsphereData } = useSelector((state) => state.auth);
  const { darkMode } = useSelector((state) => state.global);

  /* return following bool true of false for each user. */
  const isFollowing = useMemo(() => {
    let _following = false;

    zsphereData?.followingIds?.forEach((elem) => {
      if (elem + "" === user?.id + "") _following = true;
    });
    if (user?.id === currentUser?.id) _following = true;
    return _following;
  }, [user, zsphereData?.followingIds, currentUser?.id]);

  return (
    <div className={classes.container}>
      {loading ? (
        <ComponentLoader
          customImageStyle={{
            height: 40,
            width: 40,
          }}
        />
      ) : (
        <div className={classes.endBtnContainer}>
          {currentUser?.id !== user?.id && (
            <Button
              startIcon={!isFollowing && <AddIcon />}
              sx={!isFollowing ? followingBtnSx : btnSx}
              onClick={() => handleFollow(user)}
            >
              {isFollowing ? "Following" : "Follow"}
            </Button>
          )}

          <IconButton
            onClick={(e) => {
              setAnchorEl(e?.currentTarget);
              setSelectedUser(user);
            }}
          >
            <MoreVertIcon style={{ color: darkMode ? "#fff" : "#000" }} />
          </IconButton>
        </div>
      )}
    </div>
  );
};

export default CardEndButton;
