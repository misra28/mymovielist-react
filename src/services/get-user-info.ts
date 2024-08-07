import axios from "axios";
import getDjangoEndpoint from "../django-endpoint";
import { User } from "../entities/User";
import useCredentialsQueryStore from "../credentialsStore";

const getUserInfo = async () => {
  const accessToken = localStorage.getItem("access_token")!;
  const setUsername = useCredentialsQueryStore(s => s.setUsername);
  const setUserId = useCredentialsQueryStore(s => s.setUserId);

  const instance = axios.create({
    baseURL: getDjangoEndpoint(),
    headers: {
      accept: "application/json",
      Authorization: `JWT ${accessToken}`,
    },
  });

  let user: User;
  try {
    user = await instance
      .get<User>("auth/users/me", { params: { format: "json" } })
      .then((res) => res.data);
      setUsername(user.username);
      setUserId(user.id);
      return user;
  } catch (e) {
    return null;
  }
}

export default getUserInfo;