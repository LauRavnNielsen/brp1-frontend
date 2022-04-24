import axios from 'axios';

export const CreateAccountPost = (
  username: string,
  password: string,
  email: string
) => {
  return axios.post(`http://localhost:8080/updateUserInfo`, {
    username,
    password,
    email,
  });
};

export const DeleteAccountPost = (username: string, password: string) => {
  return axios.post(`http://localhost:8080/deleteLogin`, {
    username,
    password,
  });
};
