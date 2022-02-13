import axios from 'axios';
import { BASE_URL } from "./constants";

const axiosInstance = axios.create();
axiosInstance.defaults.baseURL=BASE_URL;
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
  );

export default axiosInstance;