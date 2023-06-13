import * as React from "react";
import { Button } from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useSelector } from "react-redux";

export const MenuToggle = ({ toggle }) => {
  const selectedTab = useSelector((state) => state.createProperty.selectedTab);

  return (
    <Button
      disableRipple
      onClick={toggle}
      sx={{
        zIndex: 40,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#134696",

        textTransform: "none",
        "&:hover": {
          backgroundColor: "#134696",
        },
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <PlayCircleIcon
          style={{ fontSize: 30, color: "#FFFFFF", transition: "0.3s" }}
        />
        <span
          style={{
            marginLeft: 20,
            color: "#0ED864",
            fontSize: 32,
            fontFamily: "medium",
          }}
        >
          {selectedTab}
        </span>
      </div>
      <ArrowDropDownIcon style={{ color: "white", fontSize: 26 }} />
    </Button>
  );
};
