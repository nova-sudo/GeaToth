import * as React from 'react';
import { Link } from 'react-router-dom'; 


export default function Home() {
   return (
    <div className="h-screen w-full flex items-center justify-center ">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
      {/* Card for Translate */}
      <div
        className="cursor-pointer ring-2 ring-inset ring-gray-400 text-gray-400 hover:ring-black hover:text-black w-full bg-white shadow-md rounded-lg p-6 text-center hover:shadow-lg transition-shadow"
        onClick={() => (window.location.href = '/translate')}
      >
        <h2 className="text-9xl font-semibold mb-2 font-pixel" data-testid="home">Translate</h2>
       
      </div>


      {/* Card for Summarize */}
      <div
        className="cursor-pointer ring-2 ring-inset ring-gray-400 text-gray-400 hover:ring-black hover:text-black w-full bg-white shadow-md rounded-lg p-6 text-center hover:shadow-lg transition-shadow"
        onClick={() => (window.location.href = '/summarize')}
      >
        <h2 className="text-9xl font-semibold mb-2 font-pixel">Summarize</h2>
       
      </div>
    </div>
  </div>
       );
}