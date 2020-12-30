import axios from "axios";

const api = axios.create({
  baseURL: "https://ritsu.waiifu.tech/alescore/",
});

export default api;
