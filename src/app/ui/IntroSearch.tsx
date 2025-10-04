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
  const [searchTerm, setSearchTerm] = useState(searchParams?.term || "");
  const [results, setResults] = useState<Track[]>([]);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!searchTerm) return;

    const fetchTracks = async () => {
      try {
        // Always use proxy to avoid CORS issues (especially on mobile)
        const response = await axios.get(
          `https://corsproxy.io/?https://itunes.apple.com/search?term=${encodeURIComponent(
            searchTerm
          )}&media=music&limit=3`
        );
        setResults(response.data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchTracks();
  }, [searchTerm]);

  return (
    <div>
      <div className="bg-hero mx-auto h-screen">
        <div className="space-y-6">
          {/* Search Bar */}
          <div className="flex justify-center">
            <div className="relative lg:w-dvh mt-10">
              <input
                type="search"
                placeholder="Enter song title or artist"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full text-white font-extrabold rounded-lg border border-gray-300 bg-transparent px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-pink-500"
              />
              <button
                onClick={() => setSearchTerm(searchTerm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                <Search size={18} />
              </button>
            </div>
          </div>

          {/* Search Results */}
          <ul className="space-y-4 lg:w-dvh mx-10 md:mx-auto">
            {results.map((track) => (
              <li key={track.trackId} className="border-b pb-3">
                <div className="font-bold text-white">{track.trackName}</div>
                <div className="text-sm font-bold text-white">{track.artistName}</div>
                {track.previewUrl && (
                  <audio
                    controls
                    src={track.previewUrl}
                    className="mt-2 w-full"
                    onPlay={(e) => {
                      if (currentAudio && currentAudio !== e.currentTarget) {
                        currentAudio.pause();
                      }
                      setCurrentAudio(e.currentTarget);
                    }}
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
