import axios from "./axios";

export const generateResponse = async (message) => {
  try {
    const response = await axios.post("/chat", { message });
    return response.data;
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw new Error("Failed to generate response");
  }
};
