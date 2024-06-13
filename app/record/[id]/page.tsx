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
    <div className="rounded-lg bg-slate-300 p-4">
      {questions.map((question, i) => (
        <div key={i} className="flex flex-row mb-6">
          <div className="mr-5">
            <Typography variant="h3">{`${i + 1}`}</Typography>
          </div>
          <br />
          <div className="text-left">
            <Typography variant="h5">{`${question.question}`}</Typography>
            <Typography
              sx={{
                color:
                  userAnswers[i] === question.correct_answer ? "green" : "red",
              }}
            >
              Your Answer: {userAnswers[i]}
            </Typography>
            {userAnswers[i] !== question.correct_answer && (
              <Typography>Correct Answer: {question.correct_answer}</Typography>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
