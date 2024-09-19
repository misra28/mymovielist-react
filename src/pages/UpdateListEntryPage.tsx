import {
  Box,
  Button,
  Heading,
  Input,
  InputGroup,
  FormLabel,
  Spinner,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useListEntry from "../hooks/useListEntry";
import ListEntry from "../entities/ListEntry";
import getDjangoEndpoint from "../django-endpoint";
import axios from "axios";

const UpdateListEntryPage = () => {
  const { entry_id } = useParams();
  const { data, isLoading, error } = useListEntry(entry_id || "");

  const ratingRef = useRef<HTMLInputElement>(null);
  const dateWatchedRef = useRef<HTMLInputElement>(null);
  const commentsRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const accessToken = localStorage.getItem("access_token")!;
  if (!entry_id) {
    console.error("No entry id");
    return null;
  }

  if (isLoading) return <Spinner />;
  if (error) return null;

  const submitUpdatedInfo = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const listEntry = {
      id: data?.id!,
      movie_id: data?.movie_id!,
      movie_title: data?.movie_title!,
      poster_url: data?.poster_url!,
      user: data?.user!,
      rating: parseFloat(ratingRef.current?.value!),
      date_watched: dateWatchedRef.current?.value,
      comments: commentsRef.current?.value,
    } as ListEntry;
    console.log(listEntry);
    let updatedData: ListEntry;
    const instance = axios.create({
      baseURL: getDjangoEndpoint(),
      headers: {
        accept: "application/json",
        Authorization: `JWT ${accessToken}`,
      },
    });
    try {
      updatedData = await instance
        .put<ListEntry>(
          `${getDjangoEndpoint()}movielist/list-entries/${data?.id}/`,
          listEntry,
          { params: { format: "json" } }
        )
        .then((res) => res.data);
      navigate("/user/list");
    } catch (e) {
      console.log(
        `Failed to update information about '${data?.movie_title}'!`,
        e
      );
    }
  };

  return (
    <Box alignItems={"center"} height={"40vw"}>
      <Heading
        marginBottom={"2vw"}
      >{`Update Information For '${data?.movie_title}'`}</Heading>
      <form onSubmit={submitUpdatedInfo}>
        <InputGroup width={"53vw"} marginBottom={"1vw"}>
          <FormLabel marginTop={"0.4rem"} fontSize={"1.2rem"}>
            Rating:{" "}
          </FormLabel>
          <Input
            ref={ratingRef}
            borderRadius={20}
            placeholder={`Rating`}
            variant="filled"
            defaultValue={data?.rating}
          />
        </InputGroup>
        <InputGroup width={"53vw"} marginBottom={"1vw"}>
          <FormLabel marginTop={"0.4rem"} fontSize={"1.2rem"}>
            Date Watched:{" "}
          </FormLabel>
          <Input
            ref={dateWatchedRef}
            borderRadius={20}
            placeholder={`Date Watched`}
            variant="filled"
            defaultValue={data?.date_watched}
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
            defaultValue={data?.comments}
          />
        </InputGroup>
        <Button marginTop={"1vw"} marginRight={2} type="submit">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default UpdateListEntryPage;
