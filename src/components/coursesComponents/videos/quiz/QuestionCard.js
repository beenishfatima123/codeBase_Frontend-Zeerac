import React from "react";
import { makeStyles } from "@mui/styles";
import { FormControlLabel, Grid, RadioGroup, Radio } from "@mui/material";
const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    padding: "16px",
  },
  question: {
    fontSize: 20,
    color: "#134696",
  },
  input: {
    marginRight: 10,
    accentColor: "#134696",
  },
  "@media (max-width: 1024px)": {
    container: {
      flexDirection: "column",
    },
  },
}));
const QuestionCard = ({ data, answer, handleAnswer }) => {
  const classes = useStyles();

  const handleRadioChange = (event) => {
    handleAnswer(event.target.value);
  };

  return (
    <div className={classes.container}>
      <span className={classes.question}>{data?.question}</span>

      <RadioGroup name="quiz" value={answer || ""} onChange={handleRadioChange}>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              value={data?.option_1}
              control={<Radio />}
              label={data?.option_1}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              value={data?.option_2}
              control={<Radio />}
              label={data?.option_2}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              value={data?.option_3}
              control={<Radio />}
              label={data?.option_3}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              value={data?.option_4}
              control={<Radio />}
              label={data?.option_4}
            />
          </Grid>
        </Grid>
      </RadioGroup>
    </div>
  );
};

export default QuestionCard;
