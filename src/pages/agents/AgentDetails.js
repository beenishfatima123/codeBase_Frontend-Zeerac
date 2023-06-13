import React, { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedAgent } from "../../redux/slices/agentsSlice";
import ComponentLoader from "../../components/globalComponents/ComponentLoader";
import { Grid } from "@mui/material";
import LeftContainer from "../../components/agentComponents/details/LeftContainer";
import RightContainer from "../../components/agentComponents/details/RightContainer";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    marginTop: 10,
  },
  "@media (max-width: 1024px)": {
    container: {
      flexDirection: "column",
    },
  },
}));

/* AgentDetails page shows left container containing generic details of agent like
name, address, listings, verification etc while right container has details like 
experience, all listings, personal details. */
const AgentDetails = () => {
  const classes = useStyles();
  const params = useParams();
  const dispatch = useDispatch();

  const { selectedAgentApiInfo } = useSelector((state) => state.agents);

  useEffect(() => {
    dispatch(getSelectedAgent({ id: params?.id }));
    // eslint-disable-next-line
  }, [params?.id]);
  return (
    <div className={classes.container}>
      {selectedAgentApiInfo?.loading ? (
        <ComponentLoader />
      ) : (
        <Grid container>
          <Grid item sm={12} md={3}>
            <LeftContainer />
          </Grid>
          <Grid item sm={12} md={9}>
            <RightContainer />
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default AgentDetails;
