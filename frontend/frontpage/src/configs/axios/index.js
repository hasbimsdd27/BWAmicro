import axios from "axios";
import errorHandler from "./errorHandler";

const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_HOST}${process.env.NEXT_PUBLIC_API_VERSION}`,
});

instance.interceptors.response.use((response) => response, errorHandler);

export default instance;
