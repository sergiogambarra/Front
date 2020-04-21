import axios from 'axios';
export const TOKEN_KEY = "TOKEN";

export const isAuthenticated = () => sessionStorage.getItem(TOKEN_KEY) !== null;

export const getToken = () => sessionStorage.getItem(TOKEN_KEY);

export const login = token => {
  axios.defaults.headers.common['Authorization'] = `${token.tipo} ${token.token}`;
  sessionStorage.setItem(TOKEN_KEY,`${token.tipo} ${token.token}`);
  sessionStorage.setItem("ID",`${token.id}`);
  console.log(token);
};

export const logout = () => {
  sessionStorage.removeItem(TOKEN_KEY);
};