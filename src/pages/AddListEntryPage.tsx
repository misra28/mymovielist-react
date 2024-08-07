import {
  Box,
  Heading,
  InputGroup,
  FormLabel,
  Input,
  Button,
  Spinner,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useListEntry from "../hooks/useListEntry";
import useMovieDetails from "../hooks/useMovieDetails";
import getImage from "../services/backdrop-url";
import useCredentialsQueryStore from "../credentialsStore";
import ListEntry from "../entities/ListEntry";
import getDjangoEndpoint from "../django-endpoint";
import axios from "axios";

const AddListEntryPage = () => {
  const { movie_id } = useParams();
  if (!movie_id) {
    console.error("No entry id");
    return null;
  }
  const { data, isLoading, error } = useMovieDetails(parseInt(movie_id));

  if (isLoading) return <Spinner />;
  if (error) console.error(error);

  const ratingRef = useRef<HTMLInputElement>(null);
  const dateWatchedRef = useRef<HTMLInputElement>(null);
  const commentsRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const userId = useCredentialsQueryStore((s) => s.credentialsQuery.userId);

  const accessToken = localStorage.getItem("access_token")!;

  const submitAddedEntry = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const listEntry = {
      movie_id: data?.id!,
      movie_title: data?.title!,
      poster_url: getImage(data?.poster_path!),
      user: userId,
      rating: parseFloat(ratingRef.current?.value!),
      date_watched: dateWatchedRef.current?.value,
      comments: commentsRef.current?.value,
    };
    let response: ListEntry;
    const instance = axios.create({
      baseURL: getDjangoEndpoint(),
      headers: {
        accept: "application/json",
        Authorization: `JWT ${accessToken}`,
      },
    });
    try {
      response = await instance
        .post(`${getDjangoEndpoint()}movielist/list-entries/`, listEntry, {
          params: { format: "json" },
        })
        .then((res) => res.data);
      navigate("/user/list");
    } catch (e) {
      alert(`Failed to add '${data?.title}' to the list: ${e}`);
    }
  };

  return (
    <Box alignItems={"center"} height={"40vw"}>
      <Heading
        marginBottom={"2vw"}
      >{`Add '${data?.title}' to your MovieList`}</Heading>
      <form onSubmit={submitAddedEntry}>
        <InputGroup width={"53vw"} marginBottom={"1vw"}>
          <FormLabel marginTop={"0.4rem"} fontSize={"1.2rem"}>
            Rating:{" "}
          </FormLabel>
          <Input
            ref={ratingRef}
            borderRadius={20}
            placeholder={`Rating`}
            variant="filled"
          />
        </InputGroup>
        <InputGroup width={"53vw"} marginBottom={"1vw"}>
          <FormLabel marginTop={"0.4rem"} fontSize={"1.2rem"}>
            Date Watched:{" "}
          </FormLabel>
          <Input
            ref={dateWatchedRef}
            borderRadius={20}
            placeholder={`Date Watched (YYYY-MM-DD)`}
            variant="filled"
          />
        </InputGroup>
        <InputGroup width={"53vw"} marginBottom={"1vw"}>
          <FormLabel marginTop={"0.4rem"} fontSize={"1.2rem"}>
            Comments:{" "}
          </FormLabel>
          <Input
            ref={commentsRef}
            borderRadius={20}
            placeholder={`Comments`}
            variant="filled"
          />
        </InputGroup>
        <Button marginTop={"1vw"} marginRight={2} type="submit">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default AddListEntryPage;
