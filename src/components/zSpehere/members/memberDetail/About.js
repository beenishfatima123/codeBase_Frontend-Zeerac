import React from "react";
import { makeStyles } from "@mui/styles";
import editIcon from "../../../../assets/zSpehere/edit.png";
import eventIcon from "../../../../assets/zSpehere/events.png";
import { Divider } from "@mui/material";
import { useSelector } from "react-redux";
import { SETTING_URLS } from "../../../../utils/constants";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles(() => ({
  container: {
    padding: 20,
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    marginTop: 20,
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  heading: {
    fontSize: 20,
    color: "#134696",
    fontFamily: "medium",
  },
  icon: {
    cursor: "pointer",
  },
  description: {
    fontSize: 14,
    color: "#92929D",
    margin: "10px 0",
    minHeight: "auto",
    maxHeight: 75,
    overflowY: "scroll",
  },
  infoContainer: {
    display: "flex",
    margin: "10px 0",
  },
  info: {
    fontSize: 14,
    fontFamily: "light",
    color: "#92929D",
    marginLeft: 10,
  },
}));

/* Member detail container on member detailed container. */
const About = ({ openEdit }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { selectedMember } = useSelector((state) => state.zSphereMembers);
  // console.log({ selectedMember });
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div className={classes.heading}>About</div>
        <img
          alt="edit"
          src={editIcon}
          className={classes.icon}
          // onClick={openEdit}
          onClick={() => {
            navigate(`/settings/${SETTING_URLS?.PROFILE}`);
          }}
        />
      </div>
      <div className={classes.description}>
        {selectedMember?.personal_description}
      </div>
      <Divider />
      <div style={{ marginTop: 20 }}>
        {selectedMember?.experience?.length >= 1 && (
          <div className={classes.infoContainer}>
            <img alt="" src={eventIcon} />
            <div className={classes.info}>
              Worked At{" "}
              <span style={{ color: "#134696" }}>
                {selectedMember?.experience[0]?.company_name}
              </span>
            </div>
          </div>
        )}

        <div className={classes.infoContainer}>
          <img alt="" src={eventIcon} />
          <div className={classes.info}>
            Member of <span style={{ color: "#134696" }}>CEO Club</span>
          </div>
        </div>

        <div className={classes.infoContainer}>
          <img alt="" src={eventIcon} />
          <div className={classes.info}>
            From{" "}
            <span style={{ color: "#134696" }}>
              {selectedMember?.city || ""} {selectedMember?.country || ""}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
