
export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 text-sm py-6 mt-10 border-t border-gray-700">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        
        <p className="mb-2 md:mb-0">
          🎵 project idea by @demmyjsx and Api used was
          <a
            href="https://www.apple.com/itunes/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-500 hover:underline"
          >
            iTunes API
          </a>
        </p>

        
        <p>
          © {new Date().getFullYear()} Tunescape. Built with ❤️ for music & Podcast lovers.
        </p>
      </div>
    </footer>
  );
}
