import axios from "axios";

const customAxios = axios.create({
  baseURL:
    import.meta.env.VITE_ENV == "development"
      ? "http://localhost:3002/api"
      : "https://socialsync1.production-server.tech/api",
  withCredentials: true,
});

export default customAxios;
