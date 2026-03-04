import Button from '../common/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function MovieCard({ movie, addToCart }) {
  const navigate = useNavigate();
  const genreColors = {
    'Action': 'bg-red-500',
    'Comédie': 'bg-yellow-500',
    'Drame': 'bg-blue-500',
    'Science-Fiction': 'bg-purple-500',
    'Horreur': 'bg-orange-500',
    'Thriller': 'bg-gray-500',
    'Romance': 'bg-pink-500',
    'Fantastique': 'bg-green-500',
    'Animation': 'bg-indigo-500'
  };

  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(movie.likes || 0);

  const handleLike= () => {
    if (!isLiked) {
      setLikes(likes + 1);
    } else {
      setLikes(likes - 1);
    }
  }
  const setLiked = () => {
    setIsLiked(!isLiked);
  }

  const handleNavigateToDetail = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div className="group relative overflow-hidden rounded-lg cursor-pointer transition-transform duration-300 hover:scale-105">
      {/* Image principale */}
      <div className="relative aspect-[2/3]">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        {/* Badge de note */}
        <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm px-2 py-1 rounded">
          <span className="text-yellow-400 font-bold text-sm">
            ⭐ {movie.rating}
          </span>
        </div>
        {/* Badge de genre */}
        <div className={`absolute bottom-2 left-2 ${genreColors[movie.genre] || 'bg-gray-500'} px-2 py-1 rounded-full`}>
          <span className="text-white font-semibold text-xs">
            {movie.genre}
          </span>
        </div>
      </div>
      {/* Overlay au hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <h3 className="text-xl text-white font-bold mb-2">{movie.title}</h3>
        
        <div className="mb-3">
          <Button
            variant={isLiked ? "danger" : "secondary"}
            size="xs"
            onClick={() => {setLiked(); handleLike();}}
            className="text-white"
          >
            {isLiked ? '❤️' : '🤍'} {likes} likes
          </Button>
        </div>
        
        <div className="flex items-center space-x-3 mb-3 text-sm">
          <span className="text-green-400 font-semibold">{movie.rating}/10</span>
          <span className="text-gray-400">{movie.year}</span>
          <span className="text-gray-400">{movie.duration}min</span>
        </div>
        <p className="text-sm text-gray-300 mb-4 line-clamp-2">
          {movie.description}
        </p>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button 
            variant="primary"
            size="sm" 
            className="flex-1"
            onClick={() => addToCart && addToCart(movie)}
          >
            ▶ Louer {movie.price}€
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={handleNavigateToDetail}
          >
            + Info
          </Button>
        </div>
      </div>
    </div>
  );
}
export default MovieCard;