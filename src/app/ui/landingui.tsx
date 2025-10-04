'use client'

import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";


type Song = {
  "im:name": { label: string };
  "im:artist": { label: string };
  "im:image": { label: string }[]; 
};

export default function LandingUi() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);


  useEffect(() => {
    const fetchTopSongs = async () => {
      try {
        const res = await axios.get(
          "https://itunes.apple.com/ng/rss/topsongs/limit=10/json"
        );
        setSongs(res.data.feed.entry);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTopSongs();
  }, []);

 
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % songs.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [songs]);


  const nextSong = () => setCurrentIndex((currentIndex + 1) % songs.length);
  const prevSong = () =>
    setCurrentIndex((currentIndex - 1 + songs.length) % songs.length);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
      >
        <source src="/bgvid.mp4" type="video/mp4" />
      </video>

      <div className="relative z-10 flex flex-col items-center justify-center h-full space-y-6">
    
        <div className="backdrop-blur-sm bg-black/40 px-6 py-4 rounded-lg text-center">
          <h1 className="lg:text-5xl sm:text-2xl font-bold text-gray-300">
            Welcome to My Music App <br />
            <span className="block mt-4 lg:ml-10">
              Discover Your Favorite Songs, Artists and Podcasts
            </span>
          </h1>

            <div className="mx-auto">
              <h2 className=" text-3xl my-4 text-amber-600">Here are Top 10 Songs Trending </h2>
            </div>

          {songs.length > 0 && (
          <div className="flex flex-col items-center space-y-4">
            <Image
              src={songs[currentIndex]["im:image"][2].label}
              alt={songs[currentIndex]["im:name"].label}
              width={170}
              height={170}
              className="object-cover rounded-lg shadow-lg"
            />
            <h2 className="text-xl font-bold text-white">
              {songs[currentIndex]["im:name"].label}
            </h2>
            <p className="text-white">
              {songs[currentIndex]["im:artist"].label}
            </p>

          
            <div className="flex space-x-4 mt-2">
              <button
                onClick={prevSong}
                className="bg-pink-500 text-white px-4 py-2 rounded-lg"
              >
                Previous
              </button>
              <button
                onClick={nextSong}
                className="bg-pink-500 text-white px-4 py-2 rounded-lg"
              >
                Next
              </button>
            </div>
          </div>
        )}
        </div>

       
        
      </div>
    </div>
  );
}
