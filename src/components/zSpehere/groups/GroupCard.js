import React from "react";
import { makeStyles } from "@mui/styles";
import { Avatar, IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
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

/* GroupCard takes group and style and displays individual group in list. */
const GroupCard = ({ group, customStyle }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const { darkMode } = useSelector((state) => state.global);

  return (
    <div className={classes.container} style={customStyle}>
      <div style={{ display: "flex" }}>
        <Avatar
          alt={`${group?.name}`}
          src={` ${group?.photo}`}
          sx={{ width: 42, height: 42 }}
        />
        <div className={classes.nameContainer}>
          <span
            className={classes.name}
            style={{
              color: darkMode ? "#fff" : "#415365",
            }}
            onClick={() => navigate(`/zSphere/Groups/${group?.id}`)}
          >
            {`${group?.name}`}
          </span>
          <span className={classes.handle}>
            {"Last Active "}
            {moment(group?.updated_at).add(5, "h").fromNow()}
          </span>
        </div>
      </div>

      <IconButton
        sx={{
          ml: "10px",
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          height: 34,
          width: 34,
        }}
        onClick={() => navigate(`/zSphere/Groups/${group?.id}`)}
      >
        <ArrowForwardIosIcon
          style={{ color: darkMode ? "#0ed864" : "#134696", fontSize: 20 }}
        />
      </IconButton>
    </div>
  );
};

export default GroupCard;
