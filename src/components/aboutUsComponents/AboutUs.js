import React from "react";
import ContactForm from "./ContactForm";
import { makeStyles } from "@mui/styles";
import BoxPattren from "./svgComponents.js/BoxPattren";
//import BottomLines from './svgComponents.js/BottomLines';
import LinesPattren from "./svgComponents.js/LinesPattren";
import courseImage from "../../assets/aboutUs/coursesMockup.png";
import presentationImage from "../../assets/aboutUs/presentation.png";
// import BottomLines from "./svgComponents.js/BottomLines";
import { useSelector } from "react-redux";
import { TextTranslation } from "../../utils/translation";

const useStyles = makeStyles(() => ({
  linesPattren: {
    position: "absolute",
    right: 0,
    top: -160,
  },
  heading: {
    fontSize: 40,
    fontFamily: "heavy",
    color: "#134696",
    marginTop: 100,
    marginLeft: 30,
  },
  text30: {
    fontSize: 25,
    color: "#134696",
    fontFamily: "light",
    marginTop: 40,
    marginLeft: 30,
    width: "40%",
  },
  text22: {
    fontSize: 20,
    width: "45%",
    fontFamily: "light",
    color: "#7d7d7d",
  },
  presentationText: {
    fontSize: 20,
    width: "40%",
    fontFamily: "light",
    color: "#7d7d7d",
  },
  boxContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
    margin: "100px 2% 20px 2%",
  },
  presentationContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
    margin: "0px -40px 20px 2%",
  },
  presentationElement: {
    display: "none",
  },
  svgContainer: {
    width: "45%",
  },
  belowPresentationText: {
    fontSize: 18,
    width: "63%",
    fontFamily: "light",
    color: "#7d7d7d",
    margin: "auto",
    textAlign: "center",
  },
  queryContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
    margin: "20px 2% 20px 2%",
  },
  queryText: {
    fontSize: 20,
    width: "30%",
    fontFamily: "light",
    color: "#7d7d7d",
  },
  queryHeading: {
    color: "#134696",
    fontSize: 40,
    fontFamily: "heavy",
    marginBottom: 30,
  },
  formContainer: {
    width: "60%",
    marginRight: "5%",
  },
  infoContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
    margin: "40px 2% 20px 2%",
  },
  infoText: {
    fontSize: 20,
    maxWidth: "40%",
    fontFamily: "medium",
    color: "#134696",
  },
  emailContainer: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    margin: "20px 2% 20px 2%",
    maxWidth: "40%",
  },
  email: {
    color: "#134696",
    fontFamily: "medium",
    fontSize: 20,
  },
  description: {
    color: "#7d7d7d",
    fontFamily: "light",
    fontSize: 16,
  },
  "@media (max-width: 900px)": {
    heading: { marginTop: 20 },
    linesPattren: {
      display: "none",
    },
    boxContainer: {
      flexDirection: "column",
      alignItems: "center",
      margin: "0px 2% 0px 2%",
    },
    presentationContainer: {
      flexDirection: "column",
      alignItems: "center",
      margin: "20px 2% 20px 2%",
    },
    presentationElement: {
      display: "block",
      marginLeft: -200,
    },
    svgContainer: {
      width: "90%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      margin: "auto",
    },
    text30: {
      width: "70%",
      fontSize: 18,
    },
    text22: {
      width: "90%",
      textAlign: "left",
      fontSize: 18,
    },
    presentationText: {
      width: "90%",
      textAlign: "left",
      fontSize: 18,
    },
    presentationSmallText: {
      width: "50%",
    },
    belowPresentationText: {
      fontSize: 16,
      width: "90%",
      fontFamily: "light",
      color: "#7d7d7d",
      margin: "auto",
      textAlign: "center",
    },
    queryContainer: {
      flexDirection: "column",
      alignItems: "center",
    },
    queryText: {
      width: "90%",
      textAlign: "center",
      fontSize: 18,
    },
    queryHeading: {
      fontSize: 20,
      marginBottom: 10,
    },
    formContainer: {
      marginTop: 20,
      width: "90%",
      display: "flex",
      justifyContent: "center ",
      marginRight: 0,
    },
    infoContainer: {
      display: "flex",
      flexDirection: "column",
    },
    infoText: {
      maxWidth: "80%",
      display: "flex",
      justifyContent: "center",
    },
    emailContainer: {
      maxWidth: "80%",
    },
  },
  "@media (max-width: 400px)": {
    svgContainer: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      height: 500,
      marginTop: -50,
    },
  },
}));

