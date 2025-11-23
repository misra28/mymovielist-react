import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  VStack,
  Image,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ListEntry from "../../entities/ListEntry";
import formatDate from "../../services/date-conversion";
import axios from "axios";
import getDjangoEndpoint from "../../django-endpoint";
import {
  placeholderComments,
  placeholderDate,
  placeholderRating,
} from "../../pages/AddListEntryPage";
import { MoodMeter } from "./MoodMeter";

interface Props {
  listEntry: ListEntry;
}

const ListEntryCard = ({ listEntry }: Props) => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("access_token")!;

  return (
    <Card
      variant="elevated"
      bgColor="#121212"
      borderRadius={10}
      width={{ base: "90%", md: "95%", lg: "100%" }} // Responsive width
      padding={{ base: 3, md: 5 }} // Adjust padding
    >
      <Link to={`/movies/${listEntry.movie_id}`}>
        <CardHeader paddingBottom={0}>
          <Heading fontSize={{ base: "1.2rem", md: "1.6rem" }}>
            {listEntry.movie_title}
          </Heading>
        </CardHeader>
      </Link>

      <CardBody>
        <VStack
          spacing={4}
          align="start"
          flexDirection={{ base: "column", lg: "row" }}
        >
          <Image
            width={{ base: "70%", md: "60%", lg: "40%" }} // Full width on mobile
            src={listEntry.poster_url}
            borderRadius="md"
          />
          <Box marginLeft={{ base: "0", md: "1rem" }}>
            {/* {listEntry.simplified_rating && (
              <Text fontSize="1.2rem" fontWeight="bold">
                {`Rating: ${listEntry.simplified_rating}`}
              </Text>
            )} */}
            <MoodMeter simplified_rating={listEntry.simplified_rating} />

            {/* {listEntry.rating &&
              listEntry.rating !== parseInt(placeholderRating) && (
                <Text fontSize="1.2rem" fontWeight="bold">
                  {`Rating: ${listEntry.rating}`}
                </Text>
              )} */}

            {listEntry.date_watched &&
              listEntry.date_watched !== placeholderDate && (
                <>
                  <Text fontSize="1.2rem" fontWeight="bold" marginTop="0.5rem">
                    Watched on:
                  </Text>
                  <Text fontSize="1rem">
                    {formatDate(listEntry.date_watched)}
                  </Text>
                </>
              )}

            {listEntry.comments &&
              listEntry.comments !== placeholderComments && (
                <>
                  <Text fontSize="1.2rem" fontWeight="bold" marginTop="1rem">
                    Comments:
                  </Text>

                  <Box
                    maxH="10.5rem" // set the visible height
                    overflowY="auto" // enable vertical scrolling
                    p={2}
                    borderRadius="md"
                    marginTop="0.25rem"
                    background={"#202020"}
                  >
                    <Text fontSize="1rem" whiteSpace="pre-wrap">
                      {listEntry.comments}
                    </Text>
                  </Box>
                </>
              )}
          </Box>
        </VStack>
      </CardBody>

      <CardFooter display="flex" flexDirection={{ base: "column", md: "row" }}>
        <Button
          width={{ base: "100%", md: "auto" }} // Full width on mobile
          marginBottom={{ base: 2, md: 0 }}
          marginRight={{ md: "1rem" }}
          onClick={() => navigate(`/user/${listEntry.id}`)}
        >
          Update Info
        </Button>
        <Button
          width={{ base: "100%", md: "auto" }}
          onClick={async () => {
            const instance = axios.create({
              baseURL: getDjangoEndpoint(),
              headers: {
                accept: "application/json",
                Authorization: `JWT ${accessToken}`,
              },
            });
            try {
              await instance.delete<ListEntry>(
                `${getDjangoEndpoint()}movielist/list-entries/${listEntry?.id}/`
              );
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
