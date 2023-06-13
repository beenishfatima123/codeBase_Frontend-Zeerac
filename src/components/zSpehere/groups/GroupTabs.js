import { Button } from "@mui/material";
import React from "react";

/* when width < 850, showing group tabs as links on top in groups page. */
const GroupTabs = ({ tabs, tab, setTab }) => {
  return (
    <div>
      {tabs?.map((elem, index) => (
        <Button
          sx={{
            color: "#134696",
            fontSize: 16,
            padding: "8px 16px",
            textDecorationLine: tab === elem ? "underline" : "none",
            textTransform: "capitalize",
            "&:hover": {
              textDecorationLine: tab === elem ? "underline" : "none",
            },
          }}
          key={index}
          onClick={() => setTab(elem)}
        >
          {elem?.replace("_", " ")}
        </Button>
      ))}
    </div>
  );
};

export default GroupTabs;
