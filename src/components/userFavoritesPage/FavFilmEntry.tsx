// components/userFavoritesPage/FavFilmEntry.tsx
import React from "react";
import { FetchFavFilmsOfPerson } from "../../services/django-api-client";
import useListEntry from "../../hooks/useListEntry";
import {
  Box,
  IconButton,
  Image,
  LinkBox,
  LinkOverlay,
  Spinner,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { BsX } from "react-icons/bs";
import axios from "axios";
import getDjangoEndpoint from "../../django-endpoint";

interface Props {
  entry: FetchFavFilmsOfPerson;
}

export const deleteFavFilmOfPersonEntry = async (
  favEntry: FetchFavFilmsOfPerson
) => {
  const accessToken = localStorage.getItem("access_token");
  const instance = axios.create({
    baseURL: getDjangoEndpoint(),
    headers: {
      accept: "application/json",
      Authorization: `JWT ${accessToken}`,
    },
  });
  try {
    await instance.delete(
      `${getDjangoEndpoint()}movielist/fav-films-of-person/${favEntry?.id}/`
    );
    window.location.reload();
  } catch (e) {
    console.log(`Failed to delete entry!`, e);
  }
};

const FavFilmEntry = ({ entry }: Props) => {
  const { data, isLoading, error } = useListEntry(entry.listEntry.toString());

  if (isLoading || !data) {
    return (
      <Box
        width="120px"
        height="225px"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Spinner />
      </Box>
    );
  }

  return (
    <Box
      position="relative"
      width="100px"
      height="150px"
      borderRadius="md"
      overflow="hidden"
      role="group" // enables _groupHover for children
    >
      <LinkBox as="article" width="100%" height="100%">
        <LinkOverlay as={Link} to={`/movies/${data.movie_id}`}>
          <Image
            src={data.poster_url}
            width="100%"
            height="100%"
            objectFit="cover"
            borderRadius="md"
          />
        </LinkOverlay>
      </LinkBox>

      <IconButton
        icon={<BsX />}
        aria-label="Remove"
        position="absolute"
        top="4px"
        right="4px"
        size="xs"
        variant="ghost"
        color="white"
        bg="rgba(0, 0, 0, 0.5)"
        onClick={() => deleteFavFilmOfPersonEntry(entry)}
        opacity={0}
        _groupHover={{ opacity: 1 }}
        transition="opacity 0.2s"
      />
    </Box>
  );
};

export default FavFilmEntry;
