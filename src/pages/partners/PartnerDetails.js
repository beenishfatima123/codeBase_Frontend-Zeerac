import React, { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPartner } from "../../redux/slices/partnersSlice";
import LogoImage from "../../components/partners/details/LogoImage";
import CompanyDetail from "../../components/partners/details/CompanyDetail";
import CompanyProjects from "../../components/partners/details/CompanyProjects";
import CompanyListings from "../../components/partners/details/CompanyListings";
import CompanyAgents from "../../components/partners/details/CompanyAgents";
import AgencyRequests from "../../components/partners/details/AgencyRequests";
import OtherAgencies from "../agency/OtherAgencies";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    paddingTop: 5,
  },

  "@media (max-width: 1024px)": {
    container: {
      flexDirection: "column",
    },
  },
}));

/* PartnerDetails is the main page for individual agency. It contains
components like LogoImage, CompanyDetail, CompanyProject,
CompanyListings, CompanyAgents, AgencyRequests and OtherAgencies. */
const PartnerDetails = () => {
  const classes = useStyles();
  const params = useParams();
  const dispatch = useDispatch();

  const { partnerDetails } = useSelector((state) => state.partners);
  const { currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getPartner({ id: params?.id }));
    // eslint-disable-next-line
  }, [params?.id]);

  return (
    <div className={classes.container}>
      <LogoImage />
      <CompanyDetail />
      <CompanyProjects />
      <CompanyListings />
      <CompanyAgents />
      {currentUser?.id === partnerDetails?.admin && <AgencyRequests />}

      <OtherAgencies />
    </div>
  );
};

export default PartnerDetails;
