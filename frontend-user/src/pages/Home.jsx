import { useEffect, useState } from "react";
import Footer from "../components/layout/Footer";
import MovieList from "../components/movies/MovieList";
import MovieHero from "../components/movies/MovieHero";
import Navbar from "../components/common/Navbar";
import moviesData from '../../../data/movies.json';
import MovieFilter from "../components/movies/MovieFilter";
import LoadingSpinner from "../components/common/LoadingSpinner";

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [allMovies] = useState(moviesData);
  const [filteredMovies, setFilteredMovies] = useState(moviesData);
  
  const [cartItems, setCartItems] = useState([]);
  
  const addToCart = (movie) => {
    setCartItems((prevItems) => {
      if (prevItems.some(item => item.id === movie.id)) {
        return prevItems;
      }
      return [...prevItems, movie];
    });
  };
  
  const removeFromCart = (movieId) => {
    setCartItems((prevItems) => {
      return prevItems.filter(item => item.id !== movieId);
    });
  };

    useEffect(() => {
        const loadMovies = async () => {
            setLoading(true);

            await new Promise(resolve => setTimeout(resolve, 1000));

            setMovies(moviesData);
            setLoading(false);
        }

        loadMovies();
    }, []);

    useEffect(() => {
        setFilteredMovies(allMovies);
    }, [allMovies]);

    if (loading) {
        return <LoadingSpinner fullScreen={true} text="Chargement de Netflix..." size="lg" />;
    }

    const genre = "Science-Fiction"; 
    const year = 2010;

    // eslint-disable-next-line react-hooks/purity
    const popularMovies = [...movies].sort(() => 0.5 - Math.random()).slice(0, 5);
    const popularMoviesByGenre = movies.filter(movie => movie.genre.includes(genre)).slice(0, 5);
    const popularMoviesByYear = movies.filter(movie => movie.year >= year).slice(0, 5);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <Navbar cartItems={cartItems} removeFromCart={removeFromCart} />
      
      {/* Main Content */}
      <main className="flex-1">
        <MovieHero movie={movies?.[0]} addToCart={addToCart} />
        
        <div className="space-y-8 pb-16">
          <MovieFilter movies={allMovies} onFilter={setFilteredMovies} />
          <MovieList title="Films populaires" movies={popularMovies} addToCart={addToCart} />
          <MovieList title={`Films populaires dans le genre ${genre}`} movies={popularMoviesByGenre} addToCart={addToCart} />
          <MovieList title={`Films populaires sortis après ${year}`} movies={popularMoviesByYear} addToCart={addToCart} />
          <MovieList title="Films disponibles" movies={filteredMovies} addToCart={addToCart} />
          {/* Filter */}
        </div>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
    }

export default Home;