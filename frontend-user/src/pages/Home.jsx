import Footer from "../components/layout/Footer";
import MovieList from "../components/movies/MovieList";
import MovieHero from "../components/movies/MovieHero";
import Navbar from "../components/common/Navbar";


function Home({ movies }) {
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
            </div>
        </main>
        
        {/* Footer */}
        <Footer />
        </div>
    );
    }

export default Home;