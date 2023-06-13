import moment from "moment";
import QuizInfo from "./QuizInfo";
import { toast } from "react-toastify";
import { makeStyles } from "@mui/styles";
import { Button } from "@mui/material";
import QuestionCard from "./QuestionCard";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useMemo, useState } from "react";
import ButtonLoader from "../../../globalComponents/ButtonLoader";
import { HEADER_CONTENT_WIDTH } from "../../../../utils/constants";
import { useCountdown } from "../../../../utils/hooks/useCountdown";
import ComponentLoader from "../../../globalComponents/ComponentLoader";
import {
  getModuleQuiz,
  getQuizSubmission,
  postQuizSubmission,
  resetQuizResult,
} from "../../../../redux/slices/courseSlice";

const prevSx = {
  textTransform: "none",
  border: "1px solid #134696",
  color: "#134696",
  padding: "4px 16px",
  mr: 1,
};
const nextSx = {
  textTransform: "none",
  backgroundColor: "#134696",
  color: "#fff",
  padding: "4px 16px",
  ml: 1,
  "&:hover": {
    backgroundColor: "#134696",
  },
};
const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
    flex: 1,
    margin: "8px 0px",
  },
  topContainer: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 16px",
  },
  heading: {
    textAlign: "center",
    fontFamily: "heavy",
    color: "#134696",
    fontSize: 24,
  },
  btnContainer: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 16,
  },
  completedContainer: {
    padding: 16,
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  reAttempt: {
    padding: 20,
    textAlign: "center",
    fontFamily: "heavy",
    fontSize: 24,
    color: "#0ed864",
  },
  "@media (max-width: 1024px)": {
    container: {
      flexDirection: "column",
    },
  },
}));
const QuizContainer = () => {
  const classes = useStyles();
  const params = useParams();
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.auth);
  const {
    getQuizResult,
    getQuizResultApiInfo,
    moduleQuiz,
    quizResult,
    quizResultApiInfo,
  } = useSelector((state) => state.course);
  const [answers, setAnswers] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false);

  // console.log({ isFinished, isTimeUp });

  // get module quiz result, check quiz attempted or not
  useEffect(() => {
    dispatch(
      getQuizSubmission({
        token: currentUser?.token,
        userId: currentUser?.id,
        moduleId: params?.moduleId,
      })
    );
    // eslint-disable-next-line
  }, [currentUser?.id, params?.moduleId]);

  // console.log({ getQuizResult });

  // get module quiz
  useEffect(() => {
    dispatch(
      getModuleQuiz({
        token: currentUser?.token,
        id: params?.moduleId,
      })
    );
    // eslint-disable-next-line
  }, [params?.moduleId]);

  const questions = useMemo(() => {
    // console.log({ moduleQuiz });
    return moduleQuiz?.result;
  }, [moduleQuiz]);
  const quizEndDate = useMemo(() => {
    // console.log({ questions });
    let date = new Date();
    let _addedMins = date.setMinutes(
      date.getMinutes() + questions?.length * 0.5
    );
    return _addedMins;
  }, [questions]);
  const isFinalQuestion = useMemo(() => {
    return currentQuestion >= questions?.length - 1;
  }, [questions, currentQuestion]);
  const countDown = useCountdown(quizEndDate);

  const handleAnswer = (ans) => {
    let _answer = [...answers];
    _answer[currentQuestion] = ans;
    setAnswers(_answer);
  };
  const handleNext = () => {
    setCurrentQuestion((prev) =>
      prev < questions?.length - 1 ? prev + 1 : prev
    );
  };
  const handlePrev = () => {
    setCurrentQuestion((prev) => (prev !== 0 ? prev - 1 : prev));
  };

  const handleSubmit = () => {
    const results = questions?.map((question, index) => {
      return {
        question: question?.id,
        selected_option: answers?.[index] || "Empty",
      };
    });
    let _data = {
      module: params?.moduleId,
      answers: results,
    };
    dispatch(
      postQuizSubmission({
        token: currentUser?.token,
        _data,
      })
    );
  };

  useEffect(() => {
    if (countDown[2] <= 0 && countDown[3] <= 0) {
      setIsFinished(true);
      setIsTimeUp(true);
    }
    // eslint-disable-next-line
  }, [countDown]);

  // when timeup, quiz will be submitted
  useEffect(() => {
    if (isFinished && isTimeUp) {
      const results = questions?.map((question, index) => {
        return {
          question: question.id,
          selected_option: answers[index] || "Empty",
        };
      });
      let _data = {
        module: params?.moduleId,
        answers: results,
      };
      dispatch(
        postQuizSubmission({
          token: currentUser?.token,
          _data,
        })
      );
      setIsFinished(false);
    }
    // eslint-disable-next-line
  }, [isFinished]);

  useEffect(() => {
    if (quizResultApiInfo?.response) {
      toast.success("Quiz Submitted Successfully", {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
      });
      dispatch(
        getQuizSubmission({
          token: currentUser?.token,
          userId: currentUser?.id,
          moduleId: params?.moduleId,
        })
      );
      setIsFinished(true);
      dispatch(resetQuizResult());
    }
    // eslint-disable-next-line
  }, [quizResultApiInfo?.response]);
  useEffect(() => {
    if (quizResultApiInfo?.error) {
      toast.error("Something went wrong", {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
      });
      dispatch(resetQuizResult());
    }
    // eslint-disable-next-line
  }, [quizResultApiInfo?.error]);

  const timeDiff = useMemo(() => {
    const _currentTime = moment();
    const _quizAttemptedTime = moment(
      getQuizResult?.result?.results[0]?.submitted_at
    ).add(7, "hours");

    const diffInMilliseconds = _quizAttemptedTime.diff(_currentTime);
    const diffInMinutes = moment.duration(diffInMilliseconds).asMinutes();
    return diffInMinutes;
  }, [getQuizResult?.result?.results]);

  return (
    <div
      style={{ width: HEADER_CONTENT_WIDTH, maxWidth: "90%", margin: "auto" }}
    >
      <QuizInfo
        questions={questions}
        answers={answers}
        isFinished={isFinished}
        isTimeUp={isTimeUp}
      />
      <div className={classes.container}>
        {getQuizResultApiInfo?.loading ? (
          <ComponentLoader />
        ) : getQuizResult?.result?.results[0]?.result === "Fail" &&
          timeDiff > 0 ? (
          <div className={classes.reAttempt}>
            <div style={{ marginBottom: 10 }}>
              <span style={{ color: "#134696", marginBottom: 10 }}>
                Quiz Status:{" "}
              </span>
              {getQuizResult?.result?.results[0]?.result}
            </div>
            <div style={{ color: "#134696", marginBottom: 10 }}>
              You can re-attempt this quiz at:{" "}
            </div>
            <div>
              {moment(getQuizResult?.result?.results[0]?.submitted_at)
                .add(7, "hours")
                .format("MM/DD/YYYY h:mm:ss a")}
            </div>
          </div>
        ) : (
          <>
            {getQuizResultApiInfo?.loading ? (
              <ComponentLoader />
            ) : getQuizResult?.result?.results[0]?.result === "Pass" ? (
              <div className={classes.completedContainer}>
                <div className={classes.reAttempt}>
                  <div style={{ marginBottom: 10 }}>CONGRATULATIONS</div>
                  <div>
                    <span style={{ color: "#134696", marginBottom: 10 }}>
                      Quiz Status:{" "}
                    </span>
                    {getQuizResult?.result?.results[0]?.result}
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className={classes.topContainer}>
                  <div className={classes.heading}>
                    Answers:
                    <span style={{ color: "#0ed864" }}>
                      {answers?.length}/{questions?.length}
                    </span>
                  </div>
                  <span className={classes.heading}>Quiz</span>
                  {isFinished ? (
                    <div className={classes.heading}>
                      Quiz Status:
                      {quizResultApiInfo?.loading ? (
                        <ButtonLoader size={20} color={"#134696"} />
                      ) : (
                        <span style={{ color: "#0ed864" }}>
                          {" " + quizResult?.result?.result || "NA"}
                        </span>
                      )}
                    </div>
                  ) : (
                    <div className={classes.heading}>
                      Time Left:
                      <span style={{ color: "#0ed864" }}>
                        {countDown[2]}:
                        {countDown[3] > 9 ? countDown[3] : `0${countDown[3]}`}
                      </span>
                    </div>
                  )}
                </div>
                <div>
                  {questions?.length > 0 && (
                    <QuestionCard
                      data={questions[currentQuestion]}
                      answer={answers[currentQuestion]}
                      handleAnswer={handleAnswer}
                    />
                  )}
                  <div className={classes.btnContainer}>
                    <Button sx={prevSx} onClick={handlePrev}>
                      Prev
                    </Button>
                    <Button
                      sx={nextSx}
                      onClick={isFinalQuestion ? handleSubmit : handleNext}
                    >
                      {isFinalQuestion ? (
                        quizResultApiInfo?.loading ? (
                          <ButtonLoader size={20} color={"#fff"} />
                        ) : (
                          "Submit"
                        )
                      ) : (
                        "Next"
                      )}
                    </Button>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default QuizContainer;
