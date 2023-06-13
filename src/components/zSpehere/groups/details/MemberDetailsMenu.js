import React, { useMemo, useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import {
  makeModerator,
  removeFromGroup,
  removeModerator,
} from "../../../../redux/slices/groupsSlice";
import AgentReport from "../../../agentComponents/details/ReportAgent";
import { useNavigate } from "react-router-dom";

/* Menu component for each group member, moderators can remove adn report from this menu. */
const MemberDetailsMenu = ({ menuAnchor, handleClose, selectedUser }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.auth);
  const { selectedGroup } = useSelector((state) => state.groups);
  const [reportedAgent, setReportedAgent] = useState(false);

  const adminPrivileges = useMemo(() => {
    let _privileges = false;
    if (selectedGroup?.admin + "" === currentUser?.id + "") _privileges = true;
    selectedGroup?.moderators?.forEach((mod) => {
      if (mod === currentUser?.id) _privileges = true;
    });
    return _privileges;
  }, [currentUser, selectedGroup]);

  const isModerator = useMemo(() => {
    let _mod = false;
    selectedGroup?.moderators?.forEach((mod) => {
      if (mod === selectedUser?.id) _mod = true;
    });
    return _mod;
  }, [selectedUser, selectedGroup]);

  const handleModeration = () => {
    if (!isModerator) {
      dispatch(
        makeModerator({
          id: selectedGroup?.id,
          user: selectedUser,
          token: currentUser?.token,
        })
      );
    } else {
      dispatch(
        removeModerator({
          id: selectedGroup?.id,
          user: selectedUser,
          token: currentUser?.token,
        })
      );
    }
    handleClose();
  };
  const handleRemove = () => {
    // console.log({ selectedGroup, selectedUser });
    dispatch(
      removeFromGroup({
        id: selectedGroup?.id,
        user: selectedUser,
        token: currentUser?.token,
      })
    );
    handleClose();
  };

  return (
    <div>
      <Menu
        anchorEl={menuAnchor}
        open={menuAnchor ? true : false}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {adminPrivileges && selectedUser?.id !== selectedGroup?.admin && (
          <MenuItem onClick={handleModeration}>
            {!isModerator ? "Add as Moderator" : "Remove as Moderator"}
          </MenuItem>
        )}
        {adminPrivileges && selectedUser?.id !== selectedGroup?.admin && (
          <MenuItem onClick={handleRemove}>Remove From Group</MenuItem>
        )}
        {selectedUser?.id !== currentUser?.id ? (
          <MenuItem
            onClick={() => {
              // handleClose();
              setReportedAgent(selectedUser);
            }}
          >
            Report
          </MenuItem>
        ) : (
          <MenuItem onClick={navigate(`/zSphere/user/${currentUser?.id}`)}>
            View Profile
          </MenuItem>
        )}
      </Menu>

      {reportedAgent && (
        <AgentReport
          open={reportedAgent}
          setOpen={setReportedAgent}
          reportedAgent={reportedAgent}
        />
      )}
    </div>
  );
};

export default MemberDetailsMenu;
