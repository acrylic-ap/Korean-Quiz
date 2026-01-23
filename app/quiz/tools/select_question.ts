import { viewedQuizState } from "@/app/atom/quizAtom";
import { questionData } from "@/app/data/quiz_data";
import { getDefaultStore } from "jotai";

export const selectQuestion = () => {
  const store = getDefaultStore();
  const viewedQuiz = store.get(viewedQuizState);

  let unviewed = questionData.filter(
    (q) => !viewedQuiz.has(q.questionNumber)
  );
    
  if (unviewed.length === 0) {
    // 모든 문제를 열람했을 때 이스터에그 기능 추가 예정
    store.set(viewedQuizState, new Set())
    unviewed = questionData;
  }

  const randomIndex = Math.floor(Math.random() * unviewed.length);
  const selected = unviewed[randomIndex];

  store.set(viewedQuizState, prev => {
    const next = new Set(prev);
    next.add(selected.questionNumber);
    return next;
  });
  
  return unviewed[randomIndex];
};
