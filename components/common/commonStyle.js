import styled, { css, keyframes } from "styled-components";

export const AppBody = styled.div`
  display: flex;
`;

export const MainContent = styled.div`
  flex: 1;
`;

export const Container = styled.div`
  max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : "initial")};
  margin: ${({ margin }) => (margin ? margin : "initial")};
  padding: ${({ padding }) => (padding ? padding : "initial")};
`;

export const SearchImg = styled.img`
  width: 20px;
  height: 20px;
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
`;
export const SearchForm = styled.form`
  display: flex;
  align-items: center;
  margin: 0;
`;

export const SearchFormLabel = styled.label`
  position: relative;
`;

export const HeadingOne = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  font-family: "SF Pro Display Medium";
  color: #fff;
`;

export const HeadingTwo = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  font-family: "SF Pro Display Medium";
  color: #fff;
`;

export const HeadingThree = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  font-family: "SF Pro Display Regular";
  color: #fff;
`;

export const Input = styled.input`
  background-color: rgba(29, 40, 60, 1);
  border: 0.05rem solid rgba(29, 40, 60, 1);
  height: ${({ height }) => (height ? `${height}rem` : "100%")};
  width: ${({ width }) => (width ? `${width}rem` : "100%")};
  border-radius: 0.375rem;
  font-size: ${({ fontSize }) => (fontSize ? `${fontSize}rem` : "1rem")};
  font-family: ${({ fontFamily }) => fontFamily};
  color: #fff;
  padding-top: ${({ paddingTop }) =>
    paddingTop ? `${paddingTop}rem` : "initial"};
  padding-bottom: ${({ paddingBottom }) =>
    paddingBottom ? `${paddingBottom}rem` : "initial"};
  padding-left: ${({ paddingLeft }) =>
    paddingLeft ? `${paddingLeft}rem` : "initial"};
  padding-right: ${({ paddingRight }) =>
    paddingRight ? `${paddingRight}rem` : "initial"};
  &:focus {
    outline: none;
    border: 0.05rem solid rgba(37, 154, 108, 1);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }

  @media only screen and (max-width: 480px) {
    width: 100%;
  }
`;

export const FlexWrapper = styled.div`
  display: flex;
  flex-direction: ${(props) => props.flexDirection || "row"};
  align-items: ${(props) => props.alignItems || "flex-start"};
  justify-content: ${(props) => props.justifyContent || "initial"};
  gap: ${(props) => props.gap ? `${props.gap}rem` : "0"};
`;

export const GridWrapper = styled.div`
  display: grid;
  grid-auto-flow: ${(props) => props.gridAutoFlow || "row"};
  justify-content: ${(props) => props.justifyContent || "initial"};
  gap: ${(props) => props.gap ? `${props.gap}rem` : "0"};
`

export const Text = styled.p`
  font-size: ${(props) => props.fontSize || "16px"};
  font-weight: ${(props) => props.fontWeight || "400"};
  color: ${(props) => props.color || "#fff"};
  padding-top: ${(props) => props.paddingTop || "0px"};
  padding-bottom: ${(props) => props.paddingBottom || "0px"};
  padding-right: ${(props) => props.paddingRight || "0px"};
  opacity: ${(props) => props.opacity || "100%"};
  text-align: ${(props) => props.align || "left"};
  line-height: ${(props) => props.lineHeight};
  margin-top: ${(props) => props.marginTop || "0px"};
  @media (max-width: 480px) {
    font-size: ${(props) => props.mobileFontSize || props.fontSize || "16px"};
    line-height: ${(props) =>
      props.mobileLineHeight || props.lineHeight || "16px"};
    margin-top: ${(props) =>
      props.mobileMarginTop || props.marginTop || "0px"};
    margin-bottom: ${(props) =>
      props.mobileMarginBottom || props.marginBottom || "0px"};
  }
`;

export const CustomIcon = styled.img`
  width: ${(props) => props.width || "24px"};
  height: ${(props) => props.height || "24px"};
`;
export const Image = styled.img`
  max-width: 100%;
  height: auto;
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  border: ${(props) => props.border || "none"};
  width: ${(props) => `${props.width}px` || "100%"};
  height: ${(props) => `${props.height}px` || "0px"};
  max-width: ${(props) => props.maxWidth || "100%"};
  background: ${(props) => props.background || "#FC74FE"};
  color: ${(props) => props.color || "#FFFFFF"};
  margin-top: ${(props) => props.marginTop || "0px"};
  margin-bottom: ${(props) => props.marginBottom || "0px"};
  margin-left: ${(props) => props.marginLeft || "0px"};
  margin-right: ${(props) => props.marginRight || "0px"};
  border-radius: ${(props) => `${props.borderRadius}px` || "0px"};
  padding: ${(props) => props.padding || "0px"};
  font-size: ${(props) => props.fontSize || "16px"};
  font-weight: ${(props) => props.fontWeight || "400"};
  cursor: pointer;
  transition: all 0.3s ease;
  &:disabled {
    background: rgba(91, 105, 132, 1);
    color: #fff;
    cursor: default;
  }
  &:not(:disabled):hover {
    background: ${(props) => props.hoverBackground || "rgba(21, 30, 47, 1)"};
    color: ${(props) => props.hoverColor || "#FFFFFF"};
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  border-radius: 0.375rem;
  border: 1px solid #fff;
  background: transparent;
  color: #fff;
  background-image: ${({ imageUrl }) => `url(${imageUrl}) no-repeat`};
  background-size: 20px;
  background-position: center;
  &:focus {
    color: rgba(37, 154, 108, 1);
  }
`;

const slideIn = keyframes`
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(-100%);
    opacity: 0;
  }
`;

// Styled components
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(9, 9, 12, 0.65);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

export const ModalContent = styled.div`
  background-color: rgba(21, 30, 47, 1);
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 0 10px rgba(18, 19, 19, 0.6);
  width: ${({ width }) => (width ? `${width}px` : "auto")};
  height: ${({ height }) => (height ? `${height}px` : "auto")};
  animation: ${({ isOpen, isClosing }) =>
    isOpen && !isClosing
      ? css`
          ${slideIn} 0.3s forwards
        `
      : isClosing
      ? css`
          ${slideOut} 0.3s forwards
        `
      : "none"};
`;
