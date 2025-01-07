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

interface Props {
  entry_id: string;
}

const RCDPanel = ({ entry_id }: Props) => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useListEntry(entry_id);

  if (isLoading) return <Spinner />;
  if (error) return null;

  return (
    <>
      <Button
        marginBottom={"1rem"}
        onClick={() => navigate(`/user/${entry_id}`)}
      >
        Update Entry Information
      </Button>
      <Card marginBottom={"1rem"}>
        <CardBody>
          <Text>Rating: {data?.rating}</Text>
          <Text>Date Watched: {formatDate(data!.date_watched)}</Text>
          <Text>Comments: {data?.comments}</Text>
        </CardBody>
      </Card>
    </>
  );
};

export default RCDPanel;
