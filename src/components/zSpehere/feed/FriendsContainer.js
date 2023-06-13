import React from "react";
import { makeStyles } from "@mui/styles";
import { DEFAULT_FRIENDS } from "../../../utils/constants";
import { Avatar, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useSelector } from "react-redux";
import Header from "./Header";

const useStyles = makeStyles(() => ({
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    width: "40vw",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    borderBottom: "1px solid #D6D6D6",
    padding: "16px 8px",
    justifyContent: "space-between",
    width: "39vw",
    overflow: "scroll",
    "&::-webkit-scrollbar": {
      width: "0.4em",
      height: "0em",
    },
    "&::-webkit-scrollbar-track": {
      WebkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      borderRadius: "5px",
    },
    scrollBehavior: "smooth !important",
    position: "relative",
    "&:hover": {
      "&::-webkit-scrollbar": {
        height: "0.4em",
      },
    },
  },
  avatarContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: "0px 20px",
  },
  name: {
    color: "#7D7D7D",
    fontSize: 16,
    marginTop: 10,
  },
  "@media (max-width: 1200px)": {
    mainContainer: {
      width: 500,
      maxWidth: "100%",
    },
    container: {
      width: 500,
      maxWidth: "95%",
    },
  },
}));

/* Friends container takes selectedFilter and displays friends of current user along with avatars and names, it also renders the Header component. */
const FriendsContainer = ({ selectedFilter, setSelectedFilter }) => {
  const classes = useStyles();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const { darkMode } = useSelector((state) => state.global);

  return (
    <div
      className={classes.mainContainer}
      style={{
        backgroundColor: darkMode ? "#2f2f33" : "#fff",
      }}
    >
      <div className={classes.container}>
        <div className={classes.avatarContainer} style={{ marginLeft: 0 }}>
          <IconButton
            sx={{
              p: 0,
              backgroundColor: "#134696",
              width: 44,
              height: 44,
              "&:hover": {
                backgroundColor: "#134695",
              },
            }}
          >
            <AddIcon style={{ width: 30, height: 30, color: "white" }} />
          </IconButton>

          <span className={classes.name}>{currentUser?.first_name}</span>
        </div>

        {DEFAULT_FRIENDS?.map((elem, index) => (
          <div className={classes.avatarContainer} key={index}>
            <Avatar
              alt={elem?.name}
              src={elem?.phone}
              sx={{ width: 44, height: 44 }}
            />
            <span
              className={classes.name}
              style={{
                color: darkMode ? "#fff" : "#7D7D7D",
              }}
            >
              {elem?.name}
            </span>
          </div>
        ))}
      </div>
      <Header
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />
    </div>
  );
};

export default FriendsContainer;
