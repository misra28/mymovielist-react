import {
  Button,
  Card,
  CardBody,
  Heading,
  Spinner,
  Text,
} from "@chakra-ui/react";
import useListEntry from "../hooks/useListEntry";
import formatDate from "../services/date-conversion";
import { useNavigate } from "react-router-dom";
import {
  placeholderComments,
  placeholderDate,
  placeholderRating,
} from "../pages/AddListEntryPage";

interface Props {
  entry_id: string;
}

const UpdateButton = ({ entry_id }: Props) => {
  const navigate = useNavigate();
  return (
    <Button marginBottom={"1rem"} onClick={() => navigate(`/user/${entry_id}`)}>
      Update Entry Information
    </Button>
  );
};

const RCDPanel = ({ entry_id }: Props) => {
  const { data, isLoading, error } = useListEntry(entry_id);
  if (isLoading) return <Spinner />;

  if (
    error ||
    (placeholderRating == data?.rating.toString() &&
      placeholderComments == data?.comments &&
      placeholderDate == data?.date_watched)
  )
    return <UpdateButton entry_id={entry_id} />;

  return (
    <>
      <UpdateButton entry_id={entry_id} />
      <Card marginBottom={"1rem"}>
        <CardBody>
          {placeholderRating != data?.rating.toString() && (
            <Text>Rating: {data?.rating}</Text>
          )}
          {placeholderDate != data?.date_watched && (
            <Text>Date Watched: {formatDate(data!.date_watched)}</Text>
          )}
          {placeholderComments != data?.comments && (
            <Text>Comments: {data?.comments}</Text>
          )}
        </CardBody>
      </Card>
    </>
  );
};

export default RCDPanel;
