import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
//import IconsContainer from "../../propertyComponents/misc/IconsContainer";
import { HEADER_CONTENT_WIDTH } from "../../../utils/constants";
import parse from "html-react-parser";
import InvestmentPlan from "./InvestmentPlan";
import AdditionalImages from "./AdditionalImages";
import Location from "./Location";
import ButtonsIconContainer from "../../propertyComponents/misc/ButtonsIconContainer";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    width: HEADER_CONTENT_WIDTH,
    maxWidth: "90%",
    alignSelf: "center",
  },
  topContainer: {
    display: "flex",
    flex: 1,
    justifyContent: "space-between",
    padding: "0px 2%",
    minHeight: 100,
    position: "relative",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    padding: "20px 2%",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    fontFamily: "medium",
    color: "#134696",
    margin: 0,
    textTransform: "capitalize",
  },
  location: {
    color: "#1A2954",
    fontSize: 27,
  },
  iconsStyle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonsIconStyle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "flex-end",
  },
  description: {
    color: "#7D7D7D",
    fontSize: 16,
    fontFamily: "light !important",
  },
  logoContainer: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  companyLogo: {
    height: 230,
    width: 230,
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    position: "absolute",
    left: 0,
    bottom: 0,
    backgroundColor: "white",
    borderRadius: 10,
  },
  heading: {
    color: "#134696",
    fontSize: 22,
    fontFamily: "medium",
  },
  topText: {
    marginLeft: 250,
  },
  "@media (max-width: 700px)": {
    topContainer: {
      flexDirection: "column",
    },
    iconsStyle: {
      maxWidth: "90%",
      marginRight: 0,
      alignSelf: "flex-end",
      marginTop: 50,
    },
    buttonsIconStyle: {
      marginTop: 50,
    },
    about: {
      marginLeft: 100,
      fontSize: 28,
    },
    companyLogo: {
      height: 150,
      width: 150,
      top: -50,
    },
    title: {
      marginLeft: -50,
      fontSize: 30,
    },
    location: {
      marginLeft: -50,
      fontSize: 20,
    },
  },
}));

/* Individual project page, opens when a project is clicked.
It contains description, location, additional images */
const ProjectTitle = () => {
  const classes = useStyles();
  const [propertyActions, setPropertyActions] = useState();
  const { projectDetails } = useSelector((state) => state.projects);
  const { darkMode } = useSelector((state) => state.global);

  return (
    <div className={classes.container}>
      <div className={classes.topContainer}>
        <div className={classes.logoContainer}>
          <img
            src={`${projectDetails?.company?.company_logo}`}
            alt=""
            className={classes.companyLogo}
          />
          <div className={classes.topText}>
            <p className={classes.title}>{projectDetails?.title}</p>
            <span
              className={classes.location}
            >{`${projectDetails?.city}, ${projectDetails?.country}`}</span>
          </div>
        </div>

        {/* <IconsContainer
          customStyle={classes.iconsStyle}
          phoneNumber={projectDetails?.company?.company_phone}
          setPropertyActions={setPropertyActions}
          propertyActions={propertyActions}
          project={projectDetails}
          customSize={48}
        /> */}
        <ButtonsIconContainer
          customStyle={classes.buttonsIconStyle}
          phoneNumber={projectDetails?.company?.company_phone}
          setPropertyActions={setPropertyActions}
          propertyActions={propertyActions}
          customSize={20}
          project={projectDetails}
          agent={projectDetails?.company}
          customColor={darkMode ? "#0ed864" : "#134696"}
        />
      </div>
      <div className={classes.content}>
        <span className={classes.heading}>Project Description</span>

        <span className={classes.description}>
          {projectDetails?.description
            ? parse(projectDetails?.description)
            : ""}
        </span>
        {projectDetails?.contents?.map((elem, index) => (
          <div key={index}>
            <span className={classes.heading}>{elem?.title || "Title"}</span>
            {elem?.body ? parse(elem?.body) : ""}
          </div>
        ))}
      </div>
      <div className={classes.content}>
        <span className={classes.heading}>Investment Plan</span>
        <InvestmentPlan />
      </div>
      <div className={classes.content}>
        <Location />
      </div>
      <div className={classes.content}>
        <AdditionalImages />
      </div>
    </div>
  );
};

export default ProjectTitle;
