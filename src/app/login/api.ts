import axios from 'axios';

export const LoginCall = (username: string, password: string) => {
  return axios.post(`http://localhost:8080/login`, {
    username,
    password,
  });
};
