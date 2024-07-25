import { Button, Heading, HStack, Image } from "@chakra-ui/react";
import ColorModeSwitch from "./ColorModeSwitch";
import { Link } from "react-router-dom";
import SearchInput from "./SearchInput";
import tmdb from "../assets/tmdb.svg";

const NavBar = () => {
  return (
    <HStack padding="10px" width={"100vw"}>
      <Link to="/movies">
        <Image src={tmdb} width="60px" objectFit={"cover"} />
      </Link>
      <Heading padding="10px">MyMovieList</Heading>
      <SearchInput />
      <ColorModeSwitch />
    </HStack>
  );
};

export default NavBar;
