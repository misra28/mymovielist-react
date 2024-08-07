import { Menu, MenuButton, Button, MenuList, MenuItem } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import useMovieQueryStore from "../movieStore";

const TypeOfSearchSelector = () => {
  const searchType = useMovieQueryStore((s) => s.movieQuery.searchType);
  const setSearchType = useMovieQueryStore((s) => s.setSearchType);

  const searchTypes = ["Movie", "Person"];

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        {searchType || "Movie"}
      </MenuButton>
      <MenuList>
        {searchTypes.map((searchType) => (
          <MenuItem onClick={() => setSearchType(searchType)} key={searchType}>
            {searchType}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default TypeOfSearchSelector;
