import React from "react";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import { POST_VISIBILITY_OPTIONS } from "../../../../utils/constants";
import "./feedStyles.css";
import { Avatar } from "@mui/material";
import { useLocation } from "react-router-dom";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    marginBottom: 10,
  },
  heading: {
    color: "#014493",
    textAlign: "center",
    fontSize: 18,
    fontFamily: "heavy",
  },
  ventricle: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 10,
  },
  name: {
    fontSize: 15,
    textTransform: "capitalize",
  },
  time: {
    fontSize: 16,
  },
  selectContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: "4px",
    borderRadius: 10,
    flex: 1,
    backgroundColor: "lightGray",
    width: 90,
    cursor: "pointer",
  },
}));

/* display user details with create and edit post modal. */
const User = ({ value, onChange }) => {
  const classes = useStyles();
  const location = useLocation();
  const { darkMode } = useSelector((state) => state.global);
  const currentUser = useSelector((state) => state.auth.currentUser);

  return (
    <div className={classes.container}>
      <Avatar
        alt={`${currentUser?.first_name} ${currentUser?.last_name} `}
        src={` ${currentUser?.photo}`}
        sx={{ width: 40, height: 40, fontSize: 16 }}
      />
      <div className={classes.ventricle}>
        <span
          className={classes.name}
          style={{
            color: darkMode ? "#0ED864" : "#134696",
          }}
        >
          {`${currentUser?.first_name} ${currentUser?.last_name} `}
        </span>
        {location?.pathname?.includes("Groups") && (
          <div className={classes.selectContainer}>
            <select
              className="account-select"
              value={value || ""}
              onChange={onChange}
            >
              {POST_VISIBILITY_OPTIONS?.map((elem, index) => (
                <option value={elem} key={index}>
                  {elem}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
};

export default User;
