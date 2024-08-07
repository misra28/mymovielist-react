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
        Log In to Add to your List
      </Button>
    );

  return (
    <Button marginBottom={"1rem"} onClick={() => navigate(`/add/${movie_id}`)}>
      Add This Movie to your MovieList
    </Button>
  );
};

export default AddListEntryButton;
