import React from "react";
import { makeStyles } from "@mui/styles";
import RegistrationTop from "../../globalComponents/misc/RegistrationTop";
import { ReactComponent as Content } from "../../../assets/settings/becomeAnAgent.svg";
import AgentForm from "./AgentForm";

const useStyles = makeStyles(() => ({
  container: {
    width: "calc(100vw - 90px)",
    height: "calc(100vh - 72px)",
    overflowY: "scroll",
  },
}));

/* Container component for the becoe an agent registration form.  */
const BecomeAnAgentContainer = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div>
        <RegistrationTop content={<Content />} />
      </div>
      <AgentForm />
    </div>
  );
};

export default BecomeAnAgentContainer;
