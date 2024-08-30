import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { FetchResponse, GameQuery } from "../common.types";



class APIClient<T> {
  endpoint: string;
  gameQuery?: GameQuery;
  axiosInstance:AxiosInstance;

  constructor(endpoint: string, gameQuery?:GameQuery) {
    this.endpoint = endpoint;
    this.gameQuery = gameQuery;

    this.axiosInstance = axios.create({
      baseURL: "https://api.rawg.io/api",
      params: {
        key: "45d01a70f8f848f7b9b8caac08282423",
      },
    });
  }

  getAll = (config?: AxiosRequestConfig) => {
    return this.axiosInstance.get<FetchResponse<T>>(this.endpoint, config).then((res) => res.data);
  };
}

export default APIClient;
