import React from "react";
import RCDPanel from "../movieDetailPage/RCDPanel";
import useEntryIDs from "../../hooks/useEntryIDs";
import { Button, Spinner } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import useGetUserFavPeople from "../../hooks/useGetUserFavPeople";
import getDjangoEndpoint from "../../django-endpoint";
import axios from "axios";
import { FetchUserFavPerson } from "../../services/django-api-client";
import useCredentialsQueryStore from "../../credentialsStore";
import usePersonDetails from "../../hooks/usePersonDetails";
import getImage from "../../services/backdrop-url";

interface Props {
  person_id: string;
}

const AddFavPersonButton = ({ person_id }: Props) => {
  const navigate = useNavigate();
  const favPeople = useGetUserFavPeople().data;
  const userId = useCredentialsQueryStore((s) => s.credentialsQuery.userId);
  const { data, isLoading, error } = usePersonDetails(parseInt(person_id));
  const accessToken = localStorage.getItem("access_token")!;

  if (isLoading) return <Spinner />;
  if (!favPeople || error) return null;

  const submitFavPerson = async () => {
    const favPerson = {
      user: userId!,
      person: parseInt(person_id),
      profile_url: getImage(data?.profile_path!),
    };

    console.log(favPerson);

    const instance = axios.create({
      baseURL: getDjangoEndpoint(),
      headers: {
        accept: "application/json",
        Authorization: `JWT ${accessToken}`,
      },
    });
    let response: FetchUserFavPerson;
    try {
      response = await instance
        .post(`movielist/fav-persons/`, favPerson, {
          params: { format: "json" },
        })
        .then((res) => res.data);
      navigate("/user/favorites");
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.error(e.response?.data); // See what DRF returned
      }
      alert(`Failed to add ${data?.name} to your favorites.`);
    }
  };

  let favPersonID = "";
  let alreadyInList = false;
  for (let e of favPeople) {
    if (e.person === person_id) {
      alreadyInList = true;
      favPersonID = e.person;
    }
  }

  if (alreadyInList) return null;

  return (
    <Button
      type="button"
      marginLeft={3}
      marginTop={5}
      onClick={submitFavPerson}
    >
      Add This Person to Your Favorites
    </Button>
  );
};

export default AddFavPersonButton;
