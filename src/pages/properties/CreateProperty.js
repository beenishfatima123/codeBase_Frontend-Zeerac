import React from "react";
import { makeStyles } from "@mui/styles";
import TopSection from "../../components/propertyComponents/createPropertyPost/TopSection";
import ContentContainer from "../../components/propertyComponents/createPropertyPost/content/ContentContainer";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
}));

/* CreateProperty page allows user to add a property to Listings.  */
const CreateProperty = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <TopSection />
      <ContentContainer />
    </div>
  );
};

export default CreateProperty;
