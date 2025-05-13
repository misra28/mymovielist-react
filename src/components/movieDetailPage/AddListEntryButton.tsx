import React from "react";
import RCDPanel from "./RCDPanel";
import useEntryIDs from "../../hooks/useEntryIDs";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

interface Props {
  movie_id: string;
}

const AddListEntryButton = ({ movie_id }: Props) => {
  const navigate = useNavigate();
  const entryIDs = useEntryIDs().data;

  if (!entryIDs) return null;
  // console.log(entryIDs);

  let movieEntryID = "";
  let alreadyInList = false;
  for (let e of entryIDs) {
    if (e.movie_id == movie_id) {
      alreadyInList = true;
      movieEntryID = e.id.toString();
    }
  }

  if (!alreadyInList)
    return (
      <Button
        marginBottom={"1rem"}
        onClick={() => navigate(`/add/${movie_id}`)}
      >
        Add this movie to your MovieList
      </Button>
    );
  else return <RCDPanel entry_id={movieEntryID} />;
};

export default AddListEntryButton;
