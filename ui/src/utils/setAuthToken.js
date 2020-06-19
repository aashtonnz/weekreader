import { axios } from "./requests";

export default () => {
  const token = localStorage.token;

  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
  }
};
