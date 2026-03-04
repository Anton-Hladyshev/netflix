import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';

function MyRentals() {
    const [isLoading, setIsLoading] = useState(true);
    const [rentals, setRentals] = useState([]);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    
    useEffect(() => {
        // Vérifier l'authentification
        const userData = localStorage.getItem('user');
        // if (!userData) {
        //     navigate('/login');
        //     return;
        // }
        
        setUser(JSON.parse(userData));
        
        // Simuler le chargement des locations
        const loadRentals = async () => {
            setIsLoading(true);
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Récupérer les locations depuis localStorage (simulation)
            const userRentals = localStorage.getItem('userRentals') || '[]';
            setRentals(JSON.parse(userRentals));
            
            setIsLoading(false);
        };
        
        loadRentals();
    }, []);
    
    if (isLoading) {
        return (
            <div className="min-h-screen bg-black">
                <Navbar cartItems={[]} removeFromCart={() => {}} />
                <div className="pt-20">
                    <LoadingSpinner size="lg" text="Chargement de vos locations..." />
                </div>
            </div>
        );
    }
    
    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar cartItems={[]} removeFromCart={() => {}} />
            
            <main className="pt-20 pb-16">
                <div className="container mx-auto px-4 max-w-7xl">
                    {/* En-tête */}
                    <div className="mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-white">
                            Mes locations
                        </h1>
                        {user && (
                            <p className="text-gray-400 mt-2">
                                Connecté en tant que {user.email}
                            </p>
                        )}
                    </div>
                    
                    {/* État vide - Aucune location */}
                    {rentals.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 px-4">
                            {/* Icône de film */}
                            <div className="mb-8">
                                <div className="w-24 h-24 border-4 border-gray-600 border-dashed rounded-lg flex items-center justify-center">
                                    <svg 
                                        className="w-12 h-12 text-gray-500" 
                                        fill="none" 
                                        stroke="currentColor" 
                                        viewBox="0 0 24 24"
                                    >
                                        <path 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round" 
                                            strokeWidth={1.5} 
                                            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" 
                                        />
                                    </svg>
                                </div>
                            </div>
                            
                            {/* Texte principal */}
                            <h2 className="text-xl md:text-2xl font-medium text-white mb-4 text-center">
                                Aucune location pour le moment
                            </h2>
                            
                            {/* Bouton d'action */}
                            <Link to="/">
                                <Button 
                                    variant="primary" 
                                    size="lg"
                                    className="px-8 py-3"
                                >
                                    Découvrir des films
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        /* Grille des locations (pour les locations futures) */
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                            {rentals.map(rental => (
                                <div 
                                    key={rental.id} 
                                    className="group cursor-pointer"
                                >
                                    <div className="relative overflow-hidden rounded-md mb-2">
                                        <img 
                                            src={rental.poster || '/placeholder-movie.jpg'} 
                                            alt={rental.title}
                                            className="w-full aspect-2/3 object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                                        
                                        {/* Badge de durée restante */}
                                        <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                                            {rental.daysLeft} jours
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-1">
                                        <h3 className="text-sm font-medium text-white line-clamp-1">
                                            {rental.title}
                                        </h3>
                                        <p className="text-xs text-gray-400">
                                            Expire le {rental.expireDate}
                                        </p>
                                        <div className="flex space-x-2 pt-1">
                                            <Button 
                                                variant="outline" 
                                                size="sm"
                                                onClick={() => navigate(`/movie/${rental.id}`)}
                                            >
                                                Regarder
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
            
            <Footer />
        </div>
    );
}

export default MyRentals;