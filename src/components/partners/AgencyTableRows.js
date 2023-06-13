import { Avatar } from "@mui/material";
import React from "react";
import {
  StyledTableCell,
  StyledTableRow,
} from "../globalComponents/Table/tableComponents";
import { makeStyles } from "@mui/styles";
import IconsContainer from "../propertyComponents/misc/IconsContainer";
// eslint-disable-next-line
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

/* AgencyTableRows are shown on the agencies page when window width > 600.
It has avatar, location, employees, listings and more options. */
const AgencyTableRows = ({ agency, handleRowClick }) => {
  const classes = useStyles();

  const { darkMode } = useSelector((state) => state.global);
  const [iconActions, setIconActions] = useState();
  const [anchorEl, setAnchorEl] = useState(null);

  const getName = (name) => {
    if (name?.length > 10) return `${name}`?.substring(0, 10) + "...";
    else return name;
  };
  const getCompanyAddress = (address) => {
    if (address?.trim()?.length < 1) return "N/A";
    else return address;
  };
  return (
    <StyledTableRow style={{ cursor: "pointer", zIndex: 10 }}>
      <StyledTableCell
        component="th"
        scope="row"
        style={{ display: "flex", alignItems: "center" }}
        onClick={() => handleRowClick(agency)}
      >
        <Avatar
          alt={agency?.company_name}
          src={`${agency?.company_logo}`}
          style={{ height: 60, width: 60 }}
        />
        <CustomTooltip title={agency?.company_name}>
          <p
            className={classes.primaryText}
            style={{
              color: darkMode ? "#fff" : "#000000",
            }}
          >
            {getName(agency?.company_name)}
          </p>
        </CustomTooltip>
      </StyledTableCell>
      <CustomTooltip
        title={getCompanyAddress(
          `${agency?.company_areas || ""} ${agency?.company_city || ""}`
        )}
      >
        <StyledTableCell
          align="left"
          onClick={() => handleRowClick(agency)}
          sx={{ maxWidth: 150 }}
        >
          <p
            className={classes.secondaryText}
            style={{ height: 45, overflow: "hidden" }}
          >
            {getCompanyAddress(
              `${agency?.company_areas || ""} ${agency?.company_city || ""}`
            )}
          </p>
        </StyledTableCell>
      </CustomTooltip>
      <StyledTableCell
        align="left"
        onClick={() => handleRowClick(agency)}
        sx={{ maxWidth: 200 }}
      >
        <p className={classes.secondaryText}>
          {`${agency?.user?.length || "0"} employees`}
        </p>
      </StyledTableCell>
      <StyledTableCell
        align="left"
        onClick={() => handleRowClick(agency)}
        sx={{ maxWidth: 150 }}
      >
        <p className={classes.secondaryText}>
          {`${agency?.total_listings || "0"} listings`}
        </p>
      </StyledTableCell>
      <StyledTableCell align="left" sx={{ maxWidth: 30 }}>
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
            phoneNumber={agency?.company_phone}
            setPropertyActions={setIconActions}
            propertyActions={iconActions}
            customColor={darkMode ? "#fff" : "#000000"}
            agency={agency}
          />
        </MenuItem>
      </Menu>
    </StyledTableRow>
  );
};

export default AgencyTableRows;
