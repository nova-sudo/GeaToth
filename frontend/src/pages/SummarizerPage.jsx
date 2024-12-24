import React, { useState } from "react";
import axios from "axios";

const SummarizerPage = () => {
  const [inputText, setInputText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSummarize = async () => {
    setLoading(true);
    setError("");
    setSummary("");

    try {
      const response = await axios.post("http://localhost:8003/summarize", {
        text: inputText,
      });
      setSummary(response.data.summary);
    } catch (err) {
      setError("An error occurred while summarizing the text.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center font-pixel min-h-screen bg-gray-100">
      <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-6xl font-bold text-center text-gray-800">
          Summarizer
        </h1>
        <textarea
          className="w-full text-lg font-semibold p-3 mt-4 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
          rows="6"
          placeholder="Enter text to summarize..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button
          onClick={handleSummarize}
          disabled={loading || !inputText.trim()}
          className={`w-full px-4 py-2 mt-4 text-white rounded-lg ${
            loading || !inputText.trim()
              ? "bg-gray-200 ring-2 ring-gray-600 font-bold text-lg text-gray-900 cursor-not-allowed"
              : "bg-red-200 ring-2 ring-red-600 font-bold text-lg text-red-900 hover:bg-red-600 hover:text-red-100"
          }`}
        >
          {loading ? "Summarizing..." : "Summarize"}
        </button>
        {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
        {summary && (
          <div className="p-4 mt-6 bg-gray-100 border rounded-lg">
            <h2 className="text-lg font-semibold text-gray-800">Summary:</h2>
            <p className="mt-2 text-gray-700">{summary}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SummarizerPage;
