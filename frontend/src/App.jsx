import React, { useState } from 'react';
import axios from 'axios';

export default function SmartNotesApp() {
  const [note, setNote] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/organize', { note }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setResponse(res.data.output);
    } catch (error) {
      console.error('Error:', error);
      setResponse('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center">📝 Smart Notes Organizer</h1>
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <textarea
            className="w-full p-4 border border-gray-700 rounded mb-4 bg-gray-800 text-white resize-none"
            rows="6"
            placeholder="Paste your messy notes here..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Organize Note'}
          </button>
        </form>
        {response && (
          <div className="mt-6 p-4 border border-gray-700 rounded bg-gray-800 whitespace-pre-wrap">
            <strong className="block mb-2 text-lg">Organized Output:</strong>
            <div>{response}</div>
          </div>
        )}
      </div>
    </div>
  );
}
