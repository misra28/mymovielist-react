import { Button } from "@chakra-ui/react";
import useMovieQueryStore from "../store";

const ResetButton = () => {
  const { setPrimaryReleaseYear, setSearchText, setGenreId, setSearchType } =
    useMovieQueryStore();

  return (
    <Button
      marginRight={3}
      onClick={() => {
        setSearchText("");
        setPrimaryReleaseYear();
        setGenreId();
        setSearchType("Movie");
      }}
      type="reset"
    >
      Reset
    </Button>
  );
};

export default ResetButton;
