import { useState } from 'react';
import Button from '../components/common/Button';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        
        // Effacer l'erreur du champ modifié
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Valider le formulaire
        const validationErrors = validateForm();
        
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        
        setIsLoading(true);
        setErrors({});
        
        try {
            // Simulation d'un appel API d'inscription
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Vérifier si l'utilisateur existe déjà (simulation)
            const existingUser = localStorage.getItem('user_' + formData.email);
            if (existingUser) {
                setErrors({ email: 'Cette adresse e-mail est déjà utilisée' });
                return;
            }
            
            // Créer le nouvel utilisateur
            const newUser = {
                id: Date.now(),
                email: formData.email,
                firstName: formData.firstName,
                lastName: formData.lastName,
                name: `${formData.firstName} ${formData.lastName}`,
                role: 'user',
                createdAt: new Date().toISOString()
            };
            
            // Sauvegarder l'utilisateur (simulation)
            localStorage.setItem('user_' + formData.email, JSON.stringify(newUser));
            
            // Connecter automatiquement l'utilisateur
            const userData = {
                ...newUser,
                token: `token_${Date.now()}`,
                expiresAt: Date.now() + (24 * 60 * 60 * 1000) // 24h
            };
            
            localStorage.setItem('user', JSON.stringify(userData));
            
            // Rediriger vers la page d'accueil
            navigate('/');
            
        } catch (error) {
            setErrors({ general: 'Une erreur est survenue. Veuillez réessayer.' });
        } finally {
            setIsLoading(false);
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        // Validation du prénom
        if (!formData.firstName || formData.firstName.trim() === '') {
            newErrors.firstName = "Le prénom est requis";
        } else if (formData.firstName.trim().length < 2) {
            newErrors.firstName = "Le prénom doit contenir au moins 2 caractères";
        } else if (!/^[A-Za-zÀ-ÿ\s'-]+$/.test(formData.firstName.trim())) {
            newErrors.firstName = "Le prénom contient des caractères non valides";
        }
        
        // Validation du nom
        if (!formData.lastName || formData.lastName.trim() === '') {
            newErrors.lastName = "Le nom est requis";
        } else if (formData.lastName.trim().length < 2) {
            newErrors.lastName = "Le nom doit contenir au moins 2 caractères";
        } else if (!/^[A-Za-zÀ-ÿ\s'-]+$/.test(formData.lastName.trim())) {
            newErrors.lastName = "Le nom contient des caractères non valides";
        }
        
        // Validation de l'email
        if (!formData.email || formData.email.trim() === '') {
            newErrors.email = "L'adresse e-mail est requise";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
            newErrors.email = "Veuillez entrer une adresse e-mail valide";
        } else if (formData.email.length > 254) {
            newErrors.email = "L'adresse e-mail est trop longue";
        }
        
        // Validation du mot de passe
        if (!formData.password) {
            newErrors.password = "Le mot de passe est requis";
        } else if (formData.password.length < 8) {
            newErrors.password = "Le mot de passe doit contenir au moins 8 caractères";
        } else if (formData.password.length > 128) {
            newErrors.password = "Le mot de passe est trop long (maximum 128 caractères)";
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
            newErrors.password = "Le mot de passe doit contenir au moins une minuscule, une majuscule et un chiffre";
        } else if (/^(.)\1*$/.test(formData.password)) {
            newErrors.password = "Le mot de passe ne peut pas être composé du même caractère répété";
        } else if (/\s/.test(formData.password)) {
            newErrors.password = "Le mot de passe ne doit pas contenir d'espaces";
        }
        
        // Validation de la confirmation du mot de passe
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "La confirmation du mot de passe est requise";
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
        }
        
        return newErrors;
    };
    
    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4">
            {/* Netflix Logo */}
            <div className="absolute top-8 left-8">
                <Link to="/" className="text-red-600 text-3xl font-bold">
                    NETFLIX
                </Link>
            </div>
            
            {/* Registration Form */}
            <div className="bg-black/80 backdrop-blur-sm p-8 rounded-lg border border-gray-700 w-full max-w-md">
                <h1 className="text-3xl font-bold text-white mb-8 text-center">
                    Inscription
                </h1>
                
                {/* Message d'erreur général */}
                {errors.general && (
                    <div className="bg-red-600 text-white p-3 rounded mb-6 text-sm text-center">
                        {errors.general}
                    </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
                                Prénom
                            </label>
                            <input
                                type="text"
                                name="firstName"
                                id="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                className={`w-full px-3 py-3 bg-gray-800 border rounded focus:outline-none text-white ${
                                    errors.firstName ? 'border-red-500 focus:border-red-500' : 'border-gray-600 focus:border-red-500'
                                }`}
                                placeholder="Votre prénom"
                                required
                            />
                            {errors.firstName && (
                                <p className="mt-1 text-red-500 text-xs">{errors.firstName}</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">
                                Nom
                            </label>
                            <input
                                type="text"
                                name="lastName"
                                id="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                className={`w-full px-3 py-3 bg-gray-800 border rounded focus:outline-none text-white ${
                                    errors.lastName ? 'border-red-500 focus:border-red-500' : 'border-gray-600 focus:border-red-500'
                                }`}
                                placeholder="Votre nom"
                                required
                            />
                            {errors.lastName && (
                                <p className="mt-1 text-red-500 text-xs">{errors.lastName}</p>
                            )}
                        </div>
                    </div>
                    
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full px-3 py-3 bg-gray-800 border rounded focus:outline-none text-white ${
                                errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-600 focus:border-red-500'
                            }`}
                            placeholder="votre@email.com"
                            required
                        />
                        {errors.email && (
                            <p className="mt-1 text-red-500 text-xs">{errors.email}</p>
                        )}
                    </div>
                    
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                            Mot de passe
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`w-full px-3 py-3 bg-gray-800 border rounded focus:outline-none text-white ${
                                errors.password ? 'border-red-500 focus:border-red-500' : 'border-gray-600 focus:border-red-500'
                            }`}
                            placeholder="••••••••"
                            required
                        />
                        {errors.password && (
                            <p className="mt-1 text-red-500 text-xs">{errors.password}</p>
                        )}
                        <p className="mt-1 text-gray-500 text-xs">
                            Au moins 8 caractères avec une minuscule, une majuscule et un chiffre
                        </p>
                    </div>
                    
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                            Confirmer le mot de passe
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={`w-full px-3 py-3 bg-gray-800 border rounded focus:outline-none text-white ${
                                errors.confirmPassword ? 'border-red-500 focus:border-red-500' : 'border-gray-600 focus:border-red-500'
                            }`}
                            placeholder="••••••••"
                            required
                        />
                        {errors.confirmPassword && (
                            <p className="mt-1 text-red-500 text-xs">{errors.confirmPassword}</p>
                        )}
                    </div>
                    
                    <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        loading={isLoading}
                        className="w-full"
                    >
                        S'inscrire
                    </Button>
                </form>
                
                <div className="mt-6 text-center">
                    <p className="text-gray-400">
                        Vous avez déjà un compte ?{' '}
                        <Link to="/login" className="text-red-500 hover:text-red-400 font-semibold">
                            Connectez-vous
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register;