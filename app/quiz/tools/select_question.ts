import { viewedQuizState } from "@/app/atom/quizAtom";
import { questionData } from "@/app/data/quiz_data";
import { SetStateAction } from "jotai";

export const selectQuestion = (
  viewedQuiz: Set<number>,
  setViewedQuiz: (update: SetStateAction<Set<number>>) => void,
) => {
  
  let unviewed = questionData.filter(
    (q) => !viewedQuiz.has(q.questionNumber)
  );
  
  console.log(unviewed)
  
  if (unviewed.length === 0) {
    setViewedQuiz(new Set());
    unviewed = questionData;
  }

  const randomIndex = Math.floor(Math.random() * unviewed.length);
  const selected = unviewed[randomIndex];

  setViewedQuiz(prev => {
    const next = new Set(prev);
    next.add(selected.questionNumber);
    return next;
  });
  
  return unviewed[randomIndex];
};
