import React from "react";
import { makeStyles } from "@mui/styles";
//import lines from "../../../../assets/zSpehere/cardPattern.svg";
import mobilePromotionBackground from "../../../../assets/home/mobilePromotionBackground.png";
import { Button, Divider } from "@mui/material";
import CustomTooltip from "../../../globalComponents/CustomTooltip";

const useStyles = makeStyles(() => ({
  container: {
    width: "100%",
    height: 300,
    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
    marginTop: 100,
    marginBottom: 20,
  },
  innerContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  imageContainer: {
    marginTop: -80,
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  groupImage: {
    width: 150,
    height: 150,
    border: "6px solid #134696",
    borderRadius: 10,
    objectFit: "cover",
  },
  heading: {
    color: "#134696",
    fontFamily: "heavy",
    fontSize: 24,
    textAlign: "center",
    marginTop: 10,
    textTransform: "capitalize",
  },
  admin: {
    color: "#B5B5BE",
    fontSize: 14,
    fontFamily: "medium",
    textAlign: "center",
  },
  statsContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "space-between",
    margin: 20,
  },
  value: {
    color: "#134696",
    fontFamily: "light",
    fontSize: 16,
    textAlign: "center",
  },
  label: {
    color: "#92929D",
    fontFamily: "light",
    fontSize: 14,
    textAlign: "center",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
}));

const groupBtnSx = {
  height: 40,
  padding: "10px 15px",
  cursor: "pointer",
  backgroundColor: "#0ed864",
  fontSize: 14,
  fontFamily: "medium",
  color: "#fff",
  margin: "10px 5px",
  border: "none",
  borderRadius: 0,
  textTransform: "capitalize",
  "&:hover": {
    backgroundColor: "#0ed864",
  },
};
const viewBtnSx = {
  height: 40,
  padding: "10px 15px",
  cursor: "pointer",
  backgroundColor: "#F1F1F5",
  fontSize: 14,
  fontFamily: "medium",
  color: "#696974",
  margin: "10px 5px",
  border: "none",
  borderRadius: 0,
  textTransform: "capitalize",
  "&:hover": {
    backgroundColor: "#F1F1F5",
  },
};
const cardNameLimit = 20;

/* detailed  card view of suggested group on right content using image, name, posts, members, event and join action.  */
const SuggestedGroupCard = ({
  groupName,
  admin,
  groupPhoto,
  posts,
  events,
  members,
  joinClick,
  viewClick,
  hideJoin,
  privateGroup,
  sendRequestClick,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.innerContainer}>
        <div className={classes.imageContainer}>
          <img
            alt=""
            src={groupPhoto || mobilePromotionBackground}
            className={classes.groupImage}
          />

          <CustomTooltip title={groupName}>
            <div className={classes.heading}>
              {groupName?.length > cardNameLimit
                ? groupName?.slice(0, cardNameLimit) + "..."
                : groupName}
            </div>
          </CustomTooltip>
          <div className={classes.admin}>{admin}</div>
        </div>
        {/* <img alt="" src={lines} /> */}
      </div>
      <div className={classes.statsContainer}>
        <div>
          <div className={classes.value}>{posts}</div>
          <div className={classes.label}>Posts</div>
        </div>
        <div>
          <div className={classes.value}>{members}</div>
          <div className={classes.label}>Members</div>
        </div>
        <div>
          <div className={classes.value}>{events}</div>
          <div className={classes.label}>Events</div>
        </div>
      </div>
      <Divider
        sx={{ margin: "20px 20px 10px 20px", backgroundColor: "#F1F1F5" }}
      />
      {privateGroup === true ? (
        <div className={classes.buttonContainer}>
          <Button
            sx={{
              ...viewBtnSx,
              backgroundColor: "#134696",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#134696",
              },
            }}
            onClick={sendRequestClick}
          >
            Send Join Request
          </Button>
        </div>
      ) : (
        <div className={classes.buttonContainer}>
          {hideJoin !== false && (
            <Button sx={groupBtnSx} onClick={joinClick}>
              Join Group
            </Button>
          )}

          <Button sx={viewBtnSx} onClick={viewClick}>
            View Group
          </Button>
        </div>
      )}
    </div>
  );
};

export default SuggestedGroupCard;
