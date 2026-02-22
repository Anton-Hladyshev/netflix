import { useEffect, useState } from "react";
import Footer from "../components/layout/Footer";
import MovieList from "../components/movies/MovieList";
import MovieHero from "../components/movies/MovieHero";
import Navbar from "../components/common/Navbar";
import moviesData from '../../../data/movies.json';
import MovieFilter from "../components/movies/MovieFilter";

function Home() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    const [allMovies] = useState(moviesData);
    const [filteredMovies, setFilteredMovies] = useState(moviesData);

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
        return <div>Loading...</div>;
    }

    const genre = "Science-Fiction"; 
    const year = 2010;

    const popularMovies = [...movies].sort(() => 0.5 - Math.random()).slice(0, 5);
    const popularMoviesByGenre = movies.filter(movie => movie.genre.includes(genre)).slice(0, 5);
    const popularMoviesByYear = movies.filter(movie => movie.year >= year).slice(0, 5);

    return (
        <div className="flex flex-col min-h-screen">
        {/* Navigation */}
        <Navbar />
        
        {/* Main Content */}
        <main className="flex-1">
            <MovieHero movie={movies?.[0]} />
            
            <div className="space-y-8 pb-16">
            <MovieList title="Films populaires" movies={popularMovies} />
            <MovieList title={`Films populaires dans le genre ${genre}`} movies={popularMoviesByGenre} />
            <MovieList title={`Films populaires sortis après ${year}`} movies={popularMoviesByYear} />
            <MovieList title="Films disponibles" movies={filteredMovies} />
            {/* Filter */}
            <MovieFilter movies={allMovies} onFilter={setFilteredMovies} />
            </div>
        </main>
        
        {/* Footer */}
        <Footer />
        </div>
    );
    }

export default Home;