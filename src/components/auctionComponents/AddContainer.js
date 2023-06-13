import React from "react";
import { makeStyles } from "@mui/styles";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { TextTranslation } from "../../utils/translation";
import { HEADER_CONTENT_WIDTH } from "../../utils/constants";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "30px auto",
    width: HEADER_CONTENT_WIDTH,
    maxWidth: "90%",
  },
  title: {
    color: "#134696",
    fontSize: 25,
    fontFamily: "heavy",
  },
  divider: {
    display: "flex",
    flex: 1,
    height: 2,
    backgroundColor: "#0ED864",
    margin: "0px 20px",
  },
  addBtn: {
    borderRadius: 35,
    backgroundColor: "#134696",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "0.5s",
    color: "white",
  },
}));

/* AddContainer is displayed below TopSection on trading page.
It displays title and add auction button. It takes hovering as
parameter to check if the add auctionn button is being hovered upon
or not. */
const AddContainer = ({ hovering, setHovering }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { darkMode, langIndex } = useSelector((state) => state.global);

  return (
    <div className={classes.container}>
      <span
        className={classes.title}
        style={{
          color: darkMode ? "#fff" : "#134696",
        }}
      >
        {TextTranslation.selectOneToExplore[langIndex]}
      </span>
      <div className={classes.divider} />
      <div
        className={classes.addBtn}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        style={{
          padding: hovering ? "10px 40px" : 10,
        }}
        onClick={() => navigate("/create-post")}
      >
        {hovering ? (
          <span className={classes.btnText}>
            {TextTranslation.addAuction[langIndex]}
          </span>
        ) : (
          <AddIcon style={{ color: "white" }} />
        )}
      </div>
    </div>
  );
};

export default AddContainer;
