import { useState, useEffect, createContext, useContext } from 'react';

// Créer le contexte d'authentification
const AuthContext = createContext();

/**
 * Provider d'authentification
 */
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Vérifier l'authentification au chargement de l'app
        const checkAuth = () => {
            try {
                const userData = localStorage.getItem('user');
                const token = localStorage.getItem('token');
                const tokenExpiry = localStorage.getItem('tokenExpiry');

                if (userData && token && tokenExpiry) {
                    const now = new Date().getTime();
                    
                    if (now < parseInt(tokenExpiry)) {
                        setUser(JSON.parse(userData));
                    } else {
                        // Token expiré
                        logout();
                    }
                }
            } catch (error) {
                console.error('Erreur lors de la vérification de l\'authentification:', error);
                logout();
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, []);

    const login = (userData, token, rememberMe = false) => {
        try {
            const tokenExpiry = rememberMe 
                ? new Date().getTime() + (30 * 24 * 60 * 60 * 1000) // 30 jours
                : new Date().getTime() + (24 * 60 * 60 * 1000); // 24 heures

            localStorage.setItem('user', JSON.stringify(userData));
            localStorage.setItem('token', token);
            localStorage.setItem('tokenExpiry', tokenExpiry.toString());
            
            setUser(userData);
            return true;
        } catch (error) {
            console.error('Erreur lors de la connexion:', error);
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpiry');
        setUser(null);
    };

    const updateUser = (newUserData) => {
        const updatedUser = { ...user, ...newUserData };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
    };

    const hasRole = (requiredRole) => {
        if (!user || !user.roles) return false;
        return user.roles.includes(requiredRole);
    };

    const hasAnyRole = (requiredRoles) => {
        if (!user || !user.roles || !requiredRoles?.length) return false;
        return requiredRoles.some(role => user.roles.includes(role));
    };

    const isAuthenticated = !!user;

    const value = {
        user,
        isLoading,
        isAuthenticated,
        login,
        logout,
        updateUser,
        hasRole,
        hasAnyRole
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

/**
 * Hook pour utiliser le contexte d'authentification
 */
export function useAuth() {
    const context = useContext(AuthContext);
    
    if (context === undefined) {
        throw new Error('useAuth doit être utilisé dans un AuthProvider');
    }
    
    return context;
}

/**
 * Hook personnalisé pour la gestion des permissions
 */
export function usePermissions() {
    const { user, hasRole, hasAnyRole } = useAuth();
    
    return {
        isAdmin: hasRole('admin'),
        isUser: hasRole('user'),
        isPremium: user?.subscription === 'Premium',
        canAccessAdminPanel: hasRole('admin'),
        canRentMovies: hasAnyRole(['user', 'admin']),
        canManageAccount: hasAnyRole(['user', 'admin']),
        hasRole,
        hasAnyRole
    };
}