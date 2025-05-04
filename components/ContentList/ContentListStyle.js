import styled from "styled-components";

export const TableContainer = styled.div`
  padding: 1.5rem;
`;

export const Table = styled.div``;

export const TableHeader = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.gridTemplateColumns || "1fr"};
  background-color: #1d283c;
  padding: 0.8rem 1rem;
  border-radius: 0.25rem;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const HeaderText = styled.div``;

export const HeaderButton = styled.button`
  padding: 0;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: #fff;
  margin-left: 4px;
  display: flex;
  align-items: center;
  &:hover {
    color: #2869ff;
  }
`;

export const Content = styled.div``;

export const TableContent = styled.div`
  background: #1d283c;
  margin-top: 0.5rem;
  border-radius: 0.25rem;
`;

export const ContentWrapper = styled.div`
  padding: 0.8rem 1rem;
  border-bottom: 1px solid rgba(128, 129, 145, 0.25);
  display: grid;
  grid-template-columns: ${(props) => props.gridTemplateColumns || "1fr"};
  &:last-child {
    border-bottom: none;
  }
`;

export const ContentText = styled.span`
  border-radius: 4px;
  padding: 4px 8px;
  display: flex;
  align-items: center;
  width: max-content;
  font-family: "SF Pro Text Medium", sans-serif;
  &.active {
    background: rgba(43, 169, 114, 0.2);
    color: #2ba972;
  }

  &.disabled {
    color: #59719d;
    background: rgba(89, 113, 157, 0.2);
  }

  &::before {
    content: "";
    width: 4px;
    height: 4px;
    border-radius: 50%;
    margin-right: 0.5rem;
    display: inline-block;
  }

  &.active::before {
    background: #2ba972;
  }

  &.disabled::before {
    background: #59719d;
  }
`;

export const ContentButton = styled.button`
  background: transparent;
  outline: none;
  border: none;
  position: relative;
  text-align: justify;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.8rem 1rem;
`;

export const PaginationAction = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 1rem;
`;

export const ActionMenu = styled.div`
  background-color: rgba(29, 40, 60, 1);
  position: absolute;
  top: 0;
  right: 0;
  border-radius: 4px;
  width: 100px;
  z-index: 1;
  display: grid;
  box-shadow: rgba(16, 24, 39, 0.8) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  visibility: hidden;
  opacity: 0;
  transition: 0.2s;
  &::before {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid rgba(29, 40, 60, 1);
    bottom: 100%;
    left: 85%;
    transform: translatex(-50%);
  }
  &.active {
    visibility: visible;
    opacity: 1;
    top: calc(100% + 8px);
  }
`;

export const LoadingWrapper = styled.div`
  width: 100%;
  height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
