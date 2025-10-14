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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query) return;

    const fetchResults = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await axios.get(`/api/search?term=${encodeURIComponent(query)}`);
        setResults(response.data.results || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch search results. Please try again.");
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="bg-hero mx-auto min-h-screen relative overflow-hidden">
     
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        <div className="relative z-10 space-y-8 pt-20 px-4">
         
          <div className="text-center space-y-4">
            <h1 
              className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 animate-gradient-shift bg-200"
              style={{
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundSize: '200% 200%'
              }}
            >
              TuneScape
            </h1>
            <p className="text-lg md:text-xl text-white/80 font-medium">
              Discover your next favorite song
            </p>
          </div>
         
          <div className="flex justify-center">
            <div className="relative w-full max-w-2xl">
              <div className="flex backdrop-blur-lg bg-white/10 rounded-2xl border border-white/20 shadow-2xl overflow-hidden hover:shadow-pink-500/20 transition-all duration-300" style={{
                WebkitBackdropFilter: 'blur(16px)',
                backdropFilter: 'blur(16px)'
              }}>
                <input
                  type="search"
                  placeholder="Search for songs, artists, albums..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && setQuery(searchTerm)}
                  className="flex-1 text-white placeholder-white/60 font-medium bg-transparent px-6 py-4 text-lg focus:outline-none"
                />
                <button
                  onClick={() => setQuery(searchTerm)}
                  disabled={loading}
                  className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/25 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                  ) : (
                    <Search size={24} />
                  )}
                </button>
              </div>
              
              <div className="absolute -bottom-8 left-0 right-0 text-center">
                <p className="text-sm text-white/50">Press Enter to search or click the search button</p>
              </div>
            </div>
          </div>

      
          <div className="max-w-4xl mx-auto px-4 pb-20">
            {loading && (
              <div className="flex flex-col items-center justify-center py-16 space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-pink-500 border-t-transparent"></div>
                <p className="text-white/80 text-lg font-medium">Discovering music...</p>
              </div>
            )}
            
            {error && (
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500/20 rounded-full mb-4">
                  <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <p className="text-red-400 text-lg font-semibold">{error}</p>
                <p className="text-white/60 mt-2">Please check your connection and try again</p>
              </div>
            )}
            
            {!loading && !error && results.length === 0 && query && (
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-500/20 rounded-full mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.291-1.075-5.657-2.757M20.485 20.485l-1.414-1.414A8.967 8.967 0 0112 21C6.477 21 2 16.523 2 12S6.477 3 12 3s10 4.477 10 9c0 2.136-.746 4.1-1.99 5.657l1.414 1.414z" />
                  </svg>
                </div>
                <p className="text-white/80 text-lg font-semibold">No results found</p>
                <p className="text-white/60 mt-2">Try searching with different keywords</p>
              </div>
            )}

            <div className="grid gap-4 md:gap-6">
              {results.map((item, index) => {
                const isArtist =
                  item.wrapperType === "artist" ||
                  (!item.trackName && item.artistName);

                return (
                  <div
                    key={item.trackId || item.artistId}
                    className="backdrop-blur-lg bg-white/5 rounded-2xl border border-white/10 p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-xl hover:shadow-pink-500/10 group animate-fade-in-up"
                    style={{ 
                      animationDelay: `${index * 100}ms`,
                      WebkitBackdropFilter: 'blur(16px)',
                      backdropFilter: 'blur(16px)'
                    }}
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        {isArtist ? (
                          <>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-pink-300 border border-pink-500/30">
                                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                                </svg>
                                Artist
                              </span>
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-pink-300 transition-colors duration-300">
                              {item.artistName || "Unknown Artist"}
                            </h3>
                          </>
                        ) : (
                          <>
                            <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-pink-300 transition-colors duration-300">
                              {item.trackName || "Untitled Track"}
                            </h3>
                            <p className="text-white/70 font-medium text-lg">
                              by {item.artistName || "Unknown Artist"}
                            </p>
                          </>
                        )}
                      </div>
                      
                      {!isArtist && item.previewUrl && (
                        <div className="md:w-80">
                          <audio
                            controls
                            src={item.previewUrl}
                            className="w-full h-12 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-300"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
