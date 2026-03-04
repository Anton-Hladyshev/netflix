import { Navigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LoadingSpinner from '../components/common/LoadingSpinner';

/**
 * Composant ProtectedRoute pour protéger les routes nécessitant une authentification
 * @param {Object} props - Les propriétés du composant
 * @param {React.ReactNode} props.children - Les composants enfants à rendre si authentifié
 * @param {string} props.redirectTo - URL de redirection si non authentifié (par défaut: '/login')
 * @param {Array} props.requiredRoles - Rôles requis pour accéder à la route
 * @returns {React.ReactElement} - Le composant enfant ou une redirection
 */
function ProtectedRoute({ 
    children, 
    redirectTo = '/login', 
    requiredRoles = [] 
}) {
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);
    const location = useLocation();

    useEffect(() => {
        // Vérifier l'authentification et récupérer les données utilisateur
        const checkAuthentication = async () => {
            try {
                // Simuler une vérification d'authentification
                // En production, ceci ferait un appel API pour vérifier le token
                const userData = localStorage.getItem('user');
                const token = localStorage.getItem('token');
                
                if (userData && token) {
                    const parsedUser = JSON.parse(userData);
                    
                    // Vérifier si le token n'est pas expiré
                    const tokenExpiry = localStorage.getItem('tokenExpiry');
                    const now = new Date().getTime();
                    
                    if (tokenExpiry && now > parseInt(tokenExpiry)) {
                        // Token expiré, nettoyer le localStorage
                        localStorage.removeItem('user');
                        localStorage.removeItem('token');
                        localStorage.removeItem('tokenExpiry');
                        setUser(null);
                    } else {
                        setUser(parsedUser);
                    }
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error('Erreur lors de la vérification de l\'authentification:', error);
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };

        checkAuthentication();
    }, []);

    // Fonction pour vérifier les rôles si spécifiés
    const hasRequiredRole = (userRoles, requiredRoles) => {
        if (requiredRoles.length === 0) return true;
        if (!userRoles || userRoles.length === 0) return false;
        
        return requiredRoles.some(role => userRoles.includes(role));
    };

    // Afficher le spinner de chargement pendant la vérification
    if (isLoading) {
        return (
            <LoadingSpinner 
                fullScreen={true} 
                text="Vérification de l'authentification..." 
                size="lg" 
            />
        );
    }

    // Utilisateur non authentifié - rediriger vers la page de connexion
    if (!user) {
        // Sauvegarder la page qu'il tentait d'accéder pour redirection après connexion
        return (
            <Navigate 
                to={redirectTo} 
                state={{ from: location.pathname + location.search }} 
                replace 
            />
        );
    }

    // Vérifier les rôles si spécifiés
    if (requiredRoles.length > 0 && !hasRequiredRole(user.roles, requiredRoles)) {
        // Utilisateur authentifié mais sans les droits nécessaires
        return (
            <Navigate 
                to="/unauthorized" 
                state={{ from: location.pathname, requiredRoles }} 
                replace 
            />
        );
    }

    // Utilisateur authentifié et autorisé - rendre les composants enfants
    return children;
}

export default ProtectedRoute;