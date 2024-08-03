import axios from "axios";

const ENV: string = "developement";
const customAxios = axios.create({
  baseURL:
    ENV == "production"
      ? "https://socialsync-qw94.onrender.com/api/"
      : "http://localhost:3000/api/",
  withCredentials: true,
});

export default customAxios;
