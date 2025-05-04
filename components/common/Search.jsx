import React from "react";
import { SearchIcon } from "../../assets";
import {
  SearchForm,
  SearchFormLabel,
  Input,
  SearchImg,
} from "./commonStyle.js";

export function Search({
    width,
    height,
    fontSize = 1,
    fontFamily = "SF Pro Text Regular",
    searchText,
    onChange,
    onKeyDown,
    onFocus,
    onClick,
    disabled,
    paddingLeft,
    paddingTop,
    paddingBottom,
    paddingRight,
  }) {
    return (
      <SearchForm>
        <SearchFormLabel htmlFor="search-input">
          <SearchImg src={SearchIcon} alt="Search Icon" />
        </SearchFormLabel>
        <Input
          type="text"
          name="search"
          placeholder={searchText}
          width={width}
          height={height}
          fontSize={fontSize}
          fontFamily={fontFamily}
          paddingLeft={paddingLeft}
          paddingTop={paddingTop}
          paddingBottom={paddingBottom}
          paddingRight={paddingRight}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onFocus={onFocus}
          disabled={disabled}
          onClick={onClick}
          autoFocus
        />
      </SearchForm>
    );
}
