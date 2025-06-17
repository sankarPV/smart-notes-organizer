
import React, { useState } from 'react';
import axios from 'axios';

function SmartNotesApp() {
  const [note, setNote] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('/organize', { note });
      setResponse(res.data.output);
    } catch (error) {
      console.error('Error:', error);
      setResponse('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📝 Smart Notes Organizer</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full p-2 border rounded mb-4"
          rows="6"
          placeholder="Paste your messy notes here..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Organize Note'}
        </button>
      </form>
      {response && (
        <div className="mt-6 p-4 border rounded bg-gray-50 whitespace-pre-wrap">
          <strong>Organized Output:</strong>
          <div>{response}</div>
        </div>
      )}
    </div>
  );
}

export default SmartNotesApp;
