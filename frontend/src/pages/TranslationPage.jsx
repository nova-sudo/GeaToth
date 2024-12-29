import React, { useState } from "react";
import axios from "axios";
import Select from "react-select";

const TranslationPage = () => {
    const [sourceText, setSourceText] = useState('');
    const [translatedText, setTranslatedText] = useState('');
    const [language, setLanguage] = useState('en2ar'); // Default translation direction
  
    const handleTranslate = async () => {
      try {
        const apiUrl = language === 'en2ar' ? 'http://localhost:8002/translate/en2ar' : 'http://localhost:8001/translate/ar2en';
        const response = await axios.post(apiUrl, { text: sourceText });
        setTranslatedText(response.data.translated_text);
      } catch (error) {
        console.error('Translation error', error);
        setTranslatedText('Error during translation');
      }
    };
  
    return (
      <div className="flex justify-center font-pixel font-semibold items-center h-screen bg-gray-100">
        <div className="w-full max-w-2xl p-6 bg-white rounded-3xl ring-1 ring-gray-400  shadow-md">
          <h1 className="text-6xl  text-center font-bold ">Translation App</h1>
          <hr className="my-5 font-bold w-full mb-10 bg-gray-400 h-[2px]" />
  
          <div className="mb-4 flex justify-between">
            <button
              className={`px-4 rounded-full py-2 ${language === 'en2ar' ? 'bg-blue-300 ring-2 ring-blue-700 text-blue-900' : 'bg-gray-200 ring-1 ring-gray-600 text-gray-900'}`}
              onClick={() => setLanguage('en2ar')}
              data-testid="en2arButton"
            >
              English to Arabic
            </button>
            <button
              className={`px-4 py-2 rounded-full ${language === 'ar2en' ? 'bg-blue-300 ring-2 ring-blue-700 text-blue-900' : 'bg-gray-200 ring-1 ring-gray-600 text-gray-900'}`}
              onClick={() => setLanguage('ar2en')}
              data-testid="ar2enButton"
            >
              Arabic to English
            </button>
          </div>
   
   
          <textarea
            className="w-full p-4 mb-4 border border-gray-300 rounded-3xl"
            rows="6"
            placeholder="Enter text to translate"
            value={sourceText}
            onChange={(e) => setSourceText(e.target.value)}
            data-testid="source"
          />
  
          <button
            onClick={handleTranslate}
            className="w-full bg-red-200 ring-2 ring-red-600 rounded-full text-red-900 py-2 hover:bg-red-300 transition-colors"
            data-testid="button"
          >
            Translate
          </button>
  
          <textarea
            className="w-full p-4 mt-4 border border-gray-300 rounded-3xl"
            rows="6"
            placeholder="Translated text"
            value={translatedText}
            readOnly
            data-testid="translated"
          />
        </div>
      </div>
    );
  }

export default TranslationPage;
