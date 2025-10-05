'use client'
import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import axios from "axios";

type Result = {
  trackId?: number;      
  artistId?: number;
  trackName?: string;
  artistName?: string;
  previewUrl?: string;
  wrapperType?: string;   
  kind?: string;
};

type IntroSearchProps = {
  searchParams?: { term?: string };
};

export default function IntroSearch({ searchParams }: IntroSearchProps) {
  const [searchTerm, setSearchTerm] = useState(searchParams?.term || "asake"); 
  const [query, setQuery] = useState(searchParams?.term || "asake"); 
  const [results, setResults] = useState<Result[]>([]);

  useEffect(() => {
    if (!query) return;

    const fetchResults = async () => {
      try {
        
        const url = `https://itunes.apple.com/search?term=${encodeURIComponent(
          query
        )}&entity=musicTrack,musicArtist&limit=4`;

        const response = await axios.get(
          `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`
        );

        const data = JSON.parse(response.data.contents);
        setResults(data.results || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        setResults([]);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div>
      <div className="bg-hero mx-auto h-screen">
        <div className="space-y-6">
         
          <div className="flex justify-center mt-10">
            <div className="flex w-1/2 md:w-full max-w-lg">
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
            {results.length === 0 && (
              <li className="text-white text-center mt-4">No results found</li>
            )}
            {results.map((item) => {
              const isArtist =
                item.wrapperType === "artist" ||
                (!item.trackName && item.artistName);

              return (
                <li
                  key={item.trackId || item.artistId}
                  className="border-b pb-3 flex flex-col md:flex-row md:items-center md:justify-between"
                >
                  <div>
                    {isArtist ? (
                      <>
                        <div className="font-bold text-pink-400">Artist</div>
                        <div className="text-white font-bold">
                          {item.artistName || "Unknown Artist"}
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="font-bold text-white">
                          {item.trackName || "Untitled Track"}
                        </div>
                        <div className="text-sm font-bold text-white">
                          {item.artistName || "Unknown Artist"}
                        </div>
                      </>
                    )}
                  </div>
                  {!isArtist && item.previewUrl && (
                    <audio
                      controls
                      src={item.previewUrl}
                      className="mt-2 w-full md:w-48"
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
