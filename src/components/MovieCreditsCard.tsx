import {
  Card,
  CardBody,
  SimpleGrid,
  Image,
  Text,
  Heading,
  CardHeader,
  Button,
} from "@chakra-ui/react";
import useMovieCredits from "../hooks/useMovieCredits";
import getBackdrop from "../services/backdrop-url";
import React, { useState } from "react";
import noPerson from "../assets/no-person-image.png";
import BuildMovieCredits from "./BuildMovieCredits";

interface Props {
  movie_id: string;
}

const MovieCreditsCard = ({ movie_id }: Props) => {
  const {
    data: credits,
    isLoading,
    error,
  } = useMovieCredits(parseInt(movie_id));

  if (!credits || error) return null;

  return (
    <>
      <BuildMovieCredits
        people={credits?.cast!}
        type={"cast"}
      ></BuildMovieCredits>
      <BuildMovieCredits
        people={credits?.crew!}
        type={"crew"}
      ></BuildMovieCredits>
    </>
  );
};

export default MovieCreditsCard;
