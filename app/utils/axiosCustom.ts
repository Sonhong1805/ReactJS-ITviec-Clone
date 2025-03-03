import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

if (
  typeof window !== "undefined" &&
  window &&
  window.localStorage &&
  window.localStorage.getItem("access_token")
) {
  instance.defaults.headers.common = {
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  };
}

const handleRefreshToken = async () => {
  const response = await instance.get("/auth/refresh");
  if (response && response.data) return response.data.accessToken;
  else return null;
};

instance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

const NO_RETRY_HEADER = "x-no-retry";
instance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  async function (error) {
    if (
      error.config &&
      error.response &&
      +error.response.status === 401 &&
      !error.config.headers[NO_RETRY_HEADER]
    ) {
      const accessToken = await handleRefreshToken();
      error.config.headers[NO_RETRY_HEADER] = "true";
      if (accessToken) {
        error.config.headers["Authorization"] = `Bearer ${accessToken}`;
        localStorage.setItem("access_token", accessToken);
        return instance.request(error.config);
      }
    }

    if (
      error.config &&
      error.response &&
      +error.response.status === 400 &&
      error.config.url === "/auth/refresh"
    ) {
      localStorage.removeItem("access_token");
      window.location.href = "/login";
    }
    return error?.response?.data ?? Promise.reject(error);
  }
);

export default instance;
