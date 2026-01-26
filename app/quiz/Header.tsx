"use client";

import Image from "next/image";
import { ListIcon, PauseIcon, PlayIcon } from "@/public/svgs/HeaderSVG";
import { useEffect } from "react";
import { formatTime } from "./tools/format_time";
import {
  listOpenState,
  showResultState,
  startedState,
  timeState,
} from "../atom/quizAtom";
import { useAtom } from "jotai";

export default function Header() {
  const [time, setTime] = useAtom(timeState);
  const [started, setStarted] = useAtom(startedState);
  const [, setListOpen] = useAtom(listOpenState);
  const [showResult] = useAtom(showResultState);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (started) {
      timer = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [started, setTime]);

  const listOpening = () => {
    setListOpen(true);
    setStarted(false);
  };

  return (
    // QuizHeader: h-[10%]는 부모 높이에 의존하므로 유지, flex 정렬
    <header className="flex items-center w-full h-[10%]">
      {/* LogoContainer (25%) */}
      <div className="w-1/4">
        <div className="relative ml-[15px]">
          <Image
            src="/images/logo/Logo.png"
            alt="평명"
            width={80}
            height={30}
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* TimeContainer (55%) */}
      <div className="w-[55%] flex justify-center items-center">
        {/* Time (15pt -> text-xl로 근사치 조정) */}
        <p className="text-xl tabular-nums">{formatTime(time)}</p>

        {!showResult && (
          <button
            className="flex items-center ml-[10px] cursor-pointer"
            onClick={() => setStarted(!started)}
          >
            {started ? <PauseIcon /> : <PlayIcon />}
          </button>
        )}
      </div>

      {/* ListContainer (20%) */}
      <div className="w-1/5 flex justify-end">
        {/* ListButton */}
        <button
          className="flex justify-center items-center w-10 h-10 mr-[15px] bg-transparent text-black"
          onClick={listOpening}
        >
          <ListIcon />
        </button>
      </div>
    </header>
  );
}
