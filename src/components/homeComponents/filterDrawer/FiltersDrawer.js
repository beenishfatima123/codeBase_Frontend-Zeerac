import React from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import DrawerContent from "./DrawerContent";
import { FILTER_DRAWER_WIDTH } from "../../../utils/constants";

const FiltersDrawer = (props) => {
  const { open, setOpen } = props;

  return (
    <div>
      <SwipeableDrawer
        sx={{
          width: FILTER_DRAWER_WIDTH,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: FILTER_DRAWER_WIDTH,
            boxSizing: "border-box",
            zIndex: 1,
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
        onClose={() => setOpen(true)}
        onOpen={() => setOpen(false)}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        <DrawerContent setOpen={setOpen} />
      </SwipeableDrawer>
    </div>
  );
};

export default FiltersDrawer;
