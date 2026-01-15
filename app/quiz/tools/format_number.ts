import { questionData } from "@/app/data/quiz_data";

export const formatNumber = (num: number): string => {
  const maxNumber = Math.max(...questionData.map((q) => q.questionNumber));
  const maxLength = String(maxNumber).length

  return String(num).padStart(maxLength, "0");
};
