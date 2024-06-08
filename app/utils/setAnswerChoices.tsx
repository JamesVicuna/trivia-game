import { useState } from "react";
import { TriviaQuestion } from "../redux/features/game/gameSlice";

export const setAnswerChoices = (questions: TriviaQuestion[]) => {
  const randomizeAnswers = (arr: string[]) => {
    const randomizedArr = [...arr];
    for (let i = randomizedArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [randomizedArr[i], randomizedArr[j]] = [
        randomizedArr[j],
        randomizedArr[i],
      ];
    }
    return randomizedArr;
  };

  const [answerChoices, setAnswerChoices] = useState<string[][]>(() => {
    if (questions[0].type === "multiple") {
      return questions.reduce((acc: string[][], question ) => {
        let answerChoices = [
          ...question["incorrect_answers"],
          question["correct_answer"],
        ];
        return [...acc, randomizeAnswers(answerChoices)];
      }, []);
    }

    if (questions[0].type === "boolean") {
      return Array(questions.length).fill(["True", "False"]);
    }

    return []
  });

  return answerChoices;
};