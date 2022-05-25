import axios from 'axios';

export const DeleteUserWithAdmin = (username: string) => {
  return axios.delete(`http://localhost:8080/deleteLoginAdmin`, {
    params: { username },
  });
};

export const GetAllUsers = () => {
  return axios.get(`http://localhost:8080/getListAllUsers`);
};
