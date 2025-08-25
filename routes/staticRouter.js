const urlModel = require("../models/url").urlModel;

const express = require("express");
const { restrictToLoggedInUsersOnly } = require("../middlewares/auth");

const staticRouter = express.Router();

staticRouter.get('/signup' , (request , response) => {
    return response.render("signup");
} );

staticRouter.get('/login' , (request , response) => {
    return response.render("login");
} );

staticRouter.get('/home' , restrictToLoggedInUsersOnly , async (request , response) => {
    const { username , password } = request.user;
    const allUrls = await urlModel.find({username , password});
    return response.render("home" , { allUrls : allUrls });
})

module.exports = staticRouter;