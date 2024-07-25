import { Button } from "@chakra-ui/react";
import useMovieQueryStore from "../store";

const ResetButton = () => {
  const { setPrimaryReleaseYear, setSearchText } = useMovieQueryStore();

  return (
    <Button
      marginRight={3}
      onClick={() => {
        setSearchText("");
        setPrimaryReleaseYear();
      }}
      type="reset"
    >
      Reset
    </Button>
  );
};

export default ResetButton;
