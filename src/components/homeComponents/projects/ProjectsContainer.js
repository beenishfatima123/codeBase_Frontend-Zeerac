import React from "react";
import { makeStyles } from "@mui/styles";
import ProjectsSvg from "./ProjectsSvg";
import ConnectedButtons from "../../globalComponents/misc/ConnectedButtons";
import { useState } from "react";
import { CONTENT_WIDTH, PROJECT_FILTERS } from "../../../utils/constants";
import MagneticFilings from "./MagneticFilings";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useWindowDims } from "../../../utils/useWindowDims";
import MagneticFilingsSm from "./MagneticFilingsSm";
import { TextTranslation } from "../../../utils/translation";
import { useSelector } from "react-redux";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    margin: "40px 0px",
    width: CONTENT_WIDTH,
    maxWidth: "90%",
    alignSelf: "center",
  },
  topSection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    paddingRight: "5%",
  },
  connectedButtons: {
    display: "flex",
    flexDirection: "row",
    border: "1px solid #134696",
    borderRadius: 20,
    width: "fit-content",
  },
  "@media (max-width: 1024px)": {
    topSection: {
      flexDirection: "column",
      alignItems: "flex-start",
      paddingRight: 0,
    },
    connectedButtons: {
      alignSelf: "center",
      // width: "95%",
    },
  },
  "@media (max-width: 400px)": {
    connectedButtons: {
      width: "95%",
    },
  },
}));

const ProjectsContainer = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { width } = useWindowDims();

  const { langIndex } = useSelector((state) => state.global);
  const [projectFilter, setProjectFilter] = useState(PROJECT_FILTERS[0]);
  return (
    <div className={classes.container}>
      <div className={classes.topSection}>
        <ProjectsSvg />
        <ConnectedButtons
          filter={projectFilter}
          setFilter={setProjectFilter}
          options={PROJECT_FILTERS}
          customStyle={classes.connectedButtons}
        />
      </div>
      {width > 720 ? (
        <MagneticFilings filter={projectFilter} />
      ) : (
        <MagneticFilingsSm filter={projectFilter} />
      )}

      <Button
        sx={{
          background:
            "linear-gradient(90deg, rgba(14,216,100,1) 0%, rgba(255,255,255,1) 100%)",
          textTransform: "none",
          color: "#134696",
          width: 180,
          margin: "10px 5%",
          borderRadius: 0,
          alignSelf: "flex-end",
        }}
        endIcon={<ArrowForwardIcon style={{ color: "#134696" }} />}
        onClick={() => navigate("/listings", { replace: true })}
      >
        {TextTranslation.viewAll[langIndex]}
      </Button>
    </div>
  );
};

export default ProjectsContainer;
