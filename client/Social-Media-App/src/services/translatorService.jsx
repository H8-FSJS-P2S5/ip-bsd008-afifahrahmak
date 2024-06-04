import axios from "axios";

const API_KEY = "14a439839cmsh4e7d39c9718f034p1859bcjsn3b97b700fccc";
const API_ENDPOINT = "https://text-translator2.p.rapidapi.com/translate";

export const translateText = async (text, targetLang) => {
  try {
    const response = await axios.post(
      API_ENDPOINT,
      { text, target_lang: targetLang },
      {
        headers: {
          "content-type": "application/json",
          "x-rapidapi-host": "text-translator2.p.rapidapi.com",
          "x-rapidapi-key": API_KEY,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error translating text:", error);
    throw error;
  }
};
