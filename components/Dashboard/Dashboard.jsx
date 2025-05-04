import React from "react";
import { ContentHeader } from "../index";
import {
  DashboardContainer,
  DashboardCardWrapper,
  DashboardCard,
  CardDescription,
  DashboardCardContent,
  CardIcon,
  CardImg,
  CardHeading,
  CardDescriptionText,
} from "./DashboardStyle";
import { ProductIcon, OrderIcon, CustomerIcon } from "../../assets";

export function Dashboard() {
  return (
    <React.Fragment>
      <ContentHeader title="Dashboard" showFilterSection={false} />
      <DashboardContainer>
        <DashboardCardWrapper>
          <DashboardCard>
            <DashboardCardContent>
              <CardIcon>
                <CardImg src={ProductIcon} alt="Product Icon" />
              </CardIcon>
              <CardDescription>
                <CardHeading>100</CardHeading>
                <CardDescriptionText>Total Products</CardDescriptionText>
              </CardDescription>
            </DashboardCardContent>
          </DashboardCard>
          <DashboardCard>
            <DashboardCardContent>
              <CardIcon>
                <CardImg src={OrderIcon} alt="Order Icon" />
              </CardIcon>
              <CardDescription>
                <CardHeading>555</CardHeading>
                <CardDescriptionText>Total Orders</CardDescriptionText>
              </CardDescription>
            </DashboardCardContent>
          </DashboardCard>
          <DashboardCard>
            <DashboardCardContent>
              <CardIcon>
                <CardImg src={CustomerIcon} alt="Customer Icon" />
              </CardIcon>
              <CardDescription>
                <CardHeading>50</CardHeading>
                <CardDescriptionText>Total Customers</CardDescriptionText>
              </CardDescription>
            </DashboardCardContent>
          </DashboardCard>
        </DashboardCardWrapper>
      </DashboardContainer>
    </React.Fragment>
  );
}
