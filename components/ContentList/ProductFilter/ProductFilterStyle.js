import styled from "styled-components";

export const FilterButtonWrapper = styled.div`
  position: relative;
`;

export const FilterButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid #fff;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 0.375rem;
  background-color: transparent;
`;

export const FilterButtonText = styled.span`
  font-size: 1rem;
  color: #fff;
`;

export const FilterImg = styled.img`
  width: 20px;
  height: 20px;
`;

export const FilterMenu = styled.div`
  background-color: rgba(29, 40, 60, 1);
  position: absolute;
  top: calc(100% + 16px);
  right: 0;
  border-radius: 4px;
  padding: 20px;
  width: 300px;
  z-index: 1;
  display: grid;
  gap: 1rem;
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

export const FilterMenuLabel = styled.label``;

export const FilterMenuSelect = styled.select`
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

export const FilterMenuButtonsFooter = styled.div`
  margin: 0 0 0 auto;
`;
