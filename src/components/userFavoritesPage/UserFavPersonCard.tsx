import {
  Box,
  Button,
  Card,
  CardBody,
  HStack,
  Heading,
  Image,
  Spinner,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

import { FetchUserFavPerson } from "../../services/django-api-client";
import useGetUserFavFilmsOfPerson from "../../hooks/useGetUserFavFilmsOfPerson";
import FavFilmEntry from "./FavFilmEntry";
import getDjangoEndpoint from "../../django-endpoint";

interface Props {
  favEntry: FetchUserFavPerson;
}

const deleteFavPersonEntry = async (
  accessToken: string,
  favEntry: FetchUserFavPerson
) => {
  const instance = axios.create({
    baseURL: getDjangoEndpoint(),
    headers: {
      accept: "application/json",
      Authorization: `JWT ${accessToken}`,
    },
  });
  try {
    await instance.delete(
      `${getDjangoEndpoint()}movielist/fav-persons/${favEntry?.id}/`
    );
    window.location.reload();
  } catch (e) {
    console.log(`Failed to delete '${favEntry?.person_name}'!`, e);
  }
};

const UserFavPersonCard = ({ favEntry }: Props) => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("access_token");
  const isAuthenticated = !!accessToken;

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/user/");
    }
  }, [isAuthenticated, navigate]);

  const { data: favFilmsOfPerson, isLoading } = useGetUserFavFilmsOfPerson(
    parseInt(favEntry.person)
  );

  return (
    <Card
      variant="elevated"
      bgColor="#121212"
      borderRadius="lg"
      width="full"
      maxW="100%"
      overflow="hidden"
    >
      <CardBody>
        <HStack align="flex-start" spacing={5} width="100%">
          <Image
            width={{ base: "6rem", md: "9.4rem" }}
            src={favEntry.profile_url!}
            borderRadius="md"
            flexShrink={0}
          />

          <Box flex="1" minW={0}>
            <HStack justify="space-between" flexWrap="wrap">
              <Link to={`/people/${favEntry.person}`}>
                <Heading fontSize={{ base: "1.2rem", md: "1.5rem" }}>
                  {favEntry.person_name}
                </Heading>
              </Link>
              <Button
                size="sm"
                onClick={() => deleteFavPersonEntry(accessToken!, favEntry)}
              >
                Remove
              </Button>
            </HStack>

            <Box overflowX="auto" w="full" pt={2}>
              <HStack spacing={4} minW="max-content">
                {isLoading ? (
                  <Spinner />
                ) : (
                  favFilmsOfPerson?.map((item) => (
                    <FavFilmEntry key={item.id} entry={item} />
                  ))
                )}
              </HStack>
            </Box>
          </Box>
        </HStack>
      </CardBody>
    </Card>
  );
};

export default UserFavPersonCard;
