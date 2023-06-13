import React from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import {
  PROJECTS_DRAWER_WIDTH,
  PROJECTS_DRAWER_WIDTH_SM,
} from "../../../utils/constants";
import ProjectsShowcase from "./ProjectsShowcase";
import { useWindowDims } from "../../../utils/useWindowDims";
const ProjectsDrawer = ({ open, setOpen }) => {
  const { width } = useWindowDims();

  return (
    <div>
      <SwipeableDrawer
        sx={{
          width: width > 500 ? PROJECTS_DRAWER_WIDTH : PROJECTS_DRAWER_WIDTH_SM,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width:
              width > 500 ? PROJECTS_DRAWER_WIDTH : PROJECTS_DRAWER_WIDTH_SM,
            boxSizing: "border-box",
            zIndex: 100,
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
        onClose={() => setOpen(true)}
        onOpen={() => setOpen(false)}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        <ProjectsShowcase open={open} setOpen={setOpen} />
      </SwipeableDrawer>
    </div>
  );
};

export default ProjectsDrawer;
