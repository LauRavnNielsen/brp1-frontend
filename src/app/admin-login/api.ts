import axios from 'axios';

export const LoginCall = (username: string, password: string) => {
  return axios.post(`http://localhost:8080/adminLogin`, {
    adminname: username,
    password,
  });
};
