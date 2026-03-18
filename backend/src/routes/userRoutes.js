// routes/userRoutes.js
import express from 'express';
import userCtrl from '../controllers/userController.js';
router = express.Router();
const router = express.Router();
// On définit la route et on passe la fonction du contrôleur
router.get('/:id', userCtrl.getUserProfile);
router.post('/', userCtrl.createUser);

export default router;