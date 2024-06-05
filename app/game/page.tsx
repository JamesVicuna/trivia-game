"use client";

import { useEffect, useState } from "react";
import { api } from "../services/api";
import { fetchQuestions } from "../redux/features/game/gameSlice";
import { CircularProgress } from "@mui/material";

import { useAppDispatch } from "../redux/hooks";

interface TriviaQuestion {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

interface TriviaApiResponse {
  response_code: number;
  results: TriviaQuestion[];
}

export default function Game() {
  const [triviaData, setTriviaData] = useState<TriviaApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch()

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());


  useEffect(() => {
    dispatch(fetchQuestions())
    const fetchData = async () => {
      try {
        const response = await api.get("?amount=10");
        const data: TriviaApiResponse = response.data;
        console.log(data);
        setTriviaData(data);
        setLoading(false);
      } catch (error) {
        console.log("error" + error);
      }
    };
    console.log("here");
    fetchData();
  }, []);

  return (
    <>
      <div>
        {loading ? (
          <CircularProgress />
        ) : (
          <div>
            {triviaData?.results.map((question, index) => (
              <div key={index}>
                <h3>{question.category}</h3>
                <p>{question.question}</p>
                <p>Correct Answer: {question.correct_answer}</p>
                <p>
                  Incorrect Answers: {question.incorrect_answers.join(", ")}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
