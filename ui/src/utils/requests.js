import defaultAxios from "axios";

const TIMEOUT_MS = 20000;

export const axios = defaultAxios.create({
  baseURL: "/api/",
  timeout: TIMEOUT_MS,
  headers: { "Content-Type": "application/json" }
});

export const reqErrorMsg = error => {
  if (!error.response) {
    return `${error.name}: ${error.message}`;
  }
  if (!error.response.data) {
    return `${error.response.status}: ${error.response.statusText}`;
  }
  return error.response.data.error;
};
