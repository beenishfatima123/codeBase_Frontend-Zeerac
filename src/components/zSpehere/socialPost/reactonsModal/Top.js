import React, { useMemo, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Button, IconButton, Menu, MenuItem } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const BUTTON_TABS_LIMIT = 2;

const useStyles = makeStyles(() => ({
  topContainer: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 0px",
    borderBottom: "1px solid lightGray",
  },
  buttonsContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "4px 16px",
  },
}));

/* heading part of the reaction modal contianing all reactions as buttons to view list of people who reacted. */
const Top = ({
  setSelectedTab,
  selectedTab,
  reactionsToShow,
  post,
  comment,
  handleClose,
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  /* slices reactions to show if they are more than button tab limit. */
  const buttonReactions = useMemo(() => {
    return reactionsToShow?.length > BUTTON_TABS_LIMIT
      ? reactionsToShow?.slice(0, BUTTON_TABS_LIMIT)
      : reactionsToShow;
  }, [reactionsToShow]);

  /* if reactions to show are more than limit, show them in a menu. */
  const menuReactions = useMemo(() => {
    return reactionsToShow?.length > BUTTON_TABS_LIMIT
      ? reactionsToShow?.slice(BUTTON_TABS_LIMIT, reactionsToShow?.length)
      : [];
  }, [reactionsToShow]);
  return (
    <div className={classes.topContainer}>
      <div className={classes.buttonsContainer}>
        <Button
          sx={{
            color: "#545454",
            fontSize: 16,
            borderBottom: selectedTab === "All" ? "4px solid #134696" : "",
            textTransform: "none",
          }}
          onClick={() => setSelectedTab("All")}
        >
          All
        </Button>
        {buttonReactions?.map((elem, index) => (
          <Button
            key={index}
            sx={{
              color: "#545454",
              fontSize: 16,
              borderBottom:
                selectedTab === elem?.label ? "4px solid #134696" : "",
              textTransform: "none",
            }}
            onClick={() => setSelectedTab(elem?.label)}
          >
            <img src={elem?.image} alt="" />
            {post?.reactions?.[`${elem?.label}`] ||
              comment?.reactions?.[`${elem?.label}`]}
          </Button>
        ))}
        {menuReactions?.length > 0 && (
          <>
            <Button
              sx={{
                color: "#545454",
                fontSize: 16,
                textTransform: "none",
              }}
              onClick={(e) => setAnchorEl(e.currentTarget)}
              endIcon={<ArrowDropDownIcon />}
            >
              More
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
            >
              {menuReactions?.map((elem, index) => (
                <MenuItem
                  onClick={() => setSelectedTab(elem?.label)}
                  key={index}
                  sx={{ p: 0 }}
                >
                  <div
                    style={{
                      color: "#545454",
                      fontSize: 16,
                      display: "flex",
                      margin: "0px 8px",
                    }}
                  >
                    <img src={elem?.image} alt="" style={{ marginRight: 10 }} />
                    {post?.reactions?.[`${elem?.label}`] ||
                      comment?.reactions?.[`${elem?.label}`]}
                  </div>
                </MenuItem>
              ))}
            </Menu>
          </>
        )}
      </div>

      <IconButton onClick={handleClose}>
        <CancelIcon sx={{ color: "lightGray", fontSize: 28 }} />
      </IconButton>
    </div>
  );
};

export default Top;
