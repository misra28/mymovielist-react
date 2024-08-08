import React, { useState } from "react";
import authService from "../services/auth-service";
import { Box, Button, Heading, Input, InputGroup } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const UserRegisterPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegistration = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await authService.register(email, username, password);
      navigate(`/user/list`);
    } catch (error) {
      alert("Registration failed. Please make sure your details are valid.");
    }
  };

  return (
    <Box alignItems={"center"} height={"40vw"}>
      <Heading marginBottom={"2vw"}>Create a New Account</Heading>
      <form onSubmit={handleRegistration}>
        <InputGroup width={"53vw"} marginBottom={"1vw"}>
          <Input
            borderRadius={20}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </InputGroup>
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
        <Button type="submit">Register</Button>
      </form>
    </Box>
  );
};

export default UserRegisterPage;
