import React, { useEffect, useRef } from "react";
import { makeStyles } from "@mui/styles";
import { Grid } from "@mui/material";
import DescriptionContainer from "./description/DescriptionContainer";
import { APP_BAR_ITEMS } from "../../../utils/constants";
import PostContainer from "./posts/PostContainer";
import SocialsContainer from "../../globalComponents/misc/SocialsContainer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BugReportModal from "../../bugReportComponents/BugReportModal";
import { TextTranslation } from "../../../utils/translation";
import useOnScreen from "../../../utils/hooks/useOnScreen";
import { setIsFooterVisible } from "../../../redux/slices/globalSlice";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    zIndex: 20,
    backgroundColor: "#fff",
    position: "relative",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#9DAFBD",
    marginBottom: 30,
    marginTop: 0,
  },
  link: {
    fontSize: 18,
    color: "#134696",
    cursor: "pointer",
    marginTop: 0,
  },
  productsContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  bottom: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
    borderTop: "1px solid #707070",
    margin: "0px 5%",
    padding: "20px 0px",
  },
  copyright: {
    fontSize: 14,
    fontWeight: "light",
    color: "#9DAFBD",
  },
  "@media (max-width:900px)": {
    productsContainer: {
      width: "100%",
      alignItems: "flex-start",
      margin: "20px 0px",
    },
  },
}));

const FooterContainer = () => {
  const classes = useStyles();
  const containerRef = useRef();
  const dispatch = useDispatch();
  const isOnScreen = useOnScreen(containerRef);
  const navigate = useNavigate();

  const { darkMode, langIndex } = useSelector((state) => state.global);
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    if (isOnScreen) dispatch(setIsFooterVisible(true));
    else dispatch(setIsFooterVisible(false));
    // eslint-disable-next-line
  }, [isOnScreen]);
  return (
    <div
      className={classes.container}
      style={{
        backgroundColor: darkMode ? "#303134" : "",
      }}
      ref={containerRef}
    >
      <Grid container sx={{ padding: "40px 5%" }}>
        <Grid item xs={12} md={4}>
          <DescriptionContainer />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className={classes.productsContainer}>
            <p
              className={classes.text}
              style={{
                color: darkMode ? "white" : "#134696",
                fontFamily: "medium",
              }}
            >
              {TextTranslation.quickLinks[langIndex]}
            </p>
            {APP_BAR_ITEMS?.map((elem, index) => (
              <p
                key={index}
                className={classes.link}
                style={{
                  color: darkMode ? "white" : "#9DAFBD",
                }}
                onClick={() => navigate(elem?.url)}
              >
                {elem?.label[langIndex]}
              </p>
            ))}
          </div>
        </Grid>
        <Grid item xs={12} md={5}>
          <PostContainer />
        </Grid>
      </Grid>
      <div className={classes.bottom}>
        <span className={classes.copyright}>
          {TextTranslation.copyright[langIndex]}
        </span>
        <span
          className={classes.copyright}
          style={{ cursor: "pointer" }}
          onClick={() => {
            setOpen(true);
          }}
        >
          Have an issue?
        </span>
        <SocialsContainer />
      </div>
      {open && <BugReportModal open={open} setOpen={setOpen} />}
    </div>
  );
};

export default FooterContainer;
