import styled from "styled-components";

export const SideBar = styled.div`
  background-color: rgba(21, 30, 47, 1);
  width: 200px;
  height: 100vh;
  transition: width 0.5s ease;
`;

export const Header = styled.div`
  display: flex;
  gap: 0.25rem;
  align-items: center;
  margin-bottom: 3rem;
  padding: 1rem;
  font-family: "SF Pro Text Medium", sans-serif;
`;

export const Heading = styled.h1`
  font-size: 1.5rem;
  color: white;
`;

export const LogoImage = styled.img`
  width: 40px;
  height: 40px;
`;

export const ImageIcon = styled.img`
  width: 20px;
  height: 20px;
  color: white;
`;

export const UnorderedList = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  gap: 0.8rem;
`;

export const List = styled.li`
  cursor: pointer;
`;

export const Anchor = styled.a`
  text-decoration: none;
  color: white;
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.15rem;
  padding: 1rem;
  position: relative;
  &:hover {
    background-color: rgba(26, 37, 57, 1);
    &:before {
      content: "";
      position: absolute;
      right: 0;
      background-color: rgba(37, 154, 108, 1);
      height: 100%;
      width: 4px;
      transition: width 0.5s ease;
    }
  }
  &.active {
    background-color: rgba(29, 40, 60, 1);
    &:before {
      content: "";
      position: absolute;
      right: 0;
      background-color: rgba(37, 154, 108, 1);
      height: 100%;
      width: 4px;
      transition: width 0.5s ease;
    }
  }
`;
