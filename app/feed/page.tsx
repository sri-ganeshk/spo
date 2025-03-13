"use client";

import React, { useState, useEffect } from "react";
import { MusicCard, Track } from "../components/MusicCard";

const HomePage: React.FC = () => {
  const [query, setQuery] = useState("");
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPlayingId, setCurrentPlayingId] = useState<number | null>(null);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);

  // Debounce search on query change
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim() === "") {
        setTracks([]);
        return;
      }
      setLoading(true);
      setError(null);
      fetch(
        `https://deezerdevs-deezer.p.rapidapi.com/search?q=${encodeURIComponent(
          query
        )}`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
            "x-rapidapi-key": "f60962a6e1msh52d62ea696ff8d6p15f061jsn338bf6ad3c64",
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setTracks(data.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setError("Failed to fetch tracks");
          setLoading(false);
        });
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  const handlePlay = (id: number, audio: HTMLAudioElement) => {
    if (currentAudio && currentAudio !== audio) {
      currentAudio.pause();
    }
    setCurrentPlayingId(id);
    setCurrentAudio(audio);
  };

  const handleStop = (id: number, audio: HTMLAudioElement) => {
    if (currentAudio === audio) {
      setCurrentPlayingId(null);
      setCurrentAudio(null);
    }
  };

  return (
    <div className="min-h-screen bg-black px-8 pt-24 text-white">
      <div className="mb-8 flex justify-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a track or artist"
          className="border border-gray-700 rounded px-4 py-2 w-64 bg-gray-800 text-white placeholder-gray-500 focus:outline-none"
        />
      </div>
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-8 mx-auto max-w-[2000px]">
        {tracks.map((track: Track) => (
          <MusicCard
            key={track.id}
            track={track}
            isPlaying={currentPlayingId === track.id}
            onPlay={handlePlay}
            onStop={handleStop}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
