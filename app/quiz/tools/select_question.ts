import { viewedQuizState } from "@/app/atom/quizAtom";
import { questionData } from "@/app/data/quiz_data";
import { SetStateAction } from "jotai";

export const selectQuestion = (
  viewedQuiz: Set<number>,
  setViewedQuiz: (update: SetStateAction<Set<number>>) => void,
) => {
  const unviewed = questionData.filter(
    (q) => !viewedQuiz.has(q.questionNumber)
  );

  if (unviewed.length === 0) {
    setViewedQuiz(new Set());
  }

  const randomIndex = Math.floor(Math.random() * unviewed.length);
  
  return unviewed[randomIndex];
};
