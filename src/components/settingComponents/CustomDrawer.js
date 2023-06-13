import React, { useMemo } from "react";
import { makeStyles } from "@mui/styles";
import { Divider, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useDispatch, useSelector } from "react-redux";
import {
  LISTINGS_DRAWER_OPTIONS,
  SAVE_LIST_ITEMS,
  SETTINGS_TABS,
  SETTING_URLS,
} from "../../utils/constants";
import CustomSwitch from "../globalComponents/CustomSwitch";
import { setDarkMode } from "../../redux/slices/globalSlice";
import { useLocation, useNavigate } from "react-router-dom";
import logoutIcon from "../../assets/settings/logout.png";
import { handleLogout } from "../../utils/helperFunctions";
import { useWindowDims } from "../../utils/useWindowDims";
import { TextTranslation } from "../../utils/translation";
import { setShowDrawer } from "../../redux/slices/settingsSlice";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import NightlightIcon from "@mui/icons-material/Nightlight";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    transition: "all 0.5s",
    padding: "10px 0px",
    backgroundColor: "#134696",
  },
  itemsContainer: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  listItem: {
    display: "flex",
    alignItems: "center",
    padding: "8px 16px",
    cursor: "pointer",
    transition: "all 0.25s ease",
    margin: "5px 0px",
  },
  listItemText: {
    color: "#ffffff",
    fontSize: 16,
    fontFamily: "medium",
    marginLeft: 20,
  },
  topContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "8px",
  },
  profileLabel: {
    fontSize: 24,
    fontFamily: "medium",
    color: "#ffffff",
    textAlign: "center",
  },
  bottomItemsContainer: {
    display: "flex",
    flexDirection: "column",
  },
  "@media (max-width: 500px)": {
    container: {
      position: "absolute",
      left: 0,
      height: "calc(100vh - 64px)",
      zIndex: 500,
    },
  },
}));

/* CustomDrawer is the left most component on settings page and contains all options included in user, agent, agency etc. settings. */
const CustomDrawer = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { width } = useWindowDims();
  const { pathname } = useLocation();

  const { darkMode, langIndex } = useSelector((state) => state.global);
  const { showDrawer } = useSelector((state) => state.settings);
  const currentUser = useSelector((state) => state.auth.currentUser);

  //console.log({ SETTINGS_TABS, currentUser });

  /* tabsToShow decides which tabs are required to be displayed on the drawer based on the user type. */
  const tabsToShow = useMemo(() => {
    if (currentUser?.user_type === 1) {
      return SETTINGS_TABS?.filter(
        (elem) => elem?.name[0] !== "Register Agency"
      );
    } else {
      if (
        currentUser?.user_type === 2 &&
        currentUser?.company === "Private Agent"
      ) {
        return SETTINGS_TABS?.filter(
          (elem) => elem?.name[0] !== "Become an Agent"
        );
      } else {
        return SETTINGS_TABS?.filter(
          (elem) =>
            elem?.name[0] !== "Register Agency" &&
            elem?.name[0] !== "Become an Agent"
        );
      }
    }
    // eslint-disable-next-line
  }, [currentUser]);

  /* upon tab click we take the tab information and render exactly that component that is clicked. */
  const handleTabClick = (tab) => {
    // console.log({ tab });
    // if (width < 500) setShowFull(false);
    if (width < 500) dispatch(setShowDrawer(false));

    switch (tab) {
      case SETTINGS_TABS[0]?.name[0]:
        navigate(`/settings/${SETTING_URLS?.PROFILE}`);
        break;
      case SETTINGS_TABS[1]?.name[0]:
        navigate(`/settings/${SETTING_URLS?.CHAT}`);
        break;
      case SETTINGS_TABS[2]?.name[0]:
        navigate(
          `/settings/${
            SETTING_URLS?.MY_LISTINGS
          }/${LISTINGS_DRAWER_OPTIONS[1]?.label[0]?.toLowerCase()}/${LISTINGS_DRAWER_OPTIONS[1]?.subCategories[0][0]?.toLowerCase()}`
        );
        break;
      case SETTINGS_TABS[3]?.name[0]:
        navigate(`/settings/${SETTING_URLS?.BECOME_AN_AGENT}`);
        break;
      case SETTINGS_TABS[4]?.name[0]:
        navigate(`/settings/${SETTING_URLS?.REGISTER_AGENCY}`);
        break;
      case SETTINGS_TABS[5]?.name[0]:
        navigate(
          `/settings/${SETTING_URLS?.SAVED_LISTINGS}/${SAVE_LIST_ITEMS[0][0]}`
        );
        break;
      default:
        break;
    }
  };

  /* path stores the splitted pathname. */
  const path = useMemo(
    () => pathname?.split("/")?.filter((elem) => elem !== ""),
    [pathname]
  );
  return (
    <div
      className={classes.container}
      style={{
        width: showDrawer ? 230 : 50,
      }}
    >
      <div className={classes.topContainer}>
        {showDrawer && (
          <span className={classes.profileLabel}>
            {TextTranslation.profile[langIndex]}
          </span>
        )}

        <IconButton
          // onClick={() => setShowFull((prev) => !prev)}
          onClick={() => dispatch(setShowDrawer(!showDrawer))}
          sx={{ alignSelf: "flex-end", color: "white" }}
        >
          {showDrawer ? <ArrowBackIcon /> : <MenuIcon />}
        </IconButton>
      </div>

      <Divider sx={{ backgroundColor: "#ffffff" }} />

      <div className={classes.itemsContainer}>
        {tabsToShow?.map((elem, index) => (
          <div
            className={classes.listItem}
            key={index}
            style={{
              backgroundColor:
                path[1] === (elem?.url).toLowerCase()
                  ? "#0ED864"
                  : "transparent",
            }}
            onClick={() => handleTabClick(elem?.name[0])}
          >
            <img
              alt={elem?.name}
              src={elem?.icon}
              className={classes.listItemIcon}
            />
            {showDrawer && (
              <span className={classes.listItemText}>
                {elem?.name[langIndex]}
              </span>
            )}
          </div>
        ))}
      </div>

      <div className={classes.bottomItemsContainer}>
        <div className={classes.listItem}>
          {darkMode ? (
            <WbSunnyIcon
              style={{ color: "#fff" }}
              onClick={() => dispatch(setDarkMode(!darkMode))}
            />
          ) : (
            <NightlightIcon
              style={{ color: "#fff" }}
              onClick={() => dispatch(setDarkMode(!darkMode))}
            />
          )}

          {showDrawer && (
            <>
              {" "}
              <span
                className={classes.listItemText}
                style={{
                  color: darkMode ? "#0ed864" : "#ffffff",
                }}
              >
                {darkMode
                  ? TextTranslation.lightMode[langIndex]
                  : TextTranslation.darkMode[langIndex]}
              </span>
              <CustomSwitch
                checked={darkMode}
                onChange={() => dispatch(setDarkMode(!darkMode))}
                sx={{ marginLeft: "10px" }}
              />
            </>
          )}
        </div>
        <div
          className={classes.listItem}
          onClick={() => handleLogout(dispatch, navigate)}
        >
          <img alt="" src={logoutIcon} className={classes.listItemIcon} />
          {showDrawer && (
            <span className={classes.listItemText}>
              {TextTranslation.logout[langIndex]}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomDrawer;
