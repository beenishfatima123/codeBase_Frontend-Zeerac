import React from "react";
import { Grid } from "@mui/material";
import Left from "./Left";
import Right from "./Right";

const ContentContainer = () => {
  return (
    <Grid
      container
      sx={{
        padding: "10px 5%",
      }}
    >
      <Grid item sm={12} md={5}>
        <Left />
      </Grid>
      <Grid item sm={12} md={7}>
        <Right />
      </Grid>
    </Grid>
  );
};

export default ContentContainer;
