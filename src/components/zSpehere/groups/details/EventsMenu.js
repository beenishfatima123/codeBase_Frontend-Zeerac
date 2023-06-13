import React, { useState, useMemo } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useSelector } from "react-redux";

const options = [
  {
    name: "share",
    value: "Share",
  },
  {
    name: "delete",
    value: "Delete this Event",
  },
  {
    name: "invite",
    value: "Invite",
  },
  {
    name: "report",
    value: "Report Event",
  },
];

/* shows actions menu for an event in upcoming events section. */
const EventsMenu = ({ admin, handleMenuClick }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const { currentUser } = useSelector((state) => state.auth);
  const { selectedGroup } = useSelector((state) => state.groups);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  /* filters options on groups based on the type of user or type of role in group. */
  const _options = useMemo(() => {
    if (currentUser?.id !== admin && selectedGroup?.admin !== currentUser?.id) {
      return options?.filter((elem) => elem?.value !== "Delete this Event");
    } else if (
      (currentUser?.id === admin && selectedGroup?.admin === currentUser?.id) ||
      currentUser?.id === admin
    ) {
      return options?.filter((elem) => elem?.value !== "Report Event");
    } else {
      return options;
    }
    // eslint-disable-next-line
  }, [options, admin, currentUser, selectedGroup]);

  // console.log({ currentUser, admin, selectedGroup });

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            width: "20ch",
            borderRadius: 20,
            border: "1px solid #D0D0D0",
          },
        }}
      >
        {_options?.map((option, index) => (
          <MenuItem
            key={index}
            name={option?.name}
            selected={option === "Pyxis"}
            onClick={() => {
              handleMenuClick(option);
              handleClose();
            }}
            sx={{
              borderBottom: index !== 4 && "1px solid #D0D0D0",
              fontSize: 14,
              fontFamily: "light",
              color: "#171725",
              "&:hover": {
                backgroundColor: "#134696",
                color: "#fff",
              },
            }}
          >
            {option?.value}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default EventsMenu;
