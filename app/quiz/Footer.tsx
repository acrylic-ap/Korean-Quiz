"use client";

import {
  answerState,
  confirmConfigState,
  hintCountState,
  hintState,
  infoConfigState,
  openExplanationSheetState,
  questionState,
  showResultState,
  startedState,
} from "../atom/quizAtom";
import { useAtom } from "jotai";
import { selectQuestion } from "./tools/select_question";
import { Clue } from "@/public/svgs/QuizSVG";

export default function Footer() {
  const [hintCount, setHintCount] = useAtom(hintCountState);
  const [showResult, setShowResult] = useAtom(showResultState);
  const [, setOpenExplanationSheet] = useAtom(openExplanationSheetState);

  const [hint] = useAtom(hintState);
  const [answer] = useAtom(answerState);
  const [started, setStarted] = useAtom(startedState);

  const [, setAlertConfig] = useAtom(confirmConfigState);
  const [, setInfoConfig] = useAtom(infoConfigState);
  const [, setQuestion] = useAtom(questionState);

  // --- Logic Functions ---
  const showHint = () => {
    if (!hint) {
      setInfoConfig({
        content: "힌트가 없습니다.",
        onClose: () => setInfoConfig(null),
      });
    } else {
      setHintCount(hintCount - 1);
      setInfoConfig({
        content: hint,
        onClose: () => setInfoConfig(null),
      });
    }
  };

  const answerCheck = () => {
    if (!answer) {
      setInfoConfig({
        content: "정답을 입력하거나 고르세요.",
        onClose: () => setInfoConfig(null),
      });
    } else {
      setAlertConfig({
        content: "정말로 정답을 확인하시겠습니까?",
        onConfirm: () => {
          setAlertConfig(null);
          setShowResult(true);
          setStarted(false);
        },
        onCancel: () => setAlertConfig(null),
      });
    }
  };

  const passCheck = () => {
    setAlertConfig({
      type: "danger",
      content: `정말로 넘기시겠습니까?\n기존에 작업한 내용은 저장되지 않습니다!`,
      onConfirm: async () => {
        setQuestion(await selectQuestion());
        setAlertConfig(null);
      },
      onCancel: () => setAlertConfig(null),
    });
  };

  const hintCheck = () => {
    if (hintCount <= 0) {
      setInfoConfig({
        content: "사용 가능한 힌트가 없습니다.",
        onClose: () => setInfoConfig(null),
      });
    } else {
      setAlertConfig({
        content: `정말로 힌트를 사용하시겠습니까?\n현재 볼 수 있는 힌트는 ${hintCount}개입니다.`,
        onConfirm: () => {
          showHint();
          setAlertConfig(null);
        },
        onCancel: () => setAlertConfig(null),
      });
    }
  };

  const nextQuiz = async () => {
    setShowResult(false);
    setStarted(true);
    setQuestion(await selectQuestion());
  };

  const showExplanation = () => {
    setOpenExplanationSheet(true);
  };

  return (
    <footer
      className={`relative w-full h-[10%] items-end pb-[15px] 
      ${started || showResult ? "flex" : "hidden"}`}
    >
      {!showResult ? (
        <div className="relative w-full h-full px-[10px]">
          {/* 힌트 버튼 섹션 (좌측) */}
          <div className="absolute left-[10px] bottom-0 w-[25%] h-[50px]">
            {/* 힌트 카운트 말풍선 */}
            <div className="absolute top-[-35px] left-0 w-full flex items-center justify-center space-x-1">
              <Clue />
              <span className="text-[14pt] tabular-nums font-medium">
                {hintCount}
              </span>
            </div>
            <button
              onClick={hintCheck}
              className="w-full h-full border border-black rounded-[5px] text-[20px] text-black bg-transparent active:bg-gray-100 transition-colors"
            >
              힌트
            </button>
          </div>

          {/* 정답 확인 버튼 (중앙) */}
          <button
            onClick={answerCheck}
            className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[40%] h-[50px] border border-black rounded-[5px] text-[20px] text-black bg-transparent active:bg-gray-100 transition-colors"
          >
            정답 확인
          </button>

          {/* 넘기기 버튼 (우측) */}
          <button
            onClick={passCheck}
            className="absolute right-[10px] bottom-0 w-[25%] h-[50px] border border-black rounded-[5px] text-[20px] text-black bg-transparent active:bg-gray-100 transition-colors"
          >
            넘기기
          </button>
        </div>
      ) : (
        <div className="w-full h-[50px] px-[10px] flex gap-[10px]">
          {/* 다음 문제 버튼 (핑크 포인트) */}
          <button
            onClick={nextQuiz}
            className="flex-1 h-full bg-[#e04e92] text-white rounded-[5px] text-[20px] active:opacity-90 transition-opacity"
          >
            다음 문제
          </button>
          {/* 해설 버튼 */}
          <button
            onClick={showExplanation}
            className="flex-1 h-full border border-black rounded-[5px] text-[20px] text-black bg-transparent active:bg-gray-50 transition-colors"
          >
            해설
          </button>
        </div>
      )}
    </footer>
  );
}
