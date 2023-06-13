import React, { useState } from "react";
import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import { HEADER_CONTENT_WIDTH } from "../../../../utils/constants";

const submitSx = {
  backgroundColor: "#134696",
  color: "#fff",
  cursor: "pointer",
  fontFamily: "medium",
  fontSize: 16,
  textTransform: "capitalize",
  padding: "5px 20px",

  "&:hover": {
    backgroundColor: "#134696",
  },
};

const useStyles = makeStyles(() => ({
  container: {
    width: HEADER_CONTENT_WIDTH,
    maxWidth: "90%",
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
    margin: "20px 0",
    padding: 20,
  },
  heading: {
    textAlign: "center",
    fontFamily: "heavy",
    color: "#134696",
  },
  questionContainer: {
    margin: "10px 0",
  },
  question: {
    fontFamily: "medium",
    fontSize: 20,
    margin: "5px 0",
  },
  option: {
    fontSize: 16,
    margin: "5px 0",
  },
  input: {
    marginRight: 10,
    accentColor: "#134696",
  },
}));

const Questions = () => {
  const classes = useStyles();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const { courseModule } = useSelector((state) => state.course);

  const handleOptionChange = (questionId, selectedOption) => {
    setSelectedOptions((prevOptions) => {
      const updatedOptions = [...prevOptions];
      const existingOptionIndex = updatedOptions.findIndex(
        (option) => option.questionId === questionId
      );

      if (existingOptionIndex !== -1) {
        // If an option for the question already exists, update it
        updatedOptions[existingOptionIndex].selectedOption = selectedOption;
      } else {
        // If no option for the question exists, add a new one
        updatedOptions.push({ questionId, selectedOption });
      }

      return updatedOptions;
    });
  };

  const handleSubmit = () => {
    const correctAnswers = courseModule?.result?.chapters[0]?.questions?.map(
      (question) => ({
        questionId: question?.id,
        correctAnswer: question?.correct_answer,
      })
    );
    console.log({ correctAnswers });
    const userAnswers = selectedOptions.map((option) => ({
      questionId: option.questionId,
      selectedAnswer: option.selectedOption,
    }));
    console.log({ userAnswers });

    // Compare userAnswers with correctAnswers
    const results = userAnswers.map((userAnswer) => {
      const questionId = userAnswer.questionId;
      const selectedAnswer = userAnswer.selectedAnswer;
      const correctAnswer = correctAnswers.find(
        (answer) => answer.questionId === questionId
      )?.correctAnswer;
      return {
        questionId,
        selectedAnswer,
        correctAnswer,
        isCorrect: selectedAnswer === correctAnswer,
      };
    });
    console.log({ results });

    // You can perform further actions based on the results
  };

  //   console.log({ selectedOptions });
  //   console.log({ questions: courseModule?.result?.chapters[0]?.questions });

  return (
    <div className={classes.container}>
      <h1 className={classes.heading}>Quiz</h1>
      <div>
        {courseModule?.result?.chapters[0]?.questions?.map((item, index) => (
          <div className={classes.questionContainer} key={index}>
            <div className={classes.question}>{item?.question}</div>
            <div className={classes.option}>
              <input
                className={classes.input}
                name={`question-${item?.id}`}
                onChange={() => handleOptionChange(item?.id, item?.option_1)}
                type="radio"
                id={item?.id}
              />
              {item?.option_1}
            </div>
            <div className={classes.option}>
              <input
                className={classes.input}
                name={`question-${item?.id}`}
                onChange={() => handleOptionChange(item?.id, item?.option_2)}
                type="radio"
                id={item?.id}
              />
              {item?.option_2}
            </div>
            <div className={classes.option}>
              <input
                className={classes.input}
                name={`question-${item?.id}`}
                onChange={() => handleOptionChange(item?.id, item?.option_3)}
                type="radio"
                id={item?.id}
              />
              {item?.option_3}
            </div>
            <div className={classes.option}>
              <input
                className={classes.input}
                name={`question-${item?.id}`}
                onChange={() => handleOptionChange(item?.id, item?.option_4)}
                type="radio"
                id={item?.id}
              />
              {item?.option_4}
            </div>
          </div>
        ))}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button sx={submitSx} onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Questions;
