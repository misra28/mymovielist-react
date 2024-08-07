import React, { useState } from "react";
import authService from "../services/auth-service";
import { Box, Button, Heading, Input, InputGroup } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const UserLoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await authService.login(username, password);
      navigate(`list`);
    } catch (error) {
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <Box alignItems={"center"} height={"40vw"}>
      <Heading marginBottom={"2vw"}>Log In</Heading>
      <form onSubmit={handleLogin}>
        <InputGroup width={"53vw"} marginBottom={"1vw"}>
          <Input
            borderRadius={20}
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
        </InputGroup>
        <InputGroup width={"53vw"} marginBottom={"1vw"}>
          <Input
            borderRadius={20}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </InputGroup>
        <Button type="submit">Login</Button>
      </form>
    </Box>
  );
};

export default UserLoginPage;

// import {
//   Box,
//   Button,
//   Heading,
//   Input,
//   InputGroup
// } from "@chakra-ui/react";
// import axios from "axios";
// import React, { useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import useCredentialsQueryStore from "../credentialsStore";
// import getDjangoEndpoint from "../django-endpoint";
// import { User } from "../entities/User";
// import {
//   FetchLoginTokenResponse,
// } from "../services/django-api-client";

// const UserLogin = () => {
//   const navigate = useNavigate();
//   const ref = useRef<HTMLInputElement>(null);
//   const ref2 = useRef<HTMLInputElement>(null);
//   const setAccessToken = useCredentialsQueryStore((s) => s.setAccessToken);
//   const setUserId = useCredentialsQueryStore((s) => s.setUserId);

//   const submitLogin = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     const user = {
//       username: ref.current?.value,
//       password: ref2.current?.value,
//     } as User;
//     console.log("Trying to log in with: ", user);
//     let tokens: FetchLoginTokenResponse;
//     try {
//       tokens = await axios
//         .post<FetchLoginTokenResponse>(
//           `${getDjangoEndpoint()}auth/jwt/create/`,
//           user,
//           { params: { format: "json" } }
//         )
//         .then((res) => res.data);

//       setAccessToken(tokens.access);
//       console.log(`Works! Token is ${tokens.access}`);
//       navigate("/user/list");
//     } catch (e) {
//       console.log("Failed to log in with your credentials!", e);
//       setUserId();
//       setAccessToken();
//     }
//   };

//   return (
// <Box alignItems={"center"} height={"40vw"}>
//   <Heading marginBottom={"2vw"}>Log In</Heading>
//   <form onSubmit={submitLogin}>
//     <InputGroup width={"53vw"} marginBottom={"1vw"}>
//       <Input
//         ref={ref}
//         borderRadius={20}
//         placeholder={`Username`}
//         variant="filled"
//       />
//     </InputGroup>
//     <InputGroup width={"53vw"} marginRight={"1vw"}>
//       <Input
//         ref={ref2}
//         type="password"
//         borderRadius={20}
//         placeholder={`Password`}
//         variant="filled"
//       />
//     </InputGroup>
//     <Button marginTop={"1vw"} marginRight={2} type="submit">
//       Submit
//     </Button>
//   </form>
// </Box>
//   );
// };

// export default UserLogin;
