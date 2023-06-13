import React from "react";
import { makeStyles } from "@mui/styles";
import { SOCIAL_CONTENT_SELECTION } from "../../utils/constants";
import { Button } from "@mui/material";
import { useWindowDims } from "../../utils/useWindowDims";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetSearch } from "../../redux/slices/newsSlice";
import { setSearchQuery } from "../../redux/slices/postsSlice";
import { resetGroupSearch } from "../../redux/slices/groupsSlice";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    flexWrap: "wrap",
  },
}));

/* content selection is the component under search bar having options to navigate through tabs in zSphere. */
const ContentSelection = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const { width } = useWindowDims();

  const { darkMode } = useSelector((state) => state.global);

  /* when clicked on any tab, reset search queries and navigate to that page. */
  const handleClick = (elem) => {
    dispatch(resetSearch());
    dispatch(resetGroupSearch());
    dispatch(setSearchQuery(""));
    navigate(`/zSphere/${elem?.replace(" ", "_")}`);
  };

  /* active tab button will have blue and green color otherwise grey. */
  const getBtnColor = (elem) => {
    if (darkMode) return params?.route === elem ? "#0ED864" : "white";
    else return params?.route === elem ? "#134696" : "#9DAFBD";
  };


  return (
    <div className={classes.container}>
      {SOCIAL_CONTENT_SELECTION?.map((elem, index) => (
        <Button
          key={index}
          onClick={() => handleClick(elem)}
          disableRipple
          sx={{
            textTransform: "none",
            fontSize: width > 650 ? 24 : 16,
            fontFamily: "medium",
            color: getBtnColor(elem),
            borderBottom:
              params?.route === elem?.replace(" ", "_")
                ? width > 650
                  ? "6px solid #0ED864"
                  : "3px solid #0ED864"
                : "none",
            mr: width > 650 ? 2 : 1,
            borderRadius: 0,
          }}
        >
          {elem}
        </Button>
      ))}
    </div>
  );
};

export default ContentSelection;
