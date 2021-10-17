import url from "../settings";
import axios from "axios";

export const getUsers = async () => {
  const users = await axios.get(`${url}/users`)
    .then(x => x.data);
  
  return users;
};

export const getUsersById = async (id: string) => {
  const usersById = await axios.get(`${url}/users/${id}`)
    .then(x => x.data);
  
  return usersById;
};
