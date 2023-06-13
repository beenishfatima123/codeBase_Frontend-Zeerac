import React from "react";
import moment from "moment/moment";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
//import bellIcon from '../../../assets/settings/bell.png';
import useColor from "../../../utils/hooks/useColor";
import { TextTranslation } from "../../../utils/translation";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: 70,
    borderBottom: "1px solid #D7DFE8",
  },
  left: {
    display: "flex",
    flexDirection: "column",
  },
  user: {
    fontSize: 24,
    fontFamily: "heavy",
    color: "#134696",
  },
  date: {
    fontSize: 16,
    fontFamily: "light",
    color: "#ADA7A7",
  },
  iconButton: {
    height: 52,
    width: 52,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid #6B7B88",
    borderRadius: 10,
    cursor: "pointer",
  },
}));

/* Personal Info displays welcome message on top of settings page with user name and current date. */
const PersonalInfo = () => {
  const classes = useStyles();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const { colors, langIndex } = useSelector((state) => state.global);
  useColor(colors);

  return (
    <>
      <div className={classes.container}>
        <div className={classes.left}>
          <div className={classes.user} style={{ color: colors?.primary }}>
            {TextTranslation.welcome[langIndex]}, {currentUser?.first_name}
            &nbsp;
            {currentUser?.last_name}
          </div>
          <div className={classes.date}>
            {moment().format("dddd, DD MMMM YYYY")}
          </div>
        </div>

        {/* <div className={classes.iconButton}>
          <img alt="bell" src={bellIcon} />
        </div> */}
      </div>
    </>
  );
};

export default PersonalInfo;
