import axios from "axios";
import { user_base_url } from "./base_url";

const githubAccessToken = import.meta.env.VITE_GITHUB_ACCESS_TOKEN;

const axiosInstance = axios.create({
  baseURL: user_base_url,
  headers: { Authorization: `token ${githubAccessToken}` },
});

export default axiosInstance;
