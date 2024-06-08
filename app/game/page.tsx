"use client";

import { useEffect, useState } from "react";
import {
  Grid,
  Container,
  Radio,
  RadioGroup,
  Typography,
  FormControlLabel,
  Box,
} from "@mui/material";
import { addAnswerChoice, submitGame } from "../redux/features/game/gameSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setAnswerChoices } from "../utils/setAnswerChoices";
import { useRouter } from "next/navigation";

export default function Game() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { status, inProgress, questions, userAnswers } = useAppSelector(
    (state) => state.game,
  );

  if (!inProgress && status === "idle") {
    return (
      <>
        <div>Ooops you havenst staretd a game</div>
      </>
    );
  }

  const answerChoices = setAnswerChoices(questions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const currentQuestionUserAnswerChoice = userAnswers[currentQuestionIndex];
  const [startTime, setStartTime] = useState(Date.now());
  const canSubmit = userAnswers.every((answer) => answer);

  const handleSubmit = () => {
    const time = Math.floor((Date.now() - startTime) / 1000);
    dispatch(submitGame({ userAnswers, questions, time }));
    router.push("/record");
  };

  return (
    <>
      <Grid
        container
        sx={{
          width: "684px",
          height: "400px",
          alignSelf: "center",
        }}
      >
        <Grid item xs={6} sx={{ marginTop: "40px" }}>
          <Container sx={{ width: "95%" }}>
            {/* Question */}
            <Typography variant="body1" gutterBottom>
              Question {currentQuestionIndex + 1} of {questions.length}
            </Typography>
            <Typography variant="h5">
              {`${currentQuestionIndex + 1}. ${
                questions[currentQuestionIndex].question
              }`}
            </Typography>
          </Container>
        </Grid>
        {/* Answer Choices */}
        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <RadioGroup
            value={currentQuestionUserAnswerChoice}
            onChange={(e) => {
              dispatch(
                addAnswerChoice({
                  answer: e.target.value,
                  index: currentQuestionIndex,
                }),
              );
              if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex((i) => i + 1);
              }
            }}
          >
            {answerChoices[currentQuestionIndex]?.map(
              (answer: string, i: number) => (
                <FormControlLabel
                  key={i}
                  control={<Radio />}
                  label={answer}
                  value={answer}
                  sx={{
                    width: "340px",
                    backgroundColor: "#3B4D66",
                    border: "1px solid",
                    borderRadius: "24px",
                    borderWidth: "1px",
                    boxShadow: "0px 16px 40px 0px rgba(143, 160, 193, 0.14)",
                    marginBottom: "24px",
                    display: "flex",
                    alignItems: "center",
                  }}
                />
              ),
            )}
          </RadioGroup>
          {/*Submit Controls + Pagination */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "12px",
            }}
          >
            <button
              style={{ width: "165px" }}
              onClick={() => setCurrentQuestionIndex((index) => index - 1)}
              disabled={currentQuestionIndex === 0 ? true : false}
            >
              Previous
            </button>

            <button
              style={{ width: "165px" }}
              onClick={() => setCurrentQuestionIndex((index) => index + 1)}
              disabled={
                currentQuestionIndex === questions.length - 1 ? true : false
              }
            >
              Next
            </button>
          </Box>

          <br />
          {canSubmit && <button onClick={handleSubmit}>Submit</button>}
        </Grid>
      </Grid>
    </>
  );
}
