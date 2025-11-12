"use client";

import styled from "styled-components";
import Image from "next/image";

const QuizHeader = styled.div`
  width: 100%;
  height: 10%;

  display: flex;
  align-items: center;
`;

const LogoDiv = styled.div`
  width: 26%;
`;

const Logo = styled.div`
  position: relative;

  margin-left: 20px;
`;

const TimeDiv = styled.div`
  width: 54%;

  display: flex;
  justify-content: center;
`;

const Time = styled.p`
  font-size: 15pt;
  font-family: "Cafe24OnePrettyNight";
`;

const ListDiv = styled.div`
  width: 20%;

  display: flex;
  justify-content: flex-end;
`;

const ListButton = styled.button`
  width: 40px;
  height: 40px;

  margin-right: 20px;
`;

export default function Header() {
  return (
    <QuizHeader>
      <LogoDiv>
        <Logo>
          <Image
            src="/assets/images/logo/Logo.png"
            alt="평명"
            width={85}
            height={35}
            style={{ width: "85px", height: "35px", objectFit: "contain" }}
            priority
          />
        </Logo>
      </LogoDiv>
      <TimeDiv>
        <Time>00:00</Time>
      </TimeDiv>
      <ListDiv>
        <ListButton></ListButton>
      </ListDiv>
    </QuizHeader>
  );
}
