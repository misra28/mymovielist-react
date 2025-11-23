import {
  Box,
  Button,
  Card,
  CardBody,
  Grid,
  Heading,
  VStack,
  Image,
  Text,
  HStack,
} from "@chakra-ui/react";
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
import ExpandableText from "../ExpandableText";
import { MoodMeter } from "./MoodMeter";

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
    await instance.delete<ListEntry>(
      `${getDjangoEndpoint()}movielist/list-entries/${listEntry?.id}/`
    );
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
    listEntry?.comments !== sub ? sub + "..." : listEntry?.comments;

  return (
    <Card
      variant="elevated"
      bgColor="#121212"
      borderRadius={10}
      width="100%"
      // padding={4}
    >
      <CardBody>
        <HStack align="flex-start" spacing={5} width="100%">
          {/* Movie Poster */}
          <Image
            width={{ base: "4rem", md: "4.2rem" }}
            src={listEntry.poster_url}
            borderRadius="md"
          />

          {/* Movie Details & Buttons */}
          <Box flexGrow={1}>
            {/* Movie Title */}
            <Link to={`/movies/${listEntry.movie_id}`}>
              <Heading
                fontSize={{ base: "1.2rem", md: "1.5rem" }}
                marginBottom="0.25rem"
              >
                {listEntry.movie_title}
              </Heading>
            </Link>

            {/* Grid for Details & Buttons */}
            <Grid
              templateColumns={{
                base: "1fr", // Stack on small screens
                lg: !consolidated ? "1fr 2fr 3fr auto" : "2fr", // Align properly when not consolidated
              }}
              gap={4}
              alignItems="center"
              width="100%"
            >
              {/* Rating */}
              {/* {listEntry.rating &&
              listEntry.rating !== parseInt(placeholderRating) ? (
                <Text fontSize="1rem" fontWeight="bold">
                  Rating: {listEntry.rating}
                </Text>
              ) : (
                <Text></Text>
              )} */}

              {/* Mood Meter */}
              <MoodMeter
                simplified_rating={listEntry.simplified_rating}
                width={30}
                consolidated={true}
              />

              {/* Watched Date */}
              {listEntry.date_watched &&
              listEntry.date_watched !== placeholderDate ? (
                <Text fontSize="1rem" fontWeight="bold">
                  Watched on {formatDate(listEntry.date_watched)}
                </Text>
              ) : (
                <Text></Text>
              )}

              {/* Comments */}
              {listEntry.comments &&
              listEntry.comments !== placeholderComments &&
              !consolidated ? (
                <Text
                  fontSize="1rem"
                  whiteSpace="pre-wrap"
                  overflowWrap="break-word"
                  maxWidth="100%"
                  fontStyle="italic"
                >
                  <ExpandableText limit={80}>{`${comments}`}</ExpandableText>
                </Text>
              ) : (
                <Text></Text>
              )}

              {/* Buttons (Right-Aligned) */}
              {!consolidated && (
                <HStack justifySelf="end">
                  <Button onClick={() => navigate(`/user/${listEntry.id}`)}>
                    Update Info
                  </Button>
                  <Button
                    colorScheme="gray"
                    onClick={() => deleteEntry(accessToken, listEntry)}
                  >
                    Remove From List
                  </Button>
                </HStack>
              )}
            </Grid>
          </Box>
        </HStack>
      </CardBody>
    </Card>
  );
};

export default ListEntrySlab;
