const express = require('express');

const userRouter = express.Router();

const userControllers = require('../controllers/user');

userRouter.post('/signup' , userControllers.handleUserSignup);

userRouter.post('/login' , userControllers.handleUserLogin);

module.exports = userRouter;