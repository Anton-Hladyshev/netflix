import { useNavigate } from "react-router-dom";
import Button from '../components/common/Button';
import { Link } from 'react-router-dom';

function NotFoundError() {
    const navigate = useNavigate();

    const handleReturnHome = (e) => {
        e.preventDefault();
        navigate('/')
    }
    
    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
            {/* Netflix Logo */}
            <div className="absolute top-8 left-8">
                <Link to="/" className="text-red-600 text-3xl font-bold">
                    NETFLIX
                </Link>
            </div>
            
            {/* 404 Content */}
            <div className="text-center max-w-2xl mx-auto">
                {/* Large 404 */}
                <div className="mb-8">
                    <h1 className="text-8xl md:text-9xl font-bold text-red-600 mb-4">
                        404
                    </h1>
                    <div className="w-24 h-1 bg-red-600 mx-auto mb-8"></div>
                </div>
                
                {/* Error Message */}
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                    Oups ! Page non trouvée
                </h2>
                
                <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                    Désolé, la page que vous recherchez n'existe pas. 
                    Elle a peut-être été supprimée, renommée ou est temporairement indisponible.
                </p>
                
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Button 
                        variant="primary" 
                        size="lg"
                        onClick={handleReturnHome}
                        className="px-8"
                    >
                        🏠 Retour à l'accueil
                    </Button>
                    
                    <Button 
                        variant="outline" 
                        size="lg"
                        onClick={() => window.history.back()}
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
                        <Link to="/" className="text-red-400 hover:text-red-300 underline">
                            Parcourir les films
                        </Link>
                        <span className="text-gray-600">•</span>
                        <Link to="/my-rentals" className="text-red-400 hover:text-red-300 underline">
                            Mes locations
                        </Link>
                        <span className="text-gray-600">•</span>
                        <a href="mailto:support@netflix.com" className="text-red-400 hover:text-red-300 underline">
                            Contacter le support
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NotFoundError;