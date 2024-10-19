import axios from "axios";

const api = axios.create({
  baseURL: "https://api.example.com", // Replace with your API base URL
});

export const fetchData = async () => {
  const response = await api.get("/data");
  return response.data;
};

export default api;
