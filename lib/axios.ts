import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://192.168.101.2:3000/api/happy-paws"
      : "/api",
  withCredentials: true,
});
