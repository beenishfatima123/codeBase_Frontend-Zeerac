import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 20px",
    borderTop: "1px solid #E2E2EA",
    borderBottom: "1px solid #E2E2EA",
  },
  nameContainer: {
    display: "flex",
    alignItems: "center",
  },
  btnContainer: {
    display: "flex",
    alignItems: "center",
  },
  icon: {
    width: 50,
    height: 50,
    objectFit: "contain",
  },
  title: {
    fontSize: 18,
    fontFamily: "medium",
    color: "#134696",
  },
  description: {
    fontSize: 12,
    fontFamily: "medium",
    color: "#696974",
    marginTop: 5,
  },
  "@media (max-width: 500px)": {
    icon: {
      width: 40,
      height: 40,
      objectFit: "contain",
    },
    title: {
      fontSize: 16,
    },
    btnContainer: {
      flexDirection: "column",
    },
  },
}));

/* individual group settings container */
const GroupSettingsList = ({
  icon,
  title,
  description,
  btn1,
  btn2,
  location,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.nameContainer}>
        <img
          alt=""
          src={icon}
          className={classes.icon}
          style={{
            borderRadius: location && "50%",
            objectFit: location ? "cover" : "contain",
          }}
        />
        <div style={{ marginLeft: 20 }}>
          <div className={classes.title}>{title}</div>
          <div className={classes.description}>{description}</div>
        </div>
      </div>
      {location && (
        <div className={classes.location}>
          <div className={classes.description}>{location}</div>
        </div>
      )}
      <div className={classes.btnContainer}>
        <div>{btn1}</div>
        <div>{btn2}</div>
      </div>
    </div>
  );
};

export default GroupSettingsList;
