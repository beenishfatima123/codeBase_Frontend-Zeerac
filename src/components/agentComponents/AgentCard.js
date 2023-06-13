import { makeStyles } from "@mui/styles";
import React, { useMemo } from "react";
import { useWindowDims } from "../../utils/useWindowDims";
import AgentCardInfo from "./AgentCardInfo";
import { getRandomAvatar } from "../../utils/helperFunctions";
const useStyles = makeStyles(() => ({
  container: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
  },
  backgroundImage: {
    height: "60%",
    width: "100%",
    "&:hover": {
      opacity: 0.5,
    },
  },
}));

/* AgentCard shows the individual information card of agent. It contains
AgentCardInfo component. */
const AgentCard = ({ agent }) => {
  const classes = useStyles();
  const { height } = useWindowDims();
  const randomAvatar = useMemo(() => getRandomAvatar(), []);
  return (
    <div className={classes.container} style={{ height: height - 64 || 500 }}>
      <img
        src={agent?.photo ? `${agent?.photo}` : randomAvatar}
        alt=""
        className={classes.backgroundImage}
      />

      <AgentCardInfo agent={agent} />
    </div>
  );
};

export default AgentCard;
