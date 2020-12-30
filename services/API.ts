import axios from "axios";

const api = axios.create({
  baseURL: "https://alescore.waiifu.tech",
});

export default api;
