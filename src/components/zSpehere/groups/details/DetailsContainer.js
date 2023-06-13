import React, { Suspense, lazy, useMemo } from "react";

import { makeStyles } from "@mui/styles";
import { useNavigate, useParams } from "react-router-dom";

import ComponentLoader from "../../../globalComponents/ComponentLoader";
import GradientBtn from "../../../globalComponents/misc/GradientBtn";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
const GroupDetails = lazy(() => import("./GroupDetails"));
const Posts = lazy(() => import("./Posts"));

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
  },
  topContainer: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-end",
    minHeight: 50,
  },
}));

/* contains all components on right content of the groups page. */
const DetailsContainer = () => {
  const classes = useStyles();
  const params = useParams();
  const navigate = useNavigate();

  /* if a group is selected show its details otherwise show posts. */
  const renderContent = useMemo(() => {
    if (params?.id) return <GroupDetails />;
    else return <Posts />;
  }, [params?.id]);

  return (
    <div className={classes.container}>
      {params?.id && (
        <div className={classes.topContainer}>
          <GradientBtn
            label={"Back"}
            startIcon={<KeyboardBackspaceIcon />}
            customStyle={{ minWidth: 135 }}
            onClick={() => navigate("/zSphere/Groups")}
          />
        </div>
      )}

      <Suspense fallback={<ComponentLoader />}>{renderContent}</Suspense>
    </div>
  );
};

export default DetailsContainer;
