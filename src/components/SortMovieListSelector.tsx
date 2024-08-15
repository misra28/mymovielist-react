import {
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import useCredentialsQueryStore from "../credentialsStore";

const SortMovieListSelector = () => {
  const searchTypes = ["movie_title", "date_watched", "rating"];
  const dirs = ["Ascending", "Descending"];
  const [searchType, setSearchType] = useState(searchTypes[0]);
  const [isAscending, setIsAscending] = useState(true);
  const setListSortType = useCredentialsQueryStore((s) => s.setListSortType);

  if (!isAscending) setListSortType(`-${searchType}`);
  else setListSortType(`${searchType}`);

  return (
    <>
      <Menu>
        <MenuButton
          bgColor="#121212"
          marginBottom={"1rem"}
          marginRight={"1rem"}
          as={Button}
          rightIcon={<BsChevronDown />}
        >
          {searchType === "rating"
            ? "Rating"
            : searchType === "movie_title"
            ? "Title"
            : "Date Watched"}
        </MenuButton>
        <MenuList>
          {searchTypes.map((getSearchType) => (
            <MenuItem
              onClick={() => {
                setSearchType(getSearchType);
              }}
              key={getSearchType}
            >
              {getSearchType === "rating"
                ? "Rating"
                : getSearchType === "movie_title"
                ? "Title"
                : "Date Watched"}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      <Menu>
        <MenuButton
          bgColor="#121212"
          marginBottom={"1rem"}
          as={Button}
          rightIcon={<BsChevronDown />}
        >
          {isAscending ? "Ascending" : "Descending"}
        </MenuButton>
        <MenuList>
          {dirs.map((dir) => (
            <MenuItem
              onClick={() => {
                if (dir == "Descending") setIsAscending(false);
                else setIsAscending(true);
              }}
              key={dir}
            >
              {dir}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </>
  );
};

export default SortMovieListSelector;
