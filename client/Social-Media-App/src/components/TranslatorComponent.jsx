import { useState } from "react";
import axios from "axios";

const TranslatorComponent = () => {
  const [text, setText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [targetLang, setTargetLang] = useState("id");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTranslate = async () => {
    setIsLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("text", text);
    formData.append("target_language", targetLang);

    try {
      const response = await axios.post(
        "https://text-translator2.p.rapidapi.com/translate",
        formData,
        {
          headers: {
            "content-type": "multipart/form-data",
            "x-rapidapi-host": "text-translator2.p.rapidapi.com",
            "x-rapidapi-key":
              "14a439839cmsh4e7d39c9718f034p1859bcjsn3b97b700fccc",
          },
        }
      );
      setTranslatedText(response.data.data.translatedText);
    } catch (error) {
      setError("Failed to translate text");
      console.error(
        "Translation error:",
        error.response ? error.response.data : error
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
        Translator
      </h1>
      <div className="flex flex-wrap md:flex-nowrap gap-6 justify-center">
        <div className="flex-1 bg-white shadow-lg rounded-lg p-6">
          <label className="block mb-4 text-lg font-medium">
            Text to translate:
            <textarea
              name="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full h-40 p-4 border border-gray-300 rounded mt-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition ease-in-out"
              placeholder="Type here..."
            ></textarea>
          </label>
          <label className="block mb-6 text-lg font-medium">
            Target language:
            <select
              name="targetLang"
              value={targetLang}
              onChange={(e) => setTargetLang(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none transition ease-in-out"
            >
              {/* Language options */}
              <option value="id">Indonesian</option>
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="it">Italian</option>
              <option value="ru">Russia</option>
            </select>
          </label>
          <button
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded transition duration-300 ease-in-out ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleTranslate}
            disabled={isLoading}
          >
            Translate
          </button>
        </div>
        <div className="flex-1 bg-white shadow-lg rounded-lg p-6 mt-6 md:mt-0">
          <label className="block mb-4 text-lg font-medium">
            Translated text:
            <textarea
              name="translatedText"
              value={translatedText}
              readOnly
              className="w-full h-40 p-4 border border-gray-300 rounded mt-2 focus:outline-none"
              placeholder="Translation appears here..."
            ></textarea>
          </label>
        </div>
      </div>
      {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
    </div>
  );
};

export default TranslatorComponent;
