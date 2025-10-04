'use client'
import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import axios from "axios";

type Track = {
  trackId: number;
  trackName: string;
  artistName: string;
  previewUrl: string;
};

type IntroSearchProps = {
  searchParams?: { term?: string };
};

export default function IntroSearch({ searchParams }: IntroSearchProps) {
  const [searchTerm, setSearchTerm] = useState(searchParams?.term || "asake"); 
  const [query, setQuery] = useState(searchParams?.term || "asake"); 
  const [results, setResults] = useState<Track[]>([]);

  useEffect(() => {
    if (!query) return;

    const fetchTracks = async () => {
      try {
        const response = await axios.get(
          `https://corsproxy.io/?https://itunes.apple.com/search?term=${encodeURIComponent(
            query
          )}&media=music&limit=5`
        );
        setResults(response.data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchTracks();
  }, [query]);

  return (
    <div>
      <div className="bg-hero mx-auto h-screen">
        <div className="space-y-6">
    
          <div className="flex justify-center mt-10">
            <div className="flex w-full max-w-lg">
              <input
                type="search"
                placeholder="Enter song title or artist"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 text-white font-extrabold rounded-l-lg border border-gray-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-pink-500"
              />
              <button
                onClick={() => setQuery(searchTerm)}
                className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-r-lg flex items-center justify-center"
              >
                <Search size={18} />
              </button>
            </div>
          </div>

          
          <ul className="space-y-4 lg:w-dvh mx-10 md:mx-auto">
            {results.map((track) => (
              <li
                key={track.trackId}
                className="border-b pb-3 flex flex-col md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <div className="font-bold text-white">{track.trackName}</div>
                  <div className="text-sm font-bold text-white">{track.artistName}</div>
                </div>
                {track.previewUrl && (
                  <audio
                    controls
                    src={track.previewUrl}
                    className="mt-2 w-full md:w-48"
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
