import { useState, useEffect } from 'react';

function SearchBar({ movies, onSearch }) {
  //Créez les variables d'états nécessaires à la recherche et à l'affichage des suggestions
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (searchTerm.length >= 2) {
      // TODO: Filtrer les films en fonction du titre et la description selon searchTerm
      // Limiter à 5 films
      const filtered = movies.filter(movie => {
        const lowerCaseTerm = searchTerm.toLowerCase();
        return (
          movie.title.toLowerCase().includes(lowerCaseTerm) ||
          movie.description.toLowerCase().includes(lowerCaseTerm)
        );
      }).slice(0, 5);
      setSuggestions(filtered);
      setIsOpen(true);
    } else {
      //vider la liste des suggestions
      setSuggestions([]);
      //Masquer le panneau
      setIsOpen(false);
    }
  }, [searchTerm, movies]);

  const handleSelect = (movie) => {
    setSearchTerm(movie.title);
    setIsOpen(false);
    onSearch(movie);
  };

  //Quand la zone de recherche reçoit le focus, si elle comporte au moins 2 caractères
  //ouvrez la fenêtre de suggestions

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <input 
          type="text" 
          placeholder="Rechercher un film..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => searchTerm.length >= 2 && setIsOpen(true)}
          className="w-full px-4 py-2 pl-10 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-primary text-white"
        />
        <svg className="absolute left-3 top-3 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      {/* TODO: Dropdown de suggestions */}
        {isOpen && suggestions.length > 0 && (
          <ul className="absolute z-10 w-full py-2 mt-1 bg-gray-800 border border-gray-700 rounded-lg">
            {suggestions.map(movie => (
              <li key={movie.id} className="px-4 py-2 text-white cursor-pointer hover:bg-gray-700" onClick={() => handleSelect(movie)}>
                {movie.title}
              </li>
            ))}
          </ul>
        )}
    </div>
  );
}

export default SearchBar;
