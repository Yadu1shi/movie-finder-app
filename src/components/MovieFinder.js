import React, { useState } from "react";
import { Link } from "react-router-dom";

function MovieFinder() {
  const [input, setInput] = useState("");
  const [movieData, setMovieData] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!input) return;
    try {
      const res = await fetch(`https://www.omdbapi.com/?s=${input}&apikey=6467f965`);
      if (!res.ok) throw new Error(`Data not found! Status: ${res.status}`);
      const data = await res.json();

      if (data.Response === "False") {
        setError(data.Error);
        setMovieData(null);
      } else {
        setMovieData(data.Search);
        setError(null);
      }
    } catch (err) {
      setError(err.message);
      setMovieData(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navbar */}
      <nav className="bg-gray-800 p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-green-400">🎬 Movie Finder</h1>
        <div className="flex gap-4 items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search for movies..."
            className="px-3 py-1 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none"
          />
          <button
            onClick={handleSearch}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded"
          >
            Search
          </button>
          <Link to="/login" className="text-sm bg-blue-600 px-3 py-1 rounded hover:bg-blue-700">Login</Link>
          <Link to="/register" className="text-sm bg-purple-600 px-3 py-1 rounded hover:bg-purple-700">Register</Link>
        </div>
      </nav>

      {/* Results */}
      <div className="p-6 flex flex-wrap gap-6 justify-center">
        {error && <p className="text-red-500 text-lg">{error}</p>}
        {movieData &&
          movieData.map((movie) => (
            <div
              key={movie.imdbID}
              className="bg-gray-800 p-4 rounded-lg shadow-md w-60 text-center"
            >
              <img
                src={movie.Poster}
                alt={movie.Title}
                className="rounded-md h-80 w-full object-cover mb-3"
              />
              <h2 className="text-lg font-bold mb-1">{movie.Title}</h2>
              <p className="text-sm mb-2">{movie.Year}</p>
              <a
                href={`https://www.imdb.com/title/${movie.imdbID}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded text-black text-sm">
                  Watch on IMDb
                </button>
              </a>
            </div>
          ))}
      </div>
    </div>
  );
}

export default MovieFinder;
