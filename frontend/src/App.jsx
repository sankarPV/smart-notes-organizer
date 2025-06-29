import React, { useState, useEffect } from 'react';
import SplashScreen from './components/SplashScreen';

import axios from 'axios';

export default function SmartNotesApp() {
  const [note, setNote] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [audioFile, setAudioFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse('');

    try {
      // If audio file is present, call /transcribe
      if (audioFile) {
        const formData = new FormData();
        formData.append('audio', audioFile);

        const res = await axios.post('http://localhost:5001/transcribe', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setResponse(res.data.output);
      } else {
        // Else, organize text notes
        const res = await axios.post('http://localhost:5001/organize', { note }, {
          headers: { 'Content-Type': 'application/json' },
        });
        setResponse(res.data.output);
      }
    } catch (error) {
      console.error('Error:', error);
      setResponse('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const [showSplash, setShowSplash] = useState(true);
  const [hideSplash, setHideSplash] = useState(false);
  
  useEffect(() => {
    const fade = setTimeout(() => setHideSplash(true), 2000); // Start fade
    const remove = setTimeout(() => setShowSplash(false), 3000); // Remove completely
    return () => {
      clearTimeout(fade);
      clearTimeout(remove);
    };
  }, []);
  

  return (
    <>
      {showSplash && <SplashScreen isVisible={!hideSplash} />}

  
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <img
            src="/logo/notewhiz-logo.png"
            alt="NoteWhiz Logo"
            className="w-16 h-16 mx-auto mb-4"
          />
          <h1 className="text-3xl font-bold mb-6 text-center">NoteWhiz</h1>
  
          <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
            <textarea
              className="w-full p-4 border border-gray-700 rounded bg-gray-800 text-white resize-none"
              rows="6"
              placeholder="Paste your messy notes here (or leave empty if uploading audio)..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
  
            <label className="w-full flex items-center justify-center px-4 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded cursor-pointer transition duration-200">
              🎵 Choose Audio File
              <input
                type="file"
                accept="audio/*"
                onChange={(e) => setAudioFile(e.target.files[0])}
                className="hidden"
              />
            </label>
  
            {audioFile && (
              <p className="text-sm text-green-400 mt-2">Selected: {audioFile.name}</p>
            )}
  
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Organize Note or Audio'}
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
    </>
  );  
}
