import Movie from '../models/Movie.js';

// @desc    Obtenir tous les films
// @route   GET /api/movies
// @access  Public
export const getAllMovies = async (req, res, next) => {
    try {
        console.log('Requête reçue pour obtenir tous les films avec les paramètres:', req.query);
        let query = {};
        const { search, genre, year, sort } = req.query;

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        if (genre) {
            query.genre = genre;
        }

        if (year) {
            query.year = Number(year);
        }

        let movieQuery = Movie.search(query);

        if (sort) {
            const sortFields = sort.split(',').join(' ');
            movieQuery = movieQuery.sort(sortFields);
        } else {
            movieQuery = movieQuery.sort({ createdAt: -1 });
        }

        const movies = await movieQuery;

        res.json({
            success: true,
            count: movies.length,
            data: movies
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Obtenir un film par ID
// @route   GET /api/movies/:id
// @access  Public
export const getMovieById = async (req, res, next) => {
    try {
        console.log('Requête reçue pour obtenir un film par ID:', req.params.id);
        const movie = await Movie.findById(req.params.id);

        if (!movie) {
            return res.status(404).json({
                success: false,
                message: 'Film non trouvé'
            });
        }

        res.json({
            success: true,
            data: movie
        });
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(400).json({
                success: false,
                message: 'Format d\'ID invalide'
            });
        }
        next(error);
    }
};

// @desc    Obtenir les films similaires
// @route   GET /api/movies/:id/similar
// @access  Public
export const getSimilarMovies = async (req, res, next) => {
    try {
        const referenceMovie = await Movie.findById(req.params.id).select('genre');

        if (!referenceMovie) {
            return res.status(404).json({
                success: false,
                message: 'Film original non trouvé'
            });
        }

        const similarMovies = await Movie.find({
            _id: { $ne: req.params.id },
            genre: { $in: referenceMovie.genre }
        });

        res.json({
            success: true,
            data: similarMovies
        });
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(400).json({
                success: false,
                message: 'Format d\'ID invalide'
            });
        }
        next(error);
    }
};

// @desc    Créer un nouveau film
// @route   POST /api/movies
// @access  Private/Admin
export const createMovie = async (req, res, next) => {
    try {
        const movie = await Movie.create(req.body);
        res.status(201).json({
            success: true,
            data: movie
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Modifier un film
// @route   PUT /api/movies/:id
// @access  Private/Admin
export const updateMovie = async (req, res, next) => {
    try {
        const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!movie) {
            return res.status(404).json({
                success: false,
                message: 'Film non trouvé'
            });
        }
        res.json({
            success: true,
            data: movie
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Supprimer un film
// @route   DELETE /api/movies/:id
// @access  Private/Admin
export const deleteMovie = async (req, res, next) => {
    try {
        const movie = await Movie.findByIdAndDelete(req.params.id);
        if (!movie) {
            return res.status(404).json({
                success: false,
                message: 'Film non trouvé'
            });
        }
        res.json({
            success: true,
            message: 'Film supprimé'
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Obtenir les statistiques des films
// @route   GET /api/movies/stats
// @access  Private/Admin
export const getMovieStats = async (req, res, next) => {
    try {
        const stats = await Movie.getStatsByGenre();
        res.json({
            success: true,
            data: {
                totalMovies: stats.reduce((acc, genre) => acc + genre.count, 0),
                estimatedRevenue: stats.reduce((acc, genre) => acc + (genre.count * genre.avgPrice), 0),
                byGenre: stats
            }
        });
    } catch (error) {
        next(error);
    }
};
