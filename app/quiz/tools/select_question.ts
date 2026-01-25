import { viewedQuizState } from "@/app/atom/quizAtom";
import { db } from "@/app/lib/client";
import { questionData } from "@/app/requested_admin/page";
import { collection, getDocs } from "firebase/firestore";
import { getDefaultStore } from "jotai";

export const selectQuestion = async () => {
  const store = getDefaultStore();
  const viewedQuiz = store.get(viewedQuizState);

  const querySnapshot = await getDocs(collection(db, "question"));
  const allQuestions = querySnapshot.docs.map(doc => ({
    ...(doc.data() as questionData),
    id: doc.id
  }));

  let unviewed = allQuestions.filter(
    (q) => !viewedQuiz.has(q.id) // Firestore의 doc.id를 쓰는 게 가장 확실하죠!
  );
    
  if (unviewed.length === 0) {
    // 모든 문제를 열람했을 때 이스터에그 기능 추가 예정
    store.set(viewedQuizState, new Set())
    unviewed = allQuestions;
  }

  const randomIndex = Math.floor(Math.random() * unviewed.length);
  const selected = unviewed[randomIndex];

  store.set(viewedQuizState, 
    prev => new Set(prev).add(selected.id));
  
  return selected;
};
