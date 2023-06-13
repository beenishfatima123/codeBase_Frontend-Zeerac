import React, { useMemo } from "react";
import { makeStyles } from "@mui/styles";
import Accordion from "@mui/material/Accordion";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { useSelector } from "react-redux";
import { SETTINGS_ACCORDION_ITEMS } from "../../../utils/constants";
import { useLocation, useNavigate } from "react-router-dom";
import { PROFILE_SUB_TABS } from "../../../utils/constants";

const useStyles = makeStyles(() => ({
  label: {
    fontSize: 16,
    fontFamily: "medium",
    marginLeft: 8,
    marginTop: 2,
    textTransform: "capitalize",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 16,
  },
  listLabel: {
    padding: "4px 16px",
    cursor: "pointer",
    fontSize: 16,
    fontFamily: "light",
    color: "#ADA7A7",
    textTransform: "capitalize",
  },
}));

/* SettingsAccordian maps the settings options with each options having its accordion and navigation response. */
const SettingsAccordion = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { currentUser } = useSelector((state) => state.auth);
  const { colors, darkMode } = useSelector((state) => state.global);

  const path = useMemo(
    () => pathname?.split("/")?.filter((elem) => elem !== ""),
    [pathname]
  );
  const hideItem = (subItem) => {
    let _hide = subItem?.hideFrom?.includes(currentUser?.user_type);
    if (_hide) return false;
    else if (
      subItem?.label === PROFILE_SUB_TABS.PASSWORD &&
      !currentUser?.provider
    )
      return false;
    else return true;
  };
  return (
    <div>
      {SETTINGS_ACCORDION_ITEMS?.map((elem, index) => (
        <Accordion
          key={index}
          // onClick={() => setActive("profile")}
          sx={{
            padding: "10px 0",
            boxShadow: "none",
            borderBottom: "1px solid #e5e5e5",
            color: darkMode ? colors?.white : colors?.black,
            backgroundColor: darkMode ? colors?.jetBlack : colors?.white,
          }}
          defaultExpanded
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              minHeight: "20px !important",
              ".MuiAccordionSummary-root": {
                minHeight: "20px",
              },
              ".Mui-expanded": {
                margin: "4px 0px",
                minHeight: "20px",
              },
              ".MuiAccordionSummary-content": {
                margin: "4px 0px",
                minHeight: "20px",
              },
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-end" }}>
              {elem?.icon || ""}
              <span
                className={classes.label}
                style={{
                  color: path[2] === elem?.title ? colors?.primary : "",
                }}
              >
                {elem?.title?.replace("_", " ")}
              </span>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div className={classes.list}>
              {elem?.subItems?.filter(hideItem)?.map((subItem, pos) => (
                <span
                  className={classes.listLabel}
                  key={pos}
                  onClick={() =>
                    navigate(
                      `/settings/profile/${elem?.title}/${subItem?.label}`
                    )
                  }
                  style={{
                    color: path[3] === subItem?.label ? colors?.primary : "",
                    fontFamily: path[3] === subItem?.label && "medium",
                  }}
                >
                  {subItem?.label?.replace("_", " ")}
                </span>
              ))}
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default SettingsAccordion;
