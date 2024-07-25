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
import useMovieQueryStore from "../store";
import ResetButton from "./ResetButton";

const SearchInput = () => {
  const ref = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const setSearchText = useMovieQueryStore((s) => s.setSearchText);
  const searchText = useMovieQueryStore((s) => s.movieQuery.searchText);

  const submitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (ref.current) {
      setSearchText(ref.current.value);
      navigate("/movies");
    }
  };

  if (!searchText && ref.current) ref.current.value = "";

  return (
    <form onSubmit={submitSearch}>
      <HStack>
        <InputGroup width={"53vw"} marginRight={"1vw"}>
          <InputLeftElement children={<BsSearch />} />
          <Input
            ref={ref}
            borderRadius={20}
            placeholder="Search movies..."
            variant="filled"
          />
        </InputGroup>
        <Button marginRight={4} type="submit">
          Search
        </Button>
        <ResetButton />
      </HStack>
    </form>
  );
};

export default SearchInput;