const AboutUs = () => {
  const classes = useStyles();
  const { langIndex, darkMode } = useSelector((state) => state.global);

  return (
    <div style={{ overflow: "hidden" }}>
      <div className={classes.linesPattren}>
        <LinesPattren style={{ minWidth: "50%" }} />
      </div>
      <div
        className={classes.heading}
        style={{
          color: darkMode ? "#0ed864" : "#134696",
        }}
      >
        {TextTranslation.aboutUs[langIndex]}
      </div>
      <div
        style={{ height: 2, borderBottom: "6px solid #0ed864", width: 250 }}
      ></div>

      <div
        className={classes.text30}
        style={{
          color: darkMode ? "#fff" : "#134696",
        }}
      >
        {TextTranslation.aboutUsDescription[langIndex]}
      </div>

      <div className={classes.boxContainer}>
        <div className={classes.svgContainer}>
          <BoxPattren style={{ maxWidth: "100%" }} />
        </div>

        <div
          className={classes.text22}
          style={{
            color: darkMode ? "#fff" : "#7d7d7d",
          }}
        >
          <span>{TextTranslation.throughFastCommunication[langIndex]}</span>
          <br />
          <div style={{ marginTop: 20 }}></div>
          <span>{TextTranslation.widthZeeracYouHaveAccess[langIndex]}</span>
        </div>
      </div>
      <div className={classes.presentationContainer}>
        <div className={classes.presentationElement}>
          <LinesPattren
            style={{
              height: 100,
              display: "flex",
              flexDirection: "row-reverse",
              marginLeft: -250,
              marginTop: -20,
              marginBottom: 20,
            }}
          />
        </div>
        <div className={classes.presentationText}>
          <span
            style={{
              color: darkMode ? "#fff" : "#7d7d7d",
            }}
          >
            {TextTranslation.weHaveCarefullyPartnered[langIndex]}
          </span>
          <br />

          <div
            style={{
              color: darkMode ? "#0ed864" : "#134696",
              fontSize: 25,
              marginTop: 10,
              fontWeight: "bold",
            }}
          >
            {TextTranslation.empathyAccessibility[langIndex]}
          </div>
          <div
            style={{
              color: darkMode ? "#0ed864" : "#134696",
              fontSize: 25,
              marginBottom: 10,
              fontWeight: "bold",
            }}
          >
            {TextTranslation.seamlessSocialNetwork[langIndex]}
          </div>
          <span
            className={classes.presentationSmallText}
            style={{
              color: darkMode ? "#fff" : "#7d7d7d",
            }}
          >
            {TextTranslation.weBringSolution[langIndex]}
          </span>
        </div>
        <div>
          <img
            alt=""
            src={presentationImage}
            style={{ height: 500, objectFit: "cover", zIndex: 999999 }}
          />
        </div>
      </div>
      <div
        className={classes.belowPresentationText}
        style={{
          color: darkMode ? "#fff" : "#7d7d7d",
        }}
      >
        {TextTranslation.ourRealEstateCourses[langIndex]}
      </div>
      <div style={{ marginTop: 30, marginLeft: -50, marginRight: -100 }}>
        <img
          alt=""
          src={courseImage}
          style={{ objectFit: "cover", width: "100%" }}
        />
      </div>
      <div
        className={classes.belowPresentationText}
        style={{
          color: darkMode ? "#fff" : "#7d7d7d",
        }}
      >
        {TextTranslation.wishToMakeExperience[langIndex]}{" "}
        <span
          style={{
            color: darkMode ? "#0ed864" : "#134696",
            fontWeight: "bold",
          }}
        >
          {TextTranslation.seamless[langIndex]}
        </span>{" "}
        {TextTranslation.possibleAndHope[langIndex]}{" "}
        <span
          style={{
            color: darkMode ? "#0ed864" : "#134696",
            fontWeight: "bold",
          }}
        >
          {TextTranslation.accessible[langIndex]}
        </span>{" "}
        {TextTranslation.provideLandOpportunities[langIndex]}
      </div>
      <div className={classes.queryContainer}>
        <div className={classes.queryText}>
          <div
            className={classes.queryHeading}
            style={{
              color: darkMode ? "#0ed864" : "#134696",
            }}
          >
            {TextTranslation.alwaysHereToSupport[langIndex]}
          </div>
          <span
            style={{
              color: darkMode ? "#fff" : "#7d7d7d",
            }}
          >
            {TextTranslation.questionsOrConcerns[langIndex]}
          </span>
        </div>
        <div className={classes.formContainer}>
          <ContactForm />
        </div>
      </div>
      <div className={classes.infoContainer}>
        <div
          className={classes.infoText}
          style={{
            color: darkMode ? "#0ed864" : "#134696",
          }}
        >
          {TextTranslation.sendUsAnEmail[langIndex]}
        </div>
        <div className={classes.emailContainer}>
          <div>
            <div
              className={classes.email}
              style={{
                color: darkMode ? "#0ed864" : "#134696",
              }}
            >
              info@zeerac.com
            </div>
            {/* <div className={classes.description}>
              {TextTranslation.newBusinessGeneralPress[langIndex]}
            </div> */}
          </div>
          <div style={{ marginTop: 20 }}>
            <div
              className={classes.email}
              style={{
                color: darkMode ? "#0ed864" : "#134696",
              }}
            >
              careers@zeerac.com
            </div>
            {/* <div className={classes.description}>
              {TextTranslation.joinOurTeam[langIndex]}
            </div> */}
          </div>
        </div>
      </div>
      {/* <BottomLines style={{ maxWidth: "100%", position: "relative" }} /> */}
    </div>
  );
};

export default AboutUs;
