import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { getProjectDetails } from "../../redux/slices/projectSlice";
import ComponentLoader from "../../components/globalComponents/ComponentLoader";
import DetailsTop from "../../components/partners/project/DetailsTop";
import ProjectTitle from "../../components/partners/project/ProjectTitile";
import OtherPartners from "../../components/partners/details/OtherPartners";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    paddingTop: 5,
  },
  heading: {
    color: "#134696",
    fontSize: 32,
  },
  slider: {
    margin: "20px 5%",
  },
}));

/* ProjectDetails is the page for individual project including
project description, location, additional images and related projects. */
const ProjectDetails = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const params = useParams();

  const { projectDetails, projectDetailsApiInfo } = useSelector(
    (state) => state.projects
  );

  useEffect(() => {
    if (!projectDetails) {
      dispatch(getProjectDetails({ id: params?.id }));
      // eslint-disable-next-line
    }
    if (projectDetails?.id !== params?.id) {
      dispatch(getProjectDetails({ id: params?.id }));
    }
    // eslint-disable-next-line
  }, [params?.id]);

  return (
    <div className={classes.container}>
      {projectDetailsApiInfo?.loading ? (
        <ComponentLoader />
      ) : (
        <>
          <DetailsTop />
          <ProjectTitle />
          <OtherPartners />
        </>
      )}
    </div>
  );
};

export default ProjectDetails;
