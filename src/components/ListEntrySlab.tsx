import {
  Box,
  Button,
  Card,
  CardBody,
  Grid,
  Heading,
  HStack,
  Image,
  Text,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import ListEntry from "../entities/ListEntry";
import formatDate from "../services/date-conversion";
import axios from "axios";
import getDjangoEndpoint from "../django-endpoint";
import {
  placeholderComments,
  placeholderDate,
  placeholderRating,
} from "../pages/AddListEntryPage";
import ExpandableText from "./ExpandableText";

interface Props {
  listEntry: ListEntry;
  consolidated?: boolean;
}

const deleteEntry = async (accessToken: string, listEntry: ListEntry) => {
  const instance = axios.create({
    baseURL: getDjangoEndpoint(),
    headers: {
      accept: "application/json",
      Authorization: `JWT ${accessToken}`,
    },
  });
  try {
    await instance
      .delete<ListEntry>(
        `${getDjangoEndpoint()}movielist/list-entries/${listEntry?.id}/`
      )
      .then((res) => res.data);
    window.location.reload();
  } catch (e) {
    console.log(`Failed to delete '${listEntry?.movie_title}'!`, e);
  }
};

const ListEntrySlab = ({ listEntry, consolidated }: Props) => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("access_token")!;

  const sub = listEntry.comments;
  const comments =
    listEntry?.comments != sub ? sub + "..." : listEntry?.comments;

  let imgWidth = "3.3rem";
  let textSpacing = 4;

  if (consolidated) {
    imgWidth = "4rem";
    textSpacing = 2;
  }

  return (
    <Card variant={"elevated"} bgColor="#121212" borderRadius={10}>
      <CardBody>
        <HStack align="flex-start">
          <Image width={imgWidth} src={listEntry.poster_url} marginBottom={1} />
          <Box flex={1}>
            <Link to={`/movies/${listEntry.movie_id}`}>
              <Heading fontSize="1.3rem" marginBottom={"0.25rem"}>
                {listEntry.movie_title}
              </Heading>
            </Link>
            <Grid
              templateColumns={!consolidated ? "1fr 2fr 3fr auto auto" : "2fr"}
              gap={textSpacing}
              alignItems="center"
              marginTop="0.5rem"
            >
              {(listEntry.rating &&
                listEntry.rating != parseInt(placeholderRating) && (
                  <Text fontSize="1rem" fontWeight="bold" textAlign="left">
                    {`Rating: ${listEntry.rating}`}
                  </Text>
                )) || <Text></Text>}
              {(listEntry.date_watched &&
                listEntry.date_watched != placeholderDate && (
                  <Text fontSize="1rem" fontWeight="bold" textAlign="left">
                    {`Watched on: ${formatDate(listEntry.date_watched)}`}
                  </Text>
                )) || <Text></Text>}
              {(listEntry.comments &&
                listEntry.comments != placeholderComments &&
                !consolidated && (
                  <Text
                    fontSize="1rem"
                    textAlign="left"
                    whiteSpace="pre-wrap"
                    overflowWrap="break-word"
                    maxWidth="100%"
                    fontStyle={"italic"}
                  >
                    <ExpandableText limit={80}>{`${comments}`}</ExpandableText>
                  </Text>
                )) || <Text></Text>}
              {!consolidated && (
                <Button
                  marginRight={"1rem"}
                  onClick={() => navigate(`/user/${listEntry.id}`)}
                >
                  Update Info
                </Button>
              )}
              {!consolidated && (
                <Button
                  colorScheme="gray"
                  onClick={async () => {
                    deleteEntry(accessToken, listEntry);
                  }}
                >
                  Remove From List
                </Button>
              )}
            </Grid>
          </Box>
        </HStack>
      </CardBody>
    </Card>
  );
};

export default ListEntrySlab;
