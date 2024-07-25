import { Button } from "@chakra-ui/react";
import useMovieQueryStore from "../store";

const ResetButton = () => {
  const { setPrimaryReleaseYear, setSearchText, setGenreId } =
    useMovieQueryStore();

  return (
    <Button
      marginRight={3}
      onClick={() => {
        setSearchText("");
        setPrimaryReleaseYear();
        setGenreId();
      }}
      type="reset"
    >
      Reset
    </Button>
  );
};

export default ResetButton;
