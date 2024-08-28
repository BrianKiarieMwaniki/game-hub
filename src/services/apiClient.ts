import axios from "axios";

export default axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: "45d01a70f8f848f7b9b8caac08282423",
  },
});

const axiosInstance = axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: "45d01a70f8f848f7b9b8caac08282423",
  },
});

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = () => {
    return axiosInstance.get<T[]>(this.endpoint).then((res) => res.data);
  };
}

