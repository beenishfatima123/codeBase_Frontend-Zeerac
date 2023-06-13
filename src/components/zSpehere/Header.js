import React, { useMemo } from "react";
import { makeStyles } from "@mui/styles";
import background from "../../assets/zSpehere/background.png";
import { ReactComponent as Logo } from "../../assets/zSpehere/logo.svg";
import { IconButton } from "@mui/material";
import MicNoneIcon from "@mui/icons-material/MicNone";
import { DEFAULT_SHADOW } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../../redux/slices/postsSlice";
import { useParams } from "react-router-dom";
import { SOCIAL_CONTENT_SELECTION } from "../../utils/constants";
import { setBlogsSearch, setNewsSearch } from "../../redux/slices/newsSlice";
import { setGroupSearch } from "../../redux/slices/groupsSlice";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundImage: `url(${background})`,
    minHeight: 330,
    position: "relative",
  },
  clip: {
    position: "absolute",
    width: "80%",
    bottom: -25,
  },
  searchContainer: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    paddingLeft: 20,
    borderRadius: 30,
    position: "relative",
    height: 50,
    boxShadow: DEFAULT_SHADOW,
  },
  input: {
    display: "flex",
    flex: 1,
    border: "none",
    fontSize: 16,
    "&:focus": {
      outline: "none",
    },
    color: "#9DAFBD",
    background: "none",
  },
}));

/* Header renders the top part of the zSphere tab, it contains zSphere logo and input field for search. */
const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const params = useParams();
  const { darkMode } = useSelector((state) => state.global);
  const { searchQuery } = useSelector((state) => state.posts);
  const { newsSearch, blogsSearch } = useSelector((state) => state.news);
  const { groupSearch } = useSelector((state) => state.groups);

  /* inputValue stores the current tab selected on zSphere using the params route. */
  const inputValue = useMemo(() => {
    // console.log({ params, newsSearch, blogsSearch, searchQuery });
    switch (params?.route) {
      case SOCIAL_CONTENT_SELECTION[0]:
        return searchQuery;
      case SOCIAL_CONTENT_SELECTION[1]:
        return newsSearch;
      case SOCIAL_CONTENT_SELECTION[2]:
        return blogsSearch;
      case SOCIAL_CONTENT_SELECTION[4]:
        return groupSearch;

      default:
        return searchQuery;
    }
  }, [params?.route, newsSearch, blogsSearch, searchQuery, groupSearch]);

  /* dynamically changes the placeholder in the input field based on tab selected. */
  const placeholder = useMemo(() => {
    switch (params?.route) {
      case SOCIAL_CONTENT_SELECTION[0]:
        return "Looking for a Particular Post?";
      case SOCIAL_CONTENT_SELECTION[1]:
        return "Looking for a Particular Article?";
      case SOCIAL_CONTENT_SELECTION[2]:
        return "Looking for a Particular Blog?";
      case SOCIAL_CONTENT_SELECTION[3]:
        return "Looking for a Particular Podcast?";
      case SOCIAL_CONTENT_SELECTION[4]:
        return "Looking for a Particular Group?";

      default:
        return "Looking for something?";
    }
  }, [params?.route]);

  /* on changing the input value in input field, set search query equal to value enetered in search bar. */
  const handleChange = (e) => {
    switch (params?.route) {
      case SOCIAL_CONTENT_SELECTION[0]:
        dispatch(setSearchQuery(e.target.value));
        break;
      case SOCIAL_CONTENT_SELECTION[1]:
        dispatch(setNewsSearch(e.target.value));
        break;
      case SOCIAL_CONTENT_SELECTION[2]:
        dispatch(setBlogsSearch(e.target.value));
        break;
      case SOCIAL_CONTENT_SELECTION[4]:
        dispatch(setGroupSearch(e.target.value));
        break;
      default:
        dispatch(setSearchQuery(e.target.value));
        break;
    }
  };

  return (
    <div className={classes.container}>
      <Logo style={{ maxWidth: "95%" }} />
      <div className={classes.clip}>
        <div
          className={classes.searchContainer}
          style={{
            backgroundColor: darkMode ? "#2F2F33" : "white",
            border: darkMode ? "none" : "1px solid #9DAFBD",
          }}
        >
          <input
            type="text"
            className={classes.input}
            placeholder={placeholder}
            value={inputValue || ""}
            onChange={handleChange}
          />
          <IconButton
            sx={{
              p: 0,
              position: "absolute",
              right: -1,
              height: 50,
              width: 50,
              border: darkMode ? "1px solid #0ED864" : "1px solid #9DAFBD",
            }}
          >
            <MicNoneIcon
              style={{
                color: darkMode ? "#0ED864" : "#9DAFBD",
                height: 35,
                width: 35,
              }}
            />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Header;
