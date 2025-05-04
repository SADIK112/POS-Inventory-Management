import React from "react";
import {
  HomeIcon,
  ProductIcon,
  CustomerIcon,
  OrderIcon,
  Logo,
} from "../../assets";
import {
  SideBar,
  UnorderedList,
  List,
  LogoImage,
  Anchor,
  ImageIcon,
  Heading,
  Header,
} from "./SidebarStyle";
import { useLocation } from "react-router-dom";
import { useNavigate } from "@shopify/app-bridge-react";

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const getActivePageName = () => {
    const pathname = location.pathname;
    const activePageName = pathname.substring(1);
    return activePageName;
  };

  return (
    <SideBar>
      <Header>
        <LogoImage src={Logo} alt="Logo" />
        <Heading>Venture</Heading>
      </Header>
      <UnorderedList>
        <List>
          <Anchor
            className={getActivePageName() === "" ? "active" : ""}
            onClick={() => navigate("/")}
          >
            <ImageIcon src={HomeIcon} alt="Home Icon" />
            <span>Dashboard</span>
          </Anchor>
        </List>
        <List>
          <Anchor
            className={getActivePageName() === "products" ? "active" : ""}
            onClick={() => navigate("/products")}
          >
            <ImageIcon src={ProductIcon} alt="Product Icon" />
            Products
          </Anchor>
        </List>
        <List>
          <Anchor
            className={getActivePageName() === "customers" ? "active" : ""}
            onClick={() => navigate("/customers")}
          >
            <ImageIcon src={CustomerIcon} alt="Customer Icon" />
            Customers
          </Anchor>
        </List>
        <List>
          <Anchor
            className={getActivePageName() === "orders" ? "active" : ""}
            onClick={() => navigate("/orders")}
          >
            <ImageIcon src={OrderIcon} alt="Order Icon" />
            Orders
          </Anchor>
        </List>
      </UnorderedList>
    </SideBar>
  );
}
