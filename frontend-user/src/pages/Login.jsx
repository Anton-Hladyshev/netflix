import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    
    const navigate = useNavigate();
    const location = useLocation();
    
    // Page où rediriger après connexion réussie
    const from = location.state?.from || '/';
    
    useEffect(() => {
        // Si déjà connecté, rediriger
        const user = localStorage.getItem('user');
        if (user) {
            navigate(from, { replace: true });
        }
    }, [navigate, from]);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Effacer l'erreur quand l'utilisateur tape
        if (error) setError('');
    };

    const handleFocus = (field) => {
        if (field === 'email') setEmailFocused(true);
        if (field === 'password') setPasswordFocused(true);
    };

    const handleBlur = (field) => {
        if (field === 'email' && !formData.email) setEmailFocused(false);
        if (field === 'password' && !formData.password) setPasswordFocused(false);
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        
        try {
            // Validation basique
            if (!formData.email || !formData.password) {
                throw new Error('Veuillez remplir tous les champs');
            }
            
            // Simulation d'une authentification (délai réaliste)
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Comptes de test
            const testAccounts = [
                { email: 'admin@netflix.com', password: 'admin123', role: 'admin', name: 'Admin Netflix' },
                { email: 'user@netflix.com', password: 'user123', role: 'user', name: 'User Netflix' },
                { email: 'test@test.com', password: '123456', role: 'user', name: 'Test User' }
            ];
            
            const user = testAccounts.find(
                account => account.email === formData.email && account.password === formData.password
            );
            
            if (!user) {
                throw new Error('Adresse e-mail ou mot de passe incorrect.');
            }
            
            // Stocker les données utilisateur
            const authData = {
                email: user.email,
                name: user.name,
                role: user.role,
                token: `token_${Date.now()}`,
                expiresAt: Date.now() + (24 * 60 * 60 * 1000) // 24h
            };
            
            localStorage.setItem('user', JSON.stringify(authData));
            
            // Redirection réussie
            navigate(from, { replace: true });
            
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            {/* Arrière-plan Netflix gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black"></div>
            
            {/* Logo Netflix en haut à gauche */}
            <div className="absolute top-4 left-4 md:top-8 md:left-8">
                <Link to="/" className="text-red-600 text-2xl md:text-4xl font-bold tracking-tight">
                    NETFLIX
                </Link>
            </div>
            
            {/* Formulaire de connexion */}
            <div className="relative z-10 w-full max-w-md mx-4">
                <div className="bg-black bg-opacity-75 p-8 md:p-12 rounded-lg">
                    <h1 className="text-white text-3xl font-semibold mb-8">Se connecter</h1>
                    
                    {error && (
                        <div className="bg-red-600 text-white p-3 rounded mb-4 text-sm">
                            {error}
                        </div>
                    )}
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Champ Email */}
                        <div className="relative">
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                onFocus={() => handleFocus('email')}
                                onBlur={() => handleBlur('email')}
                                className="w-full px-4 py-4 bg-gray-800 border border-gray-600 rounded text-white placeholder-transparent focus:outline-none focus:border-white focus:bg-gray-700 transition-all"
                                placeholder="E-mail"
                                disabled={isLoading}
                            />
                            <label
                                className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                                    emailFocused || formData.email
                                        ? 'top-1 text-xs text-gray-400'
                                        : 'top-4 text-base text-gray-500'
                                }`}
                            >
                                E-mail
                            </label>
                        </div>
                        
                        {/* Champ Mot de passe */}
                        <div className="relative">
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                onFocus={() => handleFocus('password')}
                                onBlur={() => handleBlur('password')}
                                className="w-full px-4 py-4 bg-gray-800 border border-gray-600 rounded text-white placeholder-transparent focus:outline-none focus:border-white focus:bg-gray-700 transition-all"
                                placeholder="Mot de passe"
                                disabled={isLoading}
                            />
                            <label
                                className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                                    passwordFocused || formData.password
                                        ? 'top-1 text-xs text-gray-400'
                                        : 'top-4 text-base text-gray-500'
                                }`}
                            >
                                Mot de passe
                            </label>
                        </div>
                        
                        {/* Bouton Se connecter */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-red-600 text-white py-4 rounded font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                            {isLoading ? (
                                <div className="flex items-center space-x-2">
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    <span>Connexion...</span>
                                </div>
                            ) : (
                                'Se connecter'
                            )}
                        </button>
                    </form>
                    
                    {/* Lien d'aide */}
                    <div className="mt-6 text-center">
                        <a 
                            href="#" 
                            className="text-gray-400 hover:text-white text-sm underline transition-colors"
                            onClick={(e) => e.preventDefault()}
                        >
                            Vous avez besoin d'aide ?
                        </a>
                    </div>
                </div>
                
                {/* Informations de test */}
                <div className="mt-6 p-4 bg-gray-900 bg-opacity-50 rounded text-xs text-gray-400">
                    <div className="text-white mb-2 font-semibold">Comptes de test :</div>
                    <div>admin@netflix.com / admin123 (Admin)</div>
                    <div>user@netflix.com / user123 (Utilisateur)</div>
                    <div>test@test.com / 123456 (Utilisateur)</div>
                </div>
            </div>
        </div>
    );
}

export default Login;