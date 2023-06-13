import { Avatar } from "@mui/material";
import React from "react";
import {
  StyledTableCell,
  StyledTableRow,
} from "../globalComponents/Table/tableComponents";
import { makeStyles } from "@mui/styles";
import IconsContainer from "../propertyComponents/misc/IconsContainer";
import { useSelector } from "react-redux";
import { useState } from "react";
import CustomTooltip from "../globalComponents/CustomTooltip";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const useStyles = makeStyles(() => ({
  primaryText: {
    fontSize: 16,
    color: "#000000",
    marginLeft: 20,
    fontFamily: "medium",
    textTransform: "capitalize",
    marginBottom: 0,
    marginTop: 0,
  },
  secondaryText: {
    fontSize: 16,
    color: "#8B8B8B",
    marginLeft: 0,
    fontFamily: "light",
    minWidth: 200,
    marginBottom: 0,
    marginTop: 0,
  },
  iconsStyle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 210,
    marginRight: 30,
    zIndex: 20,
  },
}));

/* AgentTableRows are shown on the agents page when window width > 800.
It has avatar, city, company and more options. */
const AgentTableRows = ({ agent, handleRowClick }) => {
  const classes = useStyles();
  const { darkMode } = useSelector((state) => state.global);
  const [iconActions, setIconActions] = useState();
  const [anchorEl, setAnchorEl] = useState(null);
  const getName = (name) => {
    if (name?.length > 15) return `${name}`?.substring(0, 15) + "...";
    else return name || "Anonymous";
  };
  const getAgencyName = (name) => {
    if (name?.length > 15) return `${name}`?.substring(0, 15) + "...";
    else return name || "Private Agent";
  };
  return (
    <StyledTableRow style={{ cursor: "pointer", zIndex: 10 }}>
      <StyledTableCell
        component="th"
        scope="row"
        style={{ display: "flex", alignItems: "center" }}
        onClick={() => handleRowClick(agent)}
      >
        <Avatar
          alt={agent?.full_name}
          src={`${agent?.photo}`}
          style={{ height: 60, width: 60 }}
        />
        <CustomTooltip title={agent?.full_name || ""}>
          <p
            className={classes.primaryText}
            style={{
              color: darkMode ? "#fff" : "#000000",
              height: 30,
              width: "100%",
            }}
          >
            {getName(agent?.full_name)}
          </p>
        </CustomTooltip>
      </StyledTableCell>
      <CustomTooltip title={`${agent?.city || ""} ${agent?.country || ""}`}>
        <StyledTableCell
          align="left"
          onClick={() => handleRowClick(agent)}
          sx={{ maxWidth: 150 }}
        >
          <p className={classes.secondaryText}>
            {/* {`${agent?.city || ""} ${agent?.country || ""}`} */}
            {`${agent?.city || "NA"}`}
          </p>
        </StyledTableCell>
      </CustomTooltip>
      <StyledTableCell align="left" onClick={() => handleRowClick(agent)}>
        <CustomTooltip title={agent?.company || ""}>
          <p className={classes.secondaryText}>
            {getAgencyName(agent?.company)}
          </p>
        </CustomTooltip>
      </StyledTableCell>
      <StyledTableCell
        align="left"
        onClick={() => handleRowClick(agent)}
        sx={{ maxWidth: 30 }}
      >
        <p className={classes.secondaryText}>
          {`${agent?.total_listings || "0"} listings`}
        </p>
      </StyledTableCell>
      <StyledTableCell align="left">
        <IconButton onClick={(e) => setAnchorEl(e?.currentTarget)}>
          <MoreVertIcon />
        </IconButton>
      </StyledTableCell>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        PaperProps={{
          elevation: 0,
          sx: {
            padding: 0,
            borderRadius: "5px",
            backgroundColor: darkMode ? "#303134" : "#fff",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          },
        }}
      >
        <MenuItem
          disableRipple
          sx={{
            "&:hover": {
              background: "none",
            },
            transitionDuration: "0s !important",
          }}
        >
          <IconsContainer
            customStyle={classes.iconsStyle}
            phoneNumber={agent?.phone_number}
            setPropertyActions={setIconActions}
            propertyActions={iconActions}
            customColor={darkMode ? "#fff" : "#000000"}
            agent={agent}
          />
        </MenuItem>
      </Menu>
    </StyledTableRow>
  );
};

export default AgentTableRows;
