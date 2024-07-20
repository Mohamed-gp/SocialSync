import axios from "axios";

const ENV = "production";
const customAxios = axios.create({
  baseURL: ENV == "production" ? "" : "http://localhost:3000/api/",
  withCredentials: true,
});

export default customAxios;
