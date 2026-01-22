"use client";

import styled from "styled-components";
import Header from "./Header";
import Section from "./Section";
import Footer from "./Footer";
import List from "./components/List";
import ExplanationSheet from "./components/ExplanationSheet";
import QuizView from "./components/View";

const QuizBackground = styled.div`
  position: relative;
  background-color: white;
  width: 100vw;
  height: 100vh;
`;

export default function Quiz() {
  return (
    <QuizBackground>
      <Header />
      <>
        <Section />
        <Footer />
      </>
      <List />
      <QuizView />
      <ExplanationSheet />
    </QuizBackground>
  );
}
