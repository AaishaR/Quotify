import React, { useState } from 'react'
import { submitQuote } from '../apiServices/apiService';

export default function AddQuote() {
    const [quote, setQuote] = useState('');
    const [input, setInput] = useState('');

    const handleSubmit = async () => {
        try {
            console.log(input)
            const response = await submitQuote({ input });
            setQuote(input);
        } catch (error) {
            console.error('Error submitting quote:', error);
        }
    };
    return (
        <div className="p-8 bg-gray-100 max-w-md mx-auto rounded shadow-md">
          <h1 className="text-4xl font-bold mb-6 text-center text-blue-600">Serverless React App</h1>
          <p className="text-center mb-4">{quote}</p>
          <div className="flex items-center space-x-4 mb-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded-l focus:outline-none focus:ring focus:border-blue-300"
            />
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded-r"
            >
              Submit
            </button>
          </div>
        </div>
      );
}
