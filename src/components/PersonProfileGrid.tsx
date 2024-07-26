import { Card, CardBody, Image, SimpleGrid } from "@chakra-ui/react";
import usePersonImages from "../hooks/usePersonImages";
import getImage from "../services/backdrop-url";
import PersonAttributesCard from "./PersonAttributesCard";
import usePersonDetails from "../hooks/usePersonDetails";

interface Props {
  person_id: string;
}

const PersonProfileGrid = ({ person_id }: Props) => {
  const { data: person } = usePersonDetails(parseInt(person_id!));
  const { data: profiles } = usePersonImages(parseInt(person_id));

  if (!person || !profiles) return null;

  return (
    <Card>
      <CardBody>
        <SimpleGrid columns={{ base: 2, md: 3, lg: 4, xl: 4 }} spacing={2}>
          {profiles?.profiles
            .map((p) => (
              <Image alt={p.file_path} src={getImage(p.file_path)}></Image>
            ))
            .slice(0, 4)}
        </SimpleGrid>
      </CardBody>
    </Card>
  );
};

export default PersonProfileGrid;
