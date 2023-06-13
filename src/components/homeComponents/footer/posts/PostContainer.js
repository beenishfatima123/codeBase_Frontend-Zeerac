import React from "react";
import { makeStyles } from "@mui/styles";
//import { FOOTER_POSTS } from '../../../../utils/constants';
import { useSelector } from "react-redux";
import { TextTranslation } from "../../../../utils/translation";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "baseline",
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#9DAFBD",
    marginBottom: 30,
    marginTop: 0,
  },
  postContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    cursor: "pointer",
  },
  image: {
    height: 70,
    width: 70,
    marginRight: 20,
    borderRadius: 10,
  },
  postTitle: {
    fontSize: 18,
    color: "#134696",
    margin: 0,
  },
  "@media (max-width:1500px)": {
    contact: {
      marginTop: 5,
    },
  },
  "@media (max-width:1400px)": {
    contact: {
      marginTop: 17,
    },
  },
}));
const PostContainer = () => {
  const classes = useStyles();
  const { darkMode, langIndex } = useSelector((state) => state.global);

  return (
    <div className={classes.container}>
      {/* <p
        className={classes.text}
        style={{
          color: darkMode ? "white" : "#9DAFBD",
        }}
      >
        LATEST POSTS
      </p>
      {FOOTER_POSTS?.map((elem, index) => (
        <div className={classes.postContainer} key={index}>
          <img src={elem?.image} alt="" className={classes.image} />
          <p
            className={classes.postTitle}
            style={{
              color: darkMode ? "white" : "#134696",
            }}
          >
            {elem?.title}
          </p>
        </div>
      ))} */}
      <div
        className={classes.contact}
        style={{
          width: "100%",
        }}
      >
        <div
          className={classes.text}
          style={{
            color: darkMode ? "white" : "#134696",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontFamily: "medium",
            marginBottom: 10,
          }}
        >
          <div>{TextTranslation.helpline[langIndex]}</div>
          <div>{TextTranslation.emailAddress[langIndex]}</div>
        </div>
        <div
          style={{
            height: 2,
            width: "100%",
            borderBottom: "1px solid #e3e3e3",
          }}
        ></div>
        <div
          style={{
            color: darkMode ? "white" : "#9DAFBD",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 15,
          }}
        >
          <div>+92 323 5430229</div>
          <div>info@zeerac.com</div>
        </div>
        <div
          className={classes.text}
          style={{
            color: darkMode ? "white" : "#134696",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            borderBottom: "1px solid #e3e3e3",
            paddingBottom: 10,
            marginTop: 20,
            fontFamily: "medium",
          }}
        >
          <div>{TextTranslation.headOffice[langIndex]}</div>
        </div>
        <div
          style={{
            color: darkMode ? "white" : "#9DAFBD",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            // marginTop: -20,
          }}
        >
          <div>{TextTranslation.headOfficeAddress[langIndex]}</div>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default PostContainer;
