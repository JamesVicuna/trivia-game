import axios from "axios";

const API_URL =
  "https://opentdb.com/api.php";

export const api = axios.create({
  baseURL: API_URL,
});
