import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  HStack,
  Image,
  Text,
} from "@chakra-ui/react";
import React from "react";
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

interface Props {
  listEntry: ListEntry;
}

const ListEntryCard = ({ listEntry }: Props) => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("access_token")!;
  return (
    <Card variant={"elevated"} bgColor="#121212" borderRadius={10}>
      <Link to={`/movies/${listEntry.movie_id}`}>
        <CardHeader paddingBottom={0}>
          <Heading fontSize="1.6rem">{listEntry.movie_title}</Heading>
        </CardHeader>
      </Link>
      <CardBody>
        <HStack>
          <Image width={"27%"} src={listEntry.poster_url} marginBottom={2} />
          <Box marginLeft={"1rem"}>
            {listEntry.rating &&
              listEntry.rating != parseInt(placeholderRating) && (
                <React.Fragment>
                  <Text
                    fontSize="1.3rem"
                    fontWeight={"bold"}
                    marginBottom={"1rem"}
                  >
                    {`Rating: ${listEntry.rating}`}
                  </Text>
                </React.Fragment>
              )}
            {listEntry.date_watched &&
              listEntry.date_watched != placeholderDate && (
                <React.Fragment>
                  <Text fontSize="1.3rem" fontWeight={"bold"}>
                    Watched on:
                  </Text>
                  <Text fontSize="1.3rem" marginBottom={"1rem"}>
                    {`${formatDate(listEntry.date_watched)}`}
                  </Text>
                </React.Fragment>
              )}
            {listEntry.comments &&
              listEntry.comments != placeholderComments && (
                <React.Fragment>
                  <Text fontSize="1.3rem" fontWeight={"bold"}>
                    Comments:
                  </Text>
                  <Text fontSize="1rem" marginBottom={"1rem"}>
                    {`${listEntry.comments}`}
                  </Text>
                </React.Fragment>
              )}
          </Box>
        </HStack>
      </CardBody>
      <CardFooter>
        <Button
          marginRight={"1rem"}
          onClick={() => navigate(`/user/${listEntry.id}`)}
        >
          Update Info
        </Button>
        <Button
          onClick={async () => {
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
                  `${getDjangoEndpoint()}movielist/list-entries/${
                    listEntry?.id
                  }/`
                )
                .then((res) => res.data);
              // window.location.reload();
            } catch (e) {
              console.log(`Failed to delete '${listEntry?.movie_title}'!`, e);
            }
          }}
        >
          Remove From List
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ListEntryCard;
