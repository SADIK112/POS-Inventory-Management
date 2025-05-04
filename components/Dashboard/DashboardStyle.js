import styled from "styled-components";

export const DashboardContainer = styled.div`
  padding: 2rem;
`;

export const DashboardCardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const DashboardCard = styled.div`
  background-color: rgba(29, 40, 60, 1);
  padding: 1.25rem;
  border-radius: 0.375rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
  box-shadow: rgba(16, 24, 39, 0.8) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
`;

export const DashboardCardContent = styled.div`
  display: flex;
  gap: 1rem;
`;

export const CardDescription = styled.div`
  display: grid;
  gap: 1rem;
`;

export const CardIcon = styled.div`
  width: 50px;
  height: 50px;
  background-color: rgba(37, 154, 108, 1);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CardImg = styled.img`
    width: 30px;
    height: 30px;
`

export const CardHeading = styled.h2`
    font-size: 1.75rem;
`

export const CardDescriptionText = styled.p`
    font-size: 1rem;
`