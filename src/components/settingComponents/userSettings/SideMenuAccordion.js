// import Menu from './svg/Menu';
import Invite from "./svg/Invite";
import Profile from "./svg/Profile";
import Refferal from "./svg/Refferal";
import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import Accordion from "@mui/material/Accordion";
import { useDispatch, useSelector } from "react-redux";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { setSideMenuClick } from "../../../redux/slices/settingsSlice";
import useColor from "../../../utils/hooks/useColor";
import { USER_TYPES } from "../../../utils/constants";
import { TextTranslation } from "../../../utils/translation";
import { resetPreferenceCreation } from "../../../redux/slices/preferenceSlice";

const useStyles = makeStyles(() => ({
  label: {
    fontSize: 16,
    fontFamily: "light",
    //color: '#134696',
  },
  list: {
    display: "flex",
    flexDirection: "column",
  },
  listLabel: {
    padding: 10,
    cursor: "pointer",
    fontSize: 16,
    fontFamily: "light",
    color: "#ADA7A7",
  },
}));

/* MenuAccordion is the component that is visible on settings page along with the sidebar. It has two accordions, one for profile settings selection and other for preferences settings selection. 
  */
const SideMenuAccordion = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [active, setActive] = useState("");
  const { sideMenuToggle, sideMenuClick } = useSelector(
    (state) => state.settings
  );
  const { currentUser } = useSelector((state) => state.auth);

  const { colors, darkMode, langIndex } = useSelector((state) => state.global);
  useColor(colors);
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      {/* Menu Accordion */}
      {/* <Accordion
        onClick={() => setActive('menu')}
        sx={{
          width: '100%',
          padding: '10px 0',
          boxShadow: 'none',
          borderBottom: '1px solid #e5e5e5',
          color: darkMode ? colors?.white : colors?.black,
          backgroundColor: darkMode ? colors?.jetBlack : colors?.white,
        }}
      >
        <AccordionSummary
          expandIcon={
            sideMenuToggle && (
              <ExpandMoreIcon
                sx={{
                  color: '#C9C9C9',
                }}
              />
            )
          }
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {sideMenuToggle ? (
              <>
                <Menu
                  style={{ margin: '0 15px 0 0' }}
                  color={
                    active === 'menu'
                      ? colors?.primary
                      : darkMode
                      ? colors?.white
                      : ''
                  }
                />
                <span
                  className={classes.label}
                  style={{ color: active === 'menu' ? colors?.primary : '' }}
                >
                  Menu
                </span>
              </>
            ) : (
              <Menu
                color={
                  active === 'menu'
                    ? colors?.primary
                    : darkMode
                    ? colors?.white
                    : ''
                }
                style={{ margin: '0 0 0 4px' }}
              />
            )}
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className={classes.list}>
            <div
              className={classes.listLabel}
              onClick={() => dispatch(setSideMenuClick('signInMethod'))}
              style={{
                color: sideMenuClick === 'signInMethod' ? colors?.primary : '',
                fontFamily: sideMenuClick === 'signInMethod' && 'medium',
              }}
            >
              Sign in method
            </div>

            <div
              className={classes.listLabel}
              onClick={() => dispatch(setSideMenuClick('connectedAccount'))}
              style={{
                color:
                  sideMenuClick === 'connectedAccount' ? colors?.primary : '',
                fontFamily: sideMenuClick === 'connectedAccount' && 'medium',
              }}
            >
              Connected account
            </div>
            <div
              className={classes.listLabel}
              onClick={() => dispatch(setSideMenuClick('notifications'))}
              style={{
                color: sideMenuClick === 'notifications' ? colors?.primary : '',
                fontFamily: sideMenuClick === 'notifications' && 'medium',
              }}
            >
              Notifications
            </div>
            <div
              className={classes.listLabel}
              onClick={() => dispatch(setSideMenuClick('deactivateAccount'))}
              style={{
                color:
                  sideMenuClick === 'deactivateAccount' ? colors?.primary : '',
                fontFamily: sideMenuClick === 'deactivateAccount' && 'medium',
              }}
            >
              Deactivate account
            </div>
          </div>
        </AccordionDetails>
      </Accordion> */}
      {/* Profile Accordion */}
      <Accordion
        onClick={() => setActive("profile")}
        sx={{
          width: "100%",
          padding: "10px 0",
          boxShadow: "none",
          borderBottom: "1px solid #e5e5e5",
          color: darkMode ? colors?.white : colors?.black,
          backgroundColor: darkMode ? colors?.jetBlack : colors?.white,
        }}
        defaultExpanded
      >
        <AccordionSummary
          expandIcon={
            sideMenuToggle && (
              <ExpandMoreIcon
                sx={{
                  color: "#C9C9C9",
                }}
              />
            )
          }
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            {sideMenuToggle ? (
              <>
                <Profile
                  style={{ margin: "0 15px 0 0" }}
                  color={
                    active === "profile"
                      ? colors?.primary
                      : darkMode
                      ? colors?.white
                      : ""
                  }
                />
                <span
                  className={classes.label}
                  style={{
                    color: active === "profile" ? colors?.primary : "",
                  }}
                >
                  {TextTranslation.profile[langIndex]}
                </span>
              </>
            ) : (
              <Profile
                style={{ margin: "0 0 0 4px" }}
                color={
                  active === "profile"
                    ? colors?.primary
                    : darkMode
                    ? colors?.white
                    : ""
                }
              />
            )}
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className={classes.list}>
            <div
              className={classes.listLabel}
              onClick={() => dispatch(setSideMenuClick("overview"))}
              style={{
                color: sideMenuClick === "overview" ? colors?.primary : "",
                fontFamily: sideMenuClick === "overview" && "medium",
              }}
            >
              {TextTranslation.overview[langIndex]}
            </div>
            {!currentUser?.provider ? (
              <div
                className={classes.listLabel}
                onClick={() => dispatch(setSideMenuClick("password"))}
                style={{
                  color: sideMenuClick === "password" ? colors?.primary : "",
                  fontFamily: sideMenuClick === "password" && "medium",
                }}
              >
                {TextTranslation.password[langIndex]}
              </div>
            ) : null}
            {currentUser?.user_type === USER_TYPES.AGENT && (
              <div
                className={classes.listLabel}
                onClick={() => dispatch(setSideMenuClick("experience"))}
                style={{
                  color: sideMenuClick === "experience" ? colors?.primary : "",
                  fontFamily: sideMenuClick === "experience" && "medium",
                }}
              >
                {TextTranslation.experience[langIndex]}
              </div>
            )}
            {currentUser?.user_type === USER_TYPES.AGENT && (
              <div
                className={classes.listLabel}
                onClick={() => dispatch(setSideMenuClick("getverified"))}
                style={{
                  color: sideMenuClick === "getverified" ? colors?.primary : "",
                  fontFamily: sideMenuClick === "getverified" && "medium",
                }}
              >
                {TextTranslation.getVerified[langIndex]}
              </div>
            )}
            {/* <div
              className={classes.listLabel}
              onClick={() => dispatch(setSideMenuClick('accountSupport'))}
              style={{
                color:
                  sideMenuClick === 'accountSupport' ? colors?.primary : '',
                fontFamily: sideMenuClick === 'accountSupport' && 'medium',
              }}
            >
              Account Support
            </div> */}
          </div>
        </AccordionDetails>
      </Accordion>
      {/* Preferences Accordion */}
      <Accordion
        onClick={() => setActive("preferences")}
        sx={{
          width: "100%",
          padding: "10px 0",
          boxShadow: "none",
          borderBottom: "1px solid #e5e5e5",
          color: darkMode ? colors?.white : colors?.black,
          backgroundColor: darkMode ? colors?.jetBlack : colors?.white,
        }}
        defaultExpanded
      >
        <AccordionSummary
          expandIcon={
            sideMenuToggle && (
              <ExpandMoreIcon
                sx={{
                  color: "#C9C9C9",
                }}
              />
            )
          }
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            {sideMenuToggle ? (
              <>
                <Refferal
                  style={{ margin: "0 15px 0 0" }}
                  color={
                    active === "preferences"
                      ? colors?.primary
                      : darkMode
                      ? colors?.white
                      : ""
                  }
                />
                <span
                  className={classes.label}
                  style={{
                    color: active === "preferences" ? colors?.primary : "",
                  }}
                >
                  {TextTranslation.preferences[langIndex]}
                </span>
              </>
            ) : (
              <Profile
                style={{ margin: "0 0 0 4px" }}
                color={
                  active === "preferences"
                    ? colors?.primary
                    : darkMode
                    ? colors?.white
                    : ""
                }
              />
            )}
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className={classes.list}>
            <div
              className={classes.listLabel}
              onClick={() => {
                dispatch(resetPreferenceCreation());
                dispatch(setSideMenuClick("preferenceListings"));
              }}
              style={{
                color:
                  sideMenuClick === "preferenceListings" ? colors?.primary : "",
                fontFamily: sideMenuClick === "preferenceListings" && "medium",
              }}
            >
              {TextTranslation.listings[langIndex]}
            </div>

            <div
              className={classes.listLabel}
              onClick={() => dispatch(setSideMenuClick("preferenceAgents"))}
              style={{
                color:
                  sideMenuClick === "preferenceAgents" ? colors?.primary : "",
                fontFamily: sideMenuClick === "preferenceAgents" && "medium",
              }}
            >
              {TextTranslation.agents[langIndex]}
            </div>

            <div
              className={classes.listLabel}
              onClick={() => dispatch(setSideMenuClick("preferenceAgencies"))}
              style={{
                color:
                  sideMenuClick === "preferenceAgencies" ? colors?.primary : "",
                fontFamily: sideMenuClick === "preferenceAgencies" && "medium",
              }}
            >
              {TextTranslation.agencies[langIndex]}
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
      {/* Refferals Accordion */}
      {/* <div
        onClick={() => {
          setActive('refferal');
          dispatch(setSideMenuClick('refferal'));
        }}
        style={{
          width: '100%',
          padding: '25px 15px',
          cursor: 'pointer',
          borderBottom: '1px solid #e5e5e5',
          color: darkMode ? colors?.white : colors?.black,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {sideMenuToggle ? (
            <>
              <Refferal
                style={{ margin: '0 15px 0 0' }}
                color={
                  active === 'refferal'
                    ? colors?.primary
                    : darkMode
                    ? colors?.white
                    : ''
                }
              />
              <span
                className={classes.label}
                style={{ color: active === 'refferal' ? colors?.primary : '' }}
              >
                Refferals
              </span>
            </>
          ) : (
            <Refferal
              color={
                active === 'refferal'
                  ? colors?.primary
                  : darkMode
                  ? colors?.white
                  : ''
              }
              style={{ margin: '0 0 0 4px' }}
            />
          )}
        </div>
      </div> */}
      {/* Invites Accordion */}
      {/* <div
        onClick={() => {
          setActive("invites");
          dispatch(setSideMenuClick("invites"));
        }}
        style={{
          width: "100%",
          padding: "25px 15px",
          cursor: "pointer",
          borderBottom: "1px solid #e3e3e3",
          color: darkMode ? colors?.white : colors?.black,
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {sideMenuToggle ? (
            <>
              <Invite
                style={{ margin: "0 15px 0 0" }}
                color={
                  active === "invites"
                    ? colors?.primary
                    : darkMode
                    ? colors?.white
                    : ""
                }
              />
              <span
                className={classes.label}
                style={{ color: active === "invites" ? colors?.primary : "" }}
              >
                Invite a friend
              </span>
            </>
          ) : (
            <Invite
              color={
                active === "invites"
                  ? colors?.primary
                  : darkMode
                  ? colors?.white
                  : ""
              }
              style={{ margin: "0 0 0 4px" }}
            />
          )}
        </div>
      </div> */}

      {/* Notifications Accordion */}
      <Accordion
        onClick={() => setActive("notifications")}
        sx={{
          width: "100%",
          padding: "10px 0",
          boxShadow: "none",
          borderBottom: "1px solid #e5e5e5",
          color: darkMode ? colors?.white : colors?.black,
          backgroundColor: darkMode ? colors?.jetBlack : colors?.white,
        }}
        defaultExpanded
      >
        <AccordionSummary
          expandIcon={
            sideMenuToggle && (
              <ExpandMoreIcon
                sx={{
                  color: "#C9C9C9",
                }}
              />
            )
          }
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            {sideMenuToggle ? (
              <>
                <Refferal
                  style={{ margin: "0 15px 0 0" }}
                  color={
                    active === "notifications"
                      ? colors?.primary
                      : darkMode
                      ? colors?.white
                      : ""
                  }
                />
                <span
                  className={classes.label}
                  style={{
                    color: active === "notifications" ? colors?.primary : "",
                  }}
                >
                  Notifications
                </span>
              </>
            ) : (
              <Invite
                color={
                  active === "notifications"
                    ? colors?.primary
                    : darkMode
                    ? colors?.white
                    : ""
                }
                style={{ margin: "0 0 0 4px" }}
              />
            )}
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className={classes.list}>
            <div
              className={classes.listLabel}
              onClick={() => {
                // dispatch(resetPreferenceCreation());
                dispatch(setSideMenuClick("allNotifications"));
              }}
              style={{
                color:
                  sideMenuClick === "allNotifications" ? colors?.primary : "",
                fontFamily: sideMenuClick === "allNotifications" && "medium",
              }}
            >
              All
            </div>

            <div
              className={classes.listLabel}
              onClick={() => dispatch(setSideMenuClick("unreadNotifications"))}
              style={{
                color:
                  sideMenuClick === "unreadNotifications"
                    ? colors?.primary
                    : "",
                fontFamily: sideMenuClick === "unreadNotifications" && "medium",
              }}
            >
              Unread
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default SideMenuAccordion;
