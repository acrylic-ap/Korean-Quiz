"use client";

import { openViewState, questionState } from "@/app/atom/quizAtom";
import { Close } from "@/public/svgs/ListSVG";
import { useAtom } from "jotai";
import Image from "next/image";
import styled from "styled-components";

const View = styled.div`
  background-color: rgba(0, 0, 0, 0.5);

  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  z-index: 1;
`;

const ViewContainer = styled.div`
  background-color: white;

  width: 90%;
  height: 35%;

  display: flex;
  align-items: flex-end;
  flex-direction: column;
`;

const ViewCloseContainer = styled.div`
  height: 20%;
`;

const ViewCloseButton = styled.button`
  background-color: transparent;

  width: 50px;
  height: 50px;

  border: none;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const ViewBox = styled.div`
  width: 100%;
  height: 75%;

  padding-bottom: 5%;
  display: flex;
  justify-content: center;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Article = styled.div`
  width: 100%;
  height: 100%;

  padding: 0 20px;

  font-size: 15pt;

  overflow-y: auto;

  white-space: break-spaces;

  -ms-overflow-style: none;
  scrollbar-width: none;

  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
`;

export default function QuizView() {
  const [openView, setOpenView] = useAtom(openViewState);
  const [question] = useAtom(questionState);

  console.log(openView);

  if (!openView || !question) return false;

  return (
    <View>
      <ViewContainer>
        <ViewCloseContainer>
          <ViewCloseButton onClick={() => setOpenView(false)}>
            <Close />
          </ViewCloseButton>
        </ViewCloseContainer>
        <ViewBox>
          {question.article ? (
            <Article>{question.article}</Article>
          ) : (
            <ImageContainer>
              <Image
                src={question.image}
                alt="사진"
                fill
                style={{ objectFit: "contain" }}
              />
            </ImageContainer>
          )}
        </ViewBox>
      </ViewContainer>
    </View>
  );
}
