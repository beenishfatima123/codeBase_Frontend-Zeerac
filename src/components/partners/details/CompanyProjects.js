import React, { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import HeadingSvg from "./HeadingSvg";
import { getPartnerProjects } from "../../../redux/slices/partnersSlice";
import ComponentLoader from "../../globalComponents/ComponentLoader";
import { Grid } from "@mui/material";
import ProjectCard from "./ProjectCard";
import { useMemo } from "react";
import NotFound from "../../globalComponents/NotFound";
import { HEADER_CONTENT_WIDTH } from "../../../utils/constants";
const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "90%",
    alignSelf: "center",
    width: HEADER_CONTENT_WIDTH,
    alignItems: "center",
  },
  topContainer: {
    display: "flex",
    flex: 1,
    justifyContent: "space-between",
    padding: "20px 0px",
    minHeight: 100,
    position: "relative",
    width: "100%",
    left: -80,
  },

  bottomBorder: {
    height: 1,
    width: "90%",
    alignSelf: "center",
    backgroundColor: "#707070",
  },
  description: {
    color: "#7D7D7D",
    fontSize: 18,
    margin: "20px 5%",
  },
  projectsGrid: {
    display: "flex",
    flex: 1,
  },
  sideGrid: {
    display: "flex",
    flexDirection: "column",
  },
  "@media (max-width: 900px)": {
    sideGrid: {
      flexDirection: "column",
    },
  },
  "@media (max-width: 700px)": {
    topContainer: {
      flexDirection: "column",
    },
    iconsStyle: {
      maxWidth: "90%",
      marginRight: 0,
      alignSelf: "flex-end",
      marginTop: 50,
    },
    about: {
      marginLeft: 100,
      fontSize: 28,
    },
  },
}));

/* CompanyProjects is the projects section on partner page where all projects
by an agency are listed. */
const CompanyProjects = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { partnerDetails, allPartnerProjects, allPartnerProjectsApiInfo } =
    useSelector((state) => state.partners);

    /* showcaseProjects displays 3 projects by that agency on partner page. */
  const showcaseProjects = useMemo(() => {
    if (allPartnerProjects?.projects?.length >= 3)
      return allPartnerProjects?.projects?.slice(0, 3);
    else return allPartnerProjects?.projects;
  }, [allPartnerProjects]);

  /* this useEffect works when allPartnerProjects or partnerDetails changes
  and it gets all partner projects using dispatch. */
  useEffect(() => {
    // // console.log({ allPartnerProjects });
    if (!allPartnerProjects && partnerDetails) {
      // // console.log("sending request");
      dispatch(getPartnerProjects({ id: partnerDetails?.id }));
    }
    // eslint-disable-next-line
  }, [allPartnerProjects, partnerDetails]);

  return (
    <div className={classes.container}>
      <div className={classes.topContainer}>
        <HeadingSvg
          heading={`All Projects by ${partnerDetails?.company_name}`}
        />
      </div>
      {allPartnerProjectsApiInfo?.loading ? (
        <ComponentLoader />
      ) : (
        <Grid
          container
          sx={{
            padding: "20px 5%",
          }}
        >
          <Grid item xs={12} sm={12} md={12} lg={8} columnSpacing={2}>
            {showcaseProjects?.length >= 1 && (
              <ProjectCard project={showcaseProjects[0]} large />
            )}
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={4} columnSpacing={2}>
            <div className={classes.sideGrid}>
              {showcaseProjects?.length >= 2 && (
                <ProjectCard project={showcaseProjects[1]} />
              )}
              {showcaseProjects?.length >= 3 && (
                <>
                  <ProjectCard project={showcaseProjects[2]} />
                </>
              )}
            </div>
          </Grid>
        </Grid>
      )}
      {allPartnerProjects?.projects?.length > 0 ? (
        <Grid
          container
          sx={{
            padding: "20px 5%",
          }}
        >
          {allPartnerProjects?.projects?.map((elem, index) => (
            <Grid item xs={12} sm={6} md={4} key={index} columnSpacing={2}>
              <ProjectCard project={elem} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <NotFound label="No Projects" />
      )}
      <div className={classes.bottomBorder} />
    </div>
  );
};

export default CompanyProjects;
