import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Button from '../components/common/Button';
import { Link } from 'react-router-dom';

function Unauthorized() {
    const navigate = useNavigate();
    const location = useLocation();
    const { from, requiredRoles } = location.state || {};

    useEffect(() => {
        // Auto-redirection après 10 secondes
        const timer = setTimeout(() => {
            navigate('/', { replace: true });
        }, 10000);

        return () => clearTimeout(timer);
    }, [navigate]);

    const handleGoHome = () => {
        navigate('/', { replace: true });
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
            {/* Netflix Logo */}
            <div className="absolute top-8 left-8">
                <Link to="/" className="text-red-600 text-3xl font-bold">
                    NETFLIX
                </Link>
            </div>
            
            {/* 403 Content */}
            <div className="text-center max-w-2xl mx-auto">
                {/* Large 403 */}
                <div className="mb-8">
                    <h1 className="text-8xl md:text-9xl font-bold text-red-600 mb-4">
                        403
                    </h1>
                    <div className="w-24 h-1 bg-red-600 mx-auto mb-8"></div>
                </div>
                
                {/* Error Message */}
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                    Accès non autorisé
                </h2>
                
                <div className="space-y-4 mb-8">
                    <p className="text-xl text-gray-400 leading-relaxed">
                        Désolé, vous n'avez pas les permissions nécessaires pour accéder à cette page.
                    </p>
                    
                    {from && (
                        <p className="text-lg text-gray-500">
                            Page demandée : <code className="bg-gray-800 px-2 py-1 rounded">{from}</code>
                        </p>
                    )}
                    
                    {requiredRoles && requiredRoles.length > 0 && (
                        <div className="bg-gray-900 rounded-lg p-4 text-left">
                            <p className="text-sm text-gray-400 mb-2">Rôles requis :</p>
                            <div className="flex flex-wrap gap-2">
                                {requiredRoles.map((role, index) => (
                                    <span key={index} className="bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold">
                                        {role}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Button 
                        variant="primary" 
                        size="lg"
                        onClick={handleGoHome}
                        className="px-8"
                    >
                        🏠 Retour à l'accueil
                    </Button>
                    
                    <Button 
                        variant="outline" 
                        size="lg"
                        onClick={handleGoBack}
                        className="px-8"
                    >
                        ← Page précédente
                    </Button>
                </div>
                
                {/* Additional Help */}
                <div className="mt-12 pt-8 border-t border-gray-700">
                    <p className="text-gray-500 mb-4">
                        Si vous pensez qu'il s'agit d'une erreur, vous pouvez :
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 text-sm">
                        <Link to="/login" className="text-red-400 hover:text-red-300 underline">
                            Se reconnecter
                        </Link>
                        <span className="text-gray-600">•</span>
                        <Link to="/register" className="text-red-400 hover:text-red-300 underline">
                            Créer un compte
                        </Link>
                        <span className="text-gray-600">•</span>
                        <a href="mailto:support@netflix.com" className="text-red-400 hover:text-red-300 underline">
                            Contacter le support
                        </a>
                    </div>
                </div>
                
                {/* Auto-redirect notice */}
                <div className="mt-8 text-sm text-gray-500">
                    Redirection automatique vers l'accueil dans 10 secondes...
                </div>
            </div>
        </div>
    );
}

export default Unauthorized;