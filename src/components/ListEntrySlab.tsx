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

const ListEntrySlab = ({ listEntry }: Props) => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("access_token")!;

  const sub = listEntry.comments?.substring(0, 80);
  const comments =
    listEntry?.comments != sub ? sub + "..." : listEntry?.comments;

  return (
    <Card variant={"elevated"} bgColor="#121212" borderRadius={10}>
      <CardBody>
        <HStack>
          <Image width={"3.3rem"} src={listEntry.poster_url} marginBottom={1} />
          <Box>
            <Link to={`/movies/${listEntry.movie_id}`}>
              <Heading fontSize="1.3rem" marginBottom={"0.25rem"}>
                {listEntry.movie_title}
              </Heading>
            </Link>
            <HStack gap={"1rem"} justify={"space-between"}>
              {listEntry.rating &&
                listEntry.rating != parseInt(placeholderRating) && (
                  <React.Fragment>
                    <Text fontSize="1rem" width={"15%"} fontWeight={"bold"}>
                      {`Rating: ${listEntry.rating}`}
                    </Text>
                  </React.Fragment>
                )}
              {listEntry.date_watched &&
                listEntry.date_watched != placeholderDate && (
                  <React.Fragment>
                    <Text fontSize="1rem" width={"35%"} fontWeight={"bold"}>
                      {`Watched on: ${formatDate(listEntry.date_watched)}`}
                    </Text>
                  </React.Fragment>
                )}
              {listEntry.comments &&
                listEntry.comments != placeholderComments && (
                  <React.Fragment>
                    <Text fontSize="1rem" width={"30%"} fontWeight={"bold"}>
                      {`Comments: ${comments}`}
                    </Text>
                  </React.Fragment>
                )}

              <Button
                marginRight={"1rem"}
                width={"10%"}
                onClick={() => navigate(`/user/${listEntry.id}`)}
              >
                Update Info
              </Button>
              <Button
                width={"15%"}
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
                    window.location.reload();
                  } catch (e) {
                    console.log(
                      `Failed to delete '${listEntry?.movie_title}'!`,
                      e
                    );
                  }
                }}
              >
                Remove From List
              </Button>
            </HStack>
          </Box>
        </HStack>
      </CardBody>
    </Card>
  );
};

export default ListEntrySlab;
