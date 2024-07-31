import {
  Box,
  Card,
  CardBody,
  Flex,
  Grid,
  GridItem,
  Show,
  SimpleGrid,
} from "@chakra-ui/react";
import HomePageGrid from "../components/HomePageGrid";
import MovieFilter from "../components/MovieFilter";
import HomePageHeader from "../components/HomePageHeader";
import GenreList from "../components/GenreList";

const HomePage = () => {
  return (
    <>
      <Grid
        templateAreas={{ base: `"main"`, lg: `"aside main"` }}
        templateColumns={{
          base: "1fr",
          lg: "225px 1fr",
        }}
      >
        <Show above="lg">
          <GridItem area="aside" paddingX={5}>
            <Card>
              <CardBody>
                <MovieFilter />
                <GenreList />
              </CardBody>
            </Card>
          </GridItem>
        </Show>
        <GridItem area="main">
          <Card>
            <CardBody>
              <Box paddingLeft={2}>
                <HomePageHeader />
                {/* <Flex marginBottom={5}>
              <Box marginRight={5}>
              <PlatformSelector />
              <SortSelector />
              </Box>
              </Flex> */}
              </Box>
              <HomePageGrid />
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    </>
  );
};

export default HomePage;
