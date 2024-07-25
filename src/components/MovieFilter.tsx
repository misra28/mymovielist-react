import { Heading, Input, InputGroup } from "@chakra-ui/react";
import { useRef } from "react";
import useMovieQueryStore from "../store";

const MovieFilter = () => {
  const ref = useRef<HTMLInputElement>(null);
  const setPrimaryReleaseYear = useMovieQueryStore(
    (s) => s.setPrimaryReleaseYear
  );
  const primaryReleaseYear = useMovieQueryStore(
    (s) => s.movieQuery.primaryReleaseYear
  );

  if (!primaryReleaseYear && ref.current) ref.current.value = "";

  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (ref.current) {
            setPrimaryReleaseYear(parseInt(ref.current.value));
          }
        }}
      >
        <Heading
          fontSize="2xl"
          marginTop={8}
          marginBottom={2}
          textAlign={"center"}
        >
          Release Year
        </Heading>
        <InputGroup>
          <Input
            type="number"
            ref={ref}
            borderRadius={20}
            placeholder="Enter a year..."
            variant="filled"
          />
        </InputGroup>
      </form>
    </>
  );
};

export default MovieFilter;
