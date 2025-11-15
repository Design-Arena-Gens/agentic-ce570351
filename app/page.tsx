'use client';

import { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [story, setStory] = useState('');
  const [error, setError] = useState('');

  const generateVideo = async () => {
    if (!prompt.trim()) {
      setError('Please enter a story prompt');
      return;
    }

    setLoading(true);
    setError('');
    setVideoUrl('');
    setAudioUrl('');
    setStory('');

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate video');
      }

      const data = await response.json();
      setStory(data.story);
      setAudioUrl(data.audioUrl);
      setVideoUrl(data.videoUrl);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>🎃 AI Horror Story Video Generator</h1>
        <p>Generate chilling horror stories with deep voice narration and atmospheric effects</p>
      </div>

      <div className="input-section">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your horror story prompt (e.g., 'A haunted house in the woods', 'Something lurking in the basement')"
          disabled={loading}
        />
        <button onClick={generateVideo} disabled={loading}>
          {loading ? '🎬 Generating Horror...' : '🎬 Generate Video'}
        </button>
      </div>

      {error && (
        <div className="error">
          ⚠️ {error}
        </div>
      )}

      {loading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Crafting your nightmare... This may take 30-60 seconds</p>
        </div>
      )}

      {story && (
        <div className="result">
          <h2>📖 Your Horror Story</h2>
          <div className="story-text">{story}</div>
        </div>
      )}

      {audioUrl && (
        <div className="result">
          <h2>🎙️ Deep Voice Narration</h2>
          <audio controls src={audioUrl} />
        </div>
      )}

      {videoUrl && (
        <div className="result">
          <h2>🎬 Horror Video</h2>
          <video controls src={videoUrl} />
          <a href={videoUrl} download="horror-story.mp4">
            <button>⬇️ Download Video</button>
          </a>
        </div>
      )}

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 20px;
          background: linear-gradient(180deg, #0a0a0a 0%, #1a0a0a 50%, #0a0a0a 100%);
          color: #fff;
          font-family: 'Georgia', serif;
        }

        .header {
          text-align: center;
          margin-bottom: 40px;
          padding: 40px 20px;
          background: rgba(255, 0, 0, 0.05);
          border-radius: 10px;
          border: 2px solid rgba(139, 0, 0, 0.3);
          box-shadow: 0 0 30px rgba(139, 0, 0, 0.2);
        }

        h1 {
          font-size: 3em;
          margin: 0;
          color: #ff4444;
          text-shadow: 0 0 10px rgba(255, 68, 68, 0.5);
        }

        .header p {
          font-size: 1.2em;
          color: #ccc;
          margin-top: 10px;
        }

        .input-section {
          max-width: 800px;
          margin: 0 auto 40px;
          padding: 30px;
          background: rgba(20, 20, 20, 0.8);
          border-radius: 10px;
          border: 1px solid rgba(139, 0, 0, 0.3);
        }

        textarea {
          width: 100%;
          min-height: 120px;
          padding: 15px;
          font-size: 1.1em;
          border: 2px solid rgba(139, 0, 0, 0.5);
          border-radius: 5px;
          background: #1a1a1a;
          color: #fff;
          font-family: 'Georgia', serif;
          resize: vertical;
          margin-bottom: 20px;
        }

        textarea:focus {
          outline: none;
          border-color: #ff4444;
          box-shadow: 0 0 10px rgba(255, 68, 68, 0.3);
        }

        button {
          width: 100%;
          padding: 15px 30px;
          font-size: 1.2em;
          font-weight: bold;
          background: linear-gradient(135deg, #8b0000 0%, #ff4444 100%);
          color: #fff;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: all 0.3s;
        }

        button:hover:not(:disabled) {
          transform: scale(1.02);
          box-shadow: 0 0 20px rgba(255, 68, 68, 0.5);
        }

        button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .error {
          max-width: 800px;
          margin: 20px auto;
          padding: 20px;
          background: rgba(139, 0, 0, 0.2);
          border: 2px solid #ff4444;
          border-radius: 5px;
          text-align: center;
          font-size: 1.1em;
        }

        .loading {
          max-width: 800px;
          margin: 40px auto;
          text-align: center;
          padding: 40px;
        }

        .spinner {
          width: 60px;
          height: 60px;
          border: 5px solid rgba(139, 0, 0, 0.3);
          border-top-color: #ff4444;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 20px;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .result {
          max-width: 800px;
          margin: 30px auto;
          padding: 30px;
          background: rgba(20, 20, 20, 0.8);
          border-radius: 10px;
          border: 1px solid rgba(139, 0, 0, 0.3);
        }

        .result h2 {
          color: #ff4444;
          margin-top: 0;
          margin-bottom: 20px;
          font-size: 1.8em;
        }

        .story-text {
          line-height: 1.8;
          font-size: 1.1em;
          color: #ddd;
          padding: 20px;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 5px;
          border-left: 4px solid #8b0000;
        }

        audio, video {
          width: 100%;
          margin-bottom: 20px;
          border-radius: 5px;
          background: #000;
        }

        a {
          text-decoration: none;
        }

        @media (max-width: 768px) {
          h1 {
            font-size: 2em;
          }

          .header p {
            font-size: 1em;
          }
        }
      `}</style>
    </div>
  );
}
