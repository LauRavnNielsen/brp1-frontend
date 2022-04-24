import axios from 'axios';

export const CreateAccountPost = (
  username: string,
  password: string,
  email: string
) => {
  return axios.post(`http://localhost:8080/register`, {
    username,
    password,
    email,
  });
};
