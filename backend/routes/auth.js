const express = require('express');

const router = express.Router();

const authController = require('../controllers/auth');
const isAuth = require('../middleware/isAuth');

router.post('/sign-up', authController.signUpUser);

router.post('/sign-in', authController.signInUser);

router.get('/sign-out', authController.signOutUser);

router.get('/:id', isAuth, authController.getUser);

router.delete('/:id', isAuth, authController.deleteUser);

router.patch('/:id', isAuth, authController.updateUser);

module.exports = router;
