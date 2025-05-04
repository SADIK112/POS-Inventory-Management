import React, { useState, useCallback } from "react";
import {
  FilterMenuButtonsFooter,
  FilterButtonWrapper,
  FilterMenuSelect,
  FilterMenuLabel,
  FilterButton,
  FilterMenu,
} from "./ProductFilterStyle";
import { Text, CustomIcon, Button } from "../../common/commonStyle";
import { FilterIcon, ArrowDownIcon } from "../../../assets/index";

export function ProductFilter({
  selectedVendor,
  setSelectedVendor,
  selectedStatus,
  setSearchType,
  setSelectedStatus,
  setSearchQuery,
}) {
  const [activeFilter, setActiveFilter] = useState(false);

  const vendors = [
    { value: "Acme", label: "Acme" },
    { value: "Company 123", label: "Company 123" },
    { value: "Home Sweet Home", label: "Home Sweet Home" },
    { value: "Hydrogen Vendor", label: "Hydrogen Vendor" },
    { value: "Multi-managed Vendor", label: "Multi-managed Vendor" },
    { value: "Rustic LTD", label: "Rustic LTD" },
    { value: "Snowboard Vendor", label: "Snowboard Vendor" },
    { value: "learn-with-sadik", label: "learn-with-sadik" },
  ];

  const status = [
    {
      value: "ACTIVE",
      label: "Active",
    },
    {
      value: "DRAFT",
      label: "Draft",
    },
    {
      value: "ARCHIVED",
      label: "Archived",
    },
  ];

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
    console.log("Selected option:", event.target.value);
  };

  const handleVendorChange = (event) => {
    setSelectedVendor(event.target.value);
    setSearchType("vendor");
    setSearchQuery(event.target.value);
    console.log("Selected option:", event.target.value);
  };

  return (
    <FilterButtonWrapper>
      <FilterButton onClick={() => setActiveFilter(!activeFilter)}>
        <Text color="#fff">Filter</Text>
        <CustomIcon src={FilterIcon} alt="Filter Icon" />
      </FilterButton>
      <FilterMenu className={activeFilter && "active"}>
        <FilterMenuLabel>Vendors</FilterMenuLabel>
        <FilterMenuSelect
          id="vendor"
          value={selectedVendor}
          onChange={handleVendorChange}
          imageUrl={ArrowDownIcon}
        >
          <option value="" disabled>
            Select a vendor
          </option>
          {vendors.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </FilterMenuSelect>
        <FilterMenuLabel>Status</FilterMenuLabel>
        <FilterMenuSelect
          id="status"
          value={selectedStatus}
          onChange={handleStatusChange}
        >
          <option value="" disabled>
            Select an status
          </option>
          {status.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </FilterMenuSelect>
        <FilterMenuButtonsFooter>
          <Button
            padding={"0.5rem 1rem"}
            borderRadius={5}
            hoverBackground={"rgba(37, 154, 108, 1)"}
            background="rgba(21, 30, 47, 1)"
          >
            Reset
          </Button>
        </FilterMenuButtonsFooter>
      </FilterMenu>
    </FilterButtonWrapper>
  );
}
