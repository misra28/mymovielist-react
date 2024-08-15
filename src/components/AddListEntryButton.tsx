import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import useCredentialsQueryStore from "../credentialsStore";

interface Props {
  movie_id: number;
}

const AddListEntryButton = ({ movie_id }: Props) => {
  const navigate = useNavigate();
  const userId = useCredentialsQueryStore((s) => s.credentialsQuery.userId);

  if (!userId)
    return (
      <Button marginBottom={"1rem"} onClick={() => navigate(`/user`)}>
        Log in to add to your MovieList
      </Button>
    );

  return (
    <Button marginBottom={"1rem"} onClick={() => navigate(`/add/${movie_id}`)}>
      Add this movie to your MovieList
    </Button>
  );
};

export default AddListEntryButton;
