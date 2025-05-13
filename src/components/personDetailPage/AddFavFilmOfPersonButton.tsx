import React from "react";
import RCDPanel from "../movieDetailPage/RCDPanel";
import useEntryIDs from "../../hooks/useEntryIDs";
import { Button, HStack, Spinner, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import useGetUserFavPeople from "../../hooks/useGetUserFavPeople";
import getDjangoEndpoint from "../../django-endpoint";
import axios from "axios";
import {
  FetchFavFilmsOfPerson,
  FetchUserFavPerson,
} from "../../services/django-api-client";
import useCredentialsQueryStore from "../../credentialsStore";
import usePersonDetails from "../../hooks/usePersonDetails";
import getImage from "../../services/backdrop-url";
import { BsStar } from "react-icons/bs";

interface Props {
  listEntry_id: number;
  favPerson_id: string;
}

const AddFavFilmOfPersonButton = ({ listEntry_id, favPerson_id }: Props) => {
  const navigate = useNavigate();
  const userId = useCredentialsQueryStore((s) => s.credentialsQuery.userId);
  const accessToken = localStorage.getItem("access_token")!;

  const submitFavFilmOfPerson = async () => {
    const favFilmOfPerson = {
      user: userId!,
      listEntry: listEntry_id,
      favPerson: favPerson_id,
    };

    console.log(favFilmOfPerson);

    const instance = axios.create({
      baseURL: getDjangoEndpoint(),
      headers: {
        accept: "application/json",
        Authorization: `JWT ${accessToken}`,
      },
    });
    let response: FetchFavFilmsOfPerson;
    try {
      response = await instance
        .post(`movielist/fav-films-of-person/`, favFilmOfPerson, {
          params: { format: "json" },
        })
        .then((res) => res.data);
      window.location.reload();
      // navigate("/user/favorites");
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.error(e.response?.data);
      }
      alert(`Failed to add the entry to your favorites.`);
    }
  };

  return (
    <Button onClick={() => submitFavFilmOfPerson()}>
      <HStack>
        <>
          <BsStar />
          <Text>{`Add Film to Favorite Performances/Roles`}</Text>
        </>
      </HStack>
    </Button>
  );
};

export default AddFavFilmOfPersonButton;
