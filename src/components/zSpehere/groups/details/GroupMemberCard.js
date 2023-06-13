import React from "react";
import { makeStyles } from "@mui/styles";
import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "10px 0px",
  },
  nameContainer: {
    marginLeft: 8,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  name: {
    fontSize: 14,
    color: "#415365",
    cursor: "pointer",
  },
  handle: {
    fontSize: 12,
    color: "#B7C1CF",
  },
  invite: {
    backgroundColor: "#f1f1f5",
    border: "none",
    color: "#696974",
    cursor: "pointer",
    borderRadius: 5,
    fontFamily: "medium",
    fontSize: 14,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px 10px",
  },
  btnDiv: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    marginLeft: 10,
  },
}));

/* card of each group member in group members list. */
const GroupMemberCard = ({ member, customStyle, endButton }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const { darkMode } = useSelector((state) => state.global);

  return (
    <div className={classes.container} style={customStyle}>
      <div style={{ display: "flex" }}>
        <Avatar
          alt={`${member?.first_name} ${member?.last_name}`}
          src={` ${member?.photo}`}
          sx={{ width: 42, height: 42 }}
        />
        <div className={classes.nameContainer}>
          <span
            className={classes.name}
            style={{
              color: darkMode ? "#fff" : "#415365",
            }}
            onClick={() => navigate(`/zSphere/user/${member?.id}`)}
          >
            {`${member?.first_name} ${member?.last_name}`}
          </span>
          <span className={classes.handle}>{`${
            member?.handle || "@anonymous"
          }`}</span>
        </div>
      </div>

      {endButton}
    </div>
  );
};

export default GroupMemberCard;
