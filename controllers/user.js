const userModel = require('../models/users');

const { setUser } = require("../services/auth.js");

const { v4 : uuidv4 } = require("uuid");

async function handleUserSignup(request , response)
{
    const { username , password , email } = request.body;

    if(!username || !password || !email)
    {
        return response.status(400).redirect("/signup");
    }

    await userModel.create( {
        username , 
        password , 
        email
    } );

    return response.redirect("/login");
}

async function handleUserLogin(request , response)
{
    const { username , password } = request.body;

    if(!username || !password)
    {
        return response.status(400).redirect("/login");
    }

    const user = await userModel.findOne( { username , password } );

    if(!user)
    {
        return response.status(400).redirect("/signup");
    }

    const sessionId = uuidv4();

    setUser(sessionId , user);

    // Sending the sessionId inside a cookie in the response object

    response.cookie("sessionID" , sessionId);

    return response.redirect("/");
}

module.exports = {
    handleUserSignup , 
    handleUserLogin
}