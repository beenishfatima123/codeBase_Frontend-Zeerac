import React, { useMemo, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import ShowcaseTopSection from "../../components/partners/ShowcaseTopSection";
import { useDispatch, useSelector } from "react-redux";
import ComponentLoader from "../../components/globalComponents/ComponentLoader";
import { getAllProjects } from "../../redux/slices/projectSlice";
import PartnersCard from "../../components/partners/PartnersCard";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    margin: "20px 0px",
  },
}));

/* PartnersShowcase is the main page where all the projects are listed. */
const PartnersShowcase = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { allProjects, allProjectsApiInfo } = useSelector(
    (state) => state.projects
  );

  useEffect(() => {
    if (!allProjects) {
      dispatch(getAllProjects());
    }
    // eslint-disable-next-line
  }, [allProjects]);

  const dataToShow = useMemo(() => {
    if (!allProjects) return null;
    else return allProjects?.result?.results;
  }, [allProjects]);

  return (
    <div className={classes.container}>
      <ShowcaseTopSection />

      {allProjectsApiInfo?.loading ? (
        <ComponentLoader />
      ) : (
        <PartnersCard logos={dataToShow} />
      )}
    </div>
  );
};

export default PartnersShowcase;
