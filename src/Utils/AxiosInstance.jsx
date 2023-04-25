import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
export const setToken = () => {
  return cookies.get("access_token");
};

const BaseUrl = "http://internalhr.aiksol.com/api/";

const axiosInstance = axios.create({
  baseURL: BaseUrl,
  headers: {
    "Content-Type": "application/json",
    Authorization: setToken() || cookies.get("access_token"),
  },
});

// some way of changing it

// register a synchronous request interceptor
axiosInstance.interceptors.request.use(
  (config) => ({
    ...config,
    headers: {
      ...config.headers,
      Authorization: setToken(),
    },
  }),
  null,
  { synchronous: true }
);

export default axiosInstance;
