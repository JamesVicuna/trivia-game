"use client";

import React from "react";
import { Typography } from "@mui/material";
import { useAppSelector } from "@/app/redux/hooks";

export default function SingleRecord({ params }: { params: { id: string } }) {
  const game = useAppSelector((state) =>
    state.record.history.find((game) => game.id === params.id),
  );

  if (!game) {
    return <div>oops no game</div>;
  }

  const { questions, userAnswers } = game;

  return (
    <div>
      {questions.map((question, i) => (
        <div key={i}>
          <Typography variant="h5">{`${i + 1}. ${
            question.question
          }`}</Typography>
          <Typography sx={{ color: "green" }}>
            {question.correct_answer}
          </Typography>
          {question.incorrect_answers.map((incorrect_answer, index) => (
            <Typography
              sx={{
                color: userAnswers[i] === incorrect_answer ? "red" : "white",
              }}
              key={index}
            >
              {incorrect_answer}
            </Typography>
          ))}
        </div>
      ))}
    </div>
  );
}
