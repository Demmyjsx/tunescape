type Track = {
  trackId: number;
  trackName: string;
  artistName: string;
  previewUrl: string;
};

export default async function IntroSearch({
  searchParams,
}: {
  searchParams: { term?: string };
}) {
  const term = searchParams?.term || "adele";

  const response = await fetch(
    `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&media=music`
  );
  const data = await response.json();
  const tracks: Track[] = data.results;

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Search Results for {term}</h1>

      <ul className="space-y-4">
        {tracks.map((track) => (
          <li key={track.trackId} className="border-b pb-2">
            <div className="font-medium">{track.trackName}</div>
            <div className="text-sm text-gray-500">{track.artistName}</div>

            {/* 🎵 Add an audio player */}
            {track.previewUrl && (
              <audio controls src={track.previewUrl} className="mt-2 w-full" />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
