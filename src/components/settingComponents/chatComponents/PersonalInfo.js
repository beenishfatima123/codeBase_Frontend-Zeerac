import React, { Suspense, lazy, useState } from "react";

import moment from "moment";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
// import plusIcon from '../../../assets/settings/plus.png';
// import bellIcon from "../../../assets/settings/bell.png";
import ComponentLoader from "../../globalComponents/ComponentLoader";
import useColor from "../../../utils/hooks/useColor";
import { TextTranslation } from "../../../utils/translation";
const UsersModal = lazy(() => import("./UsersModal"));

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
  right: {
    display: "flex",
  },
  addButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#ffffff",
    backgroundColor: "#134696",
    height: 52,
    padding: "0 10px",
    borderRadius: 10,
    cursor: "pointer",
    fontFamily: "light",
    fontSize: 16,
    marginRight: 10,
  },
  iconButton: {
    height: 52,
    width: 52,
    //    padding: '0 10px',
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid #6B7B88",
    borderRadius: 10,
    cursor: "pointer",
  },
}));

/* PersonalInfo is displayed on top of messages window containing the welcome message with user's name, day and date. */
const PersonalInfo = () => {
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false);
  const { colors, langIndex } = useSelector((state) => state.global);
  useColor(colors);

  const currentUser = useSelector((state) => state.auth.currentUser);
  return (
    <Suspense fallback={<ComponentLoader />}>
      <div className={classes.container}>
        {openModal && <UsersModal isOpen={openModal} setOpen={setOpenModal} />}

        <div className={classes.left}>
          <div className={classes.user} style={{ color: colors?.primary }}>
            {TextTranslation.welcome[langIndex]}, {currentUser?.first_name}
            &nbsp;{currentUser?.last_name}
          </div>
          <div className={classes.date}>
            {moment().format("dddd, DD MMMM YYYY")}
          </div>
        </div>
        <div className={classes.right}>
          {/* <div
            className={classes.addButton}
            style={{ backgroundColor: colors?.primary }}
            onClick={() => setOpenModal(true)}
          >
            <img alt="add" src={plusIcon} />
            New Chat
          </div> */}
          {/* <div className={classes.iconButton}>
            <img alt="bell" src={bellIcon} />
          </div> */}
        </div>
      </div>
    </Suspense>
  );
};

export default PersonalInfo;
