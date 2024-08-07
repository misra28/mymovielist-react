import {
  Button,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { useRef } from "react";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import useMovieQueryStore from "../movieStore";
import ResetButton from "./ResetButton";
import TypeOfSearchSelector from "./TypeOfSearchSelector";

const SearchInput = () => {
  const ref = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const setSearchText = useMovieQueryStore((s) => s.setSearchText);
  const searchText = useMovieQueryStore((s) => s.movieQuery.searchText);
  const searchType = useMovieQueryStore((s) => s.movieQuery.searchType);

  const submitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (ref.current) {
      setSearchText(ref.current.value);
      navigate("/movies");
    }
  };

  if (!searchText && ref.current) ref.current.value = "";

  let placeholder = "movies";
  if (searchType === "Person") placeholder = "people";

  return (
    <form onSubmit={submitSearch}>
      <HStack>
        <InputGroup width={"43vw"} marginRight={"1vw"}>
          <InputLeftElement children={<BsSearch />} />
          <Input
            ref={ref}
            borderRadius={20}
            placeholder={`Search ${placeholder}...`}
            variant="filled"
          />
        </InputGroup>
        <TypeOfSearchSelector />
        <Button marginLeft={2} marginRight={2} type="submit">
          Search
        </Button>
        <ResetButton />
      </HStack>
    </form>
  );
};

export default SearchInput;
