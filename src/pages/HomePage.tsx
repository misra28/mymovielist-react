import { Box, Flex, Grid, GridItem, Show, SimpleGrid } from "@chakra-ui/react";
import MovieGrid from "../components/MovieGrid";
import MovieFilter from "../components/MovieFilter";
import MovieHeader from "../components/MovieHeader";

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
            <MovieFilter />
          </GridItem>
        </Show>
        <GridItem area="main">
          <Box paddingLeft={2}>
            <MovieHeader />
            {/* <Flex marginBottom={5}>
              <Box marginRight={5}>
                <PlatformSelector />
                <SortSelector />
              </Box>
            </Flex> */}
          </Box>
          <MovieGrid />
        </GridItem>
      </Grid>
    </>
  );
};

export default HomePage;
