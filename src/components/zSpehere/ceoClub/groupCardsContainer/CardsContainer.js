import React from "react";
import { makeStyles } from "@mui/styles";
//import GroupCard from "./GroupCard";
import { Grid } from "@mui/material";
import GroupCard1 from "./GroupCard1";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  "@media (max-width: 600px)": {
    container: {
      flexDirection: "column",
    },
  },
}));

const cardData = [
  {
    title: "Blue Arc Worldwide",
    totalMembers: "15,321",
  },
  {
    title: "Blue Arc Worldwide",
    totalMembers: "15,321",
  },
  {
    title: "Blue Arc Worldwide",
    totalMembers: "15,321",
  },
];
const CardsContainer = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Grid container spacing={2} justifyContent={"center"}>
        {cardData?.map((elem, index) => (
          <>
            {/* <Grid item xs={12} sm={6} md={4} key={index}>
              <GroupCard group={elem} />
            </Grid> */}
            <Grid item xs={10} sm={6} md={4} key={index}>
              <GroupCard1 group={elem} />
            </Grid>
          </>
        ))}
      </Grid>
    </div>
  );
};

export default CardsContainer;
