import { Button, Heading, HStack, Image } from "@chakra-ui/react";
import ColorModeSwitch from "./ColorModeSwitch";
import { Link } from "react-router-dom";
import SearchInput from "./SearchInput";
import tmdb from "../assets/tmdb.svg";
import useCredentialsQueryStore from "../credentialsStore";

const NavBar = () => {
  const username = useCredentialsQueryStore((s) => s.credentialsQuery.username);
  return (
    <HStack padding="10px" width={"100vw"}>
      <Link to="/movies">
        <Image src={tmdb} width="60px" objectFit={"cover"} />
      </Link>
      <Heading padding="10px">MyMovieList</Heading>
      <SearchInput />
      <Link to="user">
        <Heading fontSize={"1rem"}>
          {username ? `Logged in as ${username}` : `Log In`}
        </Heading>
      </Link>
      {/* <ColorModeSwitch /> */}
    </HStack>
  );
};

export default NavBar;
