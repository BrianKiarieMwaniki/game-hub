import axios from "axios";

export default axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: "45d01a70f8f848f7b9b8caac08282423",
  },
});
