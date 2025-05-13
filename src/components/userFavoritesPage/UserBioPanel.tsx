import React from "react";
import useBio from "../../hooks/useBio";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Spinner,
  Text,
} from "@chakra-ui/react";
import ExpandableText from "../ExpandableText";

const UserBioPanel = () => {
  const { data, isLoading, error } = useBio();
  let bio =
    "Add a bio to describe your rating system and your taste in movies!";
  let buttonText = "Set Bio";
  if (data?.bio) {
    bio = data.bio;
    buttonText = "Edit Bio";
  }

  return (
    <Card
      variant={"elevated"}
      borderRadius={10}
      width={"70vw"}
      marginBottom={"1rem"}
    >
      <CardHeader paddingBottom={0}>
        <Heading fontSize={"1.5rem"}>Bio</Heading>
      </CardHeader>
      {(!isLoading && (
        <CardBody>
          <Text>
            <ExpandableText limit={200}>{bio}</ExpandableText>
          </Text>
        </CardBody>
      )) || <Spinner margin={"1rem"} />}
      <CardFooter>
        <Button>{buttonText}</Button>
      </CardFooter>
    </Card>
  );
};

export default UserBioPanel;
