import { useState } from 'react';

function MovieFilter({ movies, onFilter }) {
  const [selectedGenre, setSelectedGenre] = useState('all');

  const genres = [...new Set(movies.flatMap(movie => movie.genre).flat())];

  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
    if (genre === 'all') {
      setSelectedGenre('all');
      onFilter(movies);
    } else {
      setSelectedGenre(genre);
      const filtered = movies.filter(movie => movie.genre.includes(genre));
      onFilter(filtered);
    }
  };
  
  return (
    <div className="flex flex-wrap gap-2 mb-6 px-4">
      <button
        onClick={() => handleGenreChange('All')}
        className={`px-4 py-2 rounded-lg transition ${
          selectedGenre === 'All'
            ? 'bg-red-600 text-white hover:bg-red-700'
            : 'bg-black text-white hover:bg-gray-800 border border-gray-600'
        }`}
      >
        Tous
      </button>
      {genres.map(genre => (
        <button
          key={genre}
          onClick={() => handleGenreChange(genre)}
          className={`px-4 py-2 rounded-lg transition ${
            selectedGenre === genre
              ? 'bg-red-600 text-white hover:bg-red-700'
              : 'bg-black text-white hover:bg-gray-800 border border-gray-600'
          }`}
        >
          {genre}
        </button>
      ))}
    </div>
  );
}

export default MovieFilter;