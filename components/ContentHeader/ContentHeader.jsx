import React, { useCallback } from "react";
import {
  MainContentHeading,
  MainContentHeader,
  HeadingSection,
  FilterSection,
  CartLink,
  CartImg,
} from "./ContentHeaderStyle";
import { CartIcon } from "../../assets";
import { useNavigate } from "@shopify/app-bridge-react";
import { debounce } from "../common/debounce";
import { Search } from "../common/Search";

export function ContentHeader({
  title,
  searchQuery,
  setSearchQuery,
  children,
}) {
  const navigate = useNavigate();

  const handleSearch = useCallback(
    debounce((query) => {
      setSearchQuery(query);
    }, 300),
    []
  );

  return (
    <MainContentHeader>
      <HeadingSection>
        <MainContentHeading>{title}</MainContentHeading>
        <CartLink onClick={() => navigate("/cart")}>
          <CartImg src={CartIcon} alt="Cart Icon" />
        </CartLink>
      </HeadingSection>
      <FilterSection>
        <Search
          width={30}
          height={2.5}
          paddingLeft={3}
          searchText={"Search..."}
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
        {children}
      </FilterSection>
    </MainContentHeader>
  );
}
