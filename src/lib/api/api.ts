import axios from "axios";

const api = axios.create({
  baseURL: "https://car-rental-api.goit.study",
});

export default api;