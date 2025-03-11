import React from "react";
import styled, { keyframes } from "styled-components";

// Loader Animation
const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #ffffff;
`;

const Logo = styled.img`
  width: 100px;
  height: 100px;
  animation: ${rotate} 2s linear infinite;
`;

const LoadingScreen = () => {
  return (
    <LoaderContainer>
      <Logo src="/assets/logo.png" alt="Loading..." />
    </LoaderContainer>
  );
};

export default LoadingScreen;
