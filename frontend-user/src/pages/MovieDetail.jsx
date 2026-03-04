import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import moviesData from '../../../data/movies.json';
import Navbar from '../components/common/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';

function MovieDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [movie, setMovie] = useState(null);
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        // Simuler un temps de chargement
        const loadMovie = async () => {
            setIsLoading(true);
            
            // Délai de chargement simulé (comme Netflix)
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            const foundMovie = moviesData.find(m => m.id.toString() === id);
            
            if (foundMovie) {
                setMovie(foundMovie);
            } else {
                navigate('/404');
            }
            
            setIsLoading(false);
        };

        loadMovie();
    }, [id, navigate]);

    // Afficher l'écran de chargement Netflix
    if (isLoading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="flex flex-col items-center justify-center space-y-8">
                    {/* Logo Netflix */}
                    <div className="text-red-600 text-4xl font-bold tracking-tight mb-8">
                        NETFLIX
                    </div>
                    
                    {/* Spinner Netflix */}
                    <div className="relative">
                        <div className="w-16 h-16 border-4 border-gray-800 border-t-red-600 rounded-full animate-spin"></div>
                    </div>
                    
                    {/* Texte de chargement */}
                    <p className="text-white text-xl font-medium animate-pulse">
                        Chargement...
                    </p>
                </div>
            </div>
        );
    }

    if (!movie) {
        return <LoadingSpinner fullScreen={true} text="Film non trouvé..." size="lg" />;
    }

    return (
        <div className="min-h-screen bg-black text-white">
            {/* 1. Navbar */}
            <Navbar cartItems={[]} removeFromCart={() => {}} />
            
            {/* 2. Image de fond en pleine page + Bouton Retour */}
            <div className="relative min-h-screen">
                {/* Background Image pleine page */}
                <div className="absolute inset-0">
                    <img
                        src={movie.backdrop || movie.image}
                        alt={movie.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                </div>

                {/* Bouton Retour vers la page précédente */}
                <div className="absolute top-24 left-6 z-20">
                    <Button 
                        variant="outline"
                        size="md"
                        onClick={() => navigate(-1)}
                        className="flex items-center space-x-2 bg-black/50 backdrop-blur-sm hover:bg-black/70"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        <span>Retour</span>
                    </Button>
                </div>

                {/* 3. Info du film + poster */}
                <div className="relative z-10 pt-32 pb-16">
                    <div className="container mx-auto px-6">
                        <div className="grid lg:grid-cols-12 gap-8 items-start">
                            {/* Informations du film - Left Side */}
                            <div className="lg:col-span-7">
                                {/* Title */}
                                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                                    {movie.title}
                                </h1>

                                {/* Meta Info */}
                                <div className="flex items-center space-x-4 mb-6 text-sm flex-wrap">
                                    <span className="bg-red-600 px-3 py-1 rounded font-bold">
                                        NETFLIX
                                    </span>
                                    <span className="text-green-400 font-semibold">
                                        ★ {movie.rating}/10
                                    </span>
                                    <span className="text-gray-300">{movie.year}</span>
                                    <span className="text-gray-300">{Math.floor(movie.duration / 60)}h {movie.duration % 60}min</span>
                                    <span className="border border-gray-500 px-2 py-1 rounded text-xs uppercase">
                                        {movie.genre}
                                    </span>
                                </div>

                                {/* Synopsis */}
                                <div className="mb-8">
                                    <h2 className="text-2xl font-semibold mb-4 text-red-600">Synopsis</h2>
                                    <p className="text-gray-300 leading-relaxed text-lg max-w-2xl">
                                        {movie.description}
                                    </p>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                                    <Button 
                                        variant="primary" 
                                        size="lg" 
                                        className="px-8 py-4 text-lg font-semibold"
                                    >
                                        ▶ Louer pour {movie.price}€
                                    </Button>
                                    <Button 
                                        variant="outline" 
                                        size="lg" 
                                        className="px-8 py-4"
                                        onClick={() => setLiked(!liked)}
                                    >
                                        {liked ? '❤️ Retiré de' : '🤍 Ajouter à'} ma liste
                                    </Button>
                                </div>

                                {/* Informations détaillées */}
                                <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 space-y-4">
                                    <h3 className="text-xl font-semibold text-red-600 mb-4">Informations du film</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                                        <div className="space-y-2">
                                            <div>
                                                <span className="text-gray-400 font-medium">Genre: </span>
                                                <span className="text-white">{movie.genre}</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-400 font-medium">Année: </span>
                                                <span className="text-white">{movie.year}</span>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <div>
                                                <span className="text-gray-400 font-medium">Durée: </span>
                                                <span className="text-white">{Math.floor(movie.duration / 60)}h {movie.duration % 60}min</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-400 font-medium">Note: </span>
                                                <span className="text-green-400 font-semibold">★ {movie.rating}/10</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pt-4 border-t border-gray-700">
                                        <div>
                                            <span className="text-gray-400 font-medium">Prix de location: </span>
                                            <span className="text-red-500 font-bold text-lg">{movie.price}€</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Poster du film - Right Side */}
                            <div className="lg:col-span-5 flex justify-center lg:justify-end">
                                <div className="relative group">
                                    <img
                                        src={movie.image}
                                        alt={`Affiche de ${movie.title}`}
                                        className="w-80 h-auto rounded-lg shadow-2xl transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* 4. Footer */}
            <Footer />
        </div>
    );
}

export default MovieDetail;