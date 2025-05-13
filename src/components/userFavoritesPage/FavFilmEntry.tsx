// components/userFavoritesPage/FavFilmEntry.tsx
import React from "react";
import { FetchFavFilmsOfPerson } from "../../services/django-api-client";
import useListEntry from "../../hooks/useListEntry";
import { Box, IconButton, Image, Spinner } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { BsX } from "react-icons/bs";
import axios from "axios";
import getDjangoEndpoint from "../../django-endpoint";

interface Props {
  entry: FetchFavFilmsOfPerson;
}

const deleteFavFilmOfPersonEntry = async (favEntry: FetchFavFilmsOfPerson) => {
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
      marginBottom={"1rem"}
      borderRadius="md"
      overflow="hidden"
    >
      <Link to={`/movies/${data?.movie_id}`}>
        <Image
          src={data?.poster_url}
          width="100%"
          height="100%"
          objectFit="cover"
        />
      </Link>
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
        _hover={{ bg: "rgba(0, 0, 0, 0.7)" }}
        onClick={() => deleteFavFilmOfPersonEntry(entry)}
      />
    </Box>
  );
};

export default FavFilmEntry;
