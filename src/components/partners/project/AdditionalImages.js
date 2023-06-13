import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import NotFound from "../../globalComponents/NotFound";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
} from "@mui/material";
import LightBox from "../../globalComponents/LightBox";

const useStyles = makeStyles(() => ({
  data: {
    fontSize: 17,
    fontFamily: "light",
    color: "#000000",
  },
  description: {
    fontSize: 17,
    fontFamily: "light",
    color: "#000000",
    height: 50,
    overflow: "hidden",
    textAlign: "center",
  },
  title: {
    color: "#134696",
    fontSize: 22,
    fontFamily: "medium",
  },
}));

/* AdditionalImages component is displayed after project location
on individual project's page. */
const AdditionalImages = () => {
  const classes = useStyles();

  const [showLightBox, setShowLightBox] = useState();

  const { projectDetails } = useSelector((state) => state.projects);
  const { darkMode } = useSelector((state) => state.global);

  return (
    <Accordion
      sx={{
        boxShadow: "none",
        width: "100%",
        borderTop: "1.5px solid #707070",
        borderBottom: "1.5px solid #707070",
      }}
      defaultExpanded
    >
      <AccordionSummary
        sx={{
          boxShadow: "none",
          backgroundColor: darkMode ? "#303134" : "#fff",
        }}
        expandIcon={
          <AddIcon style={{ color: darkMode ? "#0ed864" : "#134696" }} />
        }
      >
        <span
          className={classes.title}
          style={{
            color: darkMode ? "#0ed864" : "#134696",
          }}
        >
          Additional Images:
        </span>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: darkMode ? "#303134" : "#fff",
        }}
      >
        {projectDetails?.project_photo?.length > 0 ? (
          <Grid container spacing={1}>
            {projectDetails?.project_photo?.map((value, index) => (
              <Grid
                item
                key={index}
                xs={12}
                sm={12}
                md={6}
                lg={6}
                onClick={() => setShowLightBox(true)}
              >
                <img
                  alt=""
                  src={value?.photo}
                  style={{
                    height: 400,
                    width: "100%",
                    objectFit: "cover",
                    cursor: "pointer",
                  }}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <NotFound label={"No Images"} />
        )}
        {showLightBox && (
          <LightBox
            images={projectDetails?.project_photo?.map((elem) => {
              return `${elem?.photo}`;
            })}
            setOpen={setShowLightBox}
            open={showLightBox}
          />
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default AdditionalImages;
