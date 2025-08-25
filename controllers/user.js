const userModel = require('../models/users');

const { setUser } = require("../services/auth.js");

const { v4 : uuidv4 } = require("uuid");

async function handleUserSignup(request , response)
{
    const { username , password , email } = request.body;

    // If user does not provide either the username or password or both, redirect the user to the login-page again.
    // This check should ideally be handled on the Frontend ------ (Scope of Improvement)
    if(!username || !password || !email)
    {
        return response.status(400).redirect("/signup");
    }

    // Check if the user is already registered ---- (Future Scope)

    // Adding the user to the database
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

    // If user does not provide either the username or password or both, redirect the user to the login-page again.
    // This check should ideally be handled on the Frontend ------ (Scope of Improvement)
    if(!username || !password)
    {
        return response.status(400).redirect("/login");
    }

    // Check if the user trying to log-in is actually a registered-user or not
    const user = await userModel.findOne( { username , password } );

    if(!user)
    {
        // If user is not found in the database, redirect the user to the sign-up page to first register themselves
        return response.status(400).redirect("/signup");
    }

    // Generating a sessionId
    const sessionId = uuidv4();

    // Maintaining a map of the the sessionId and its corresponding user
    setUser(sessionId , user);

    // Sending the sessionId inside a cookie in the response object
    response.cookie("sessionID" , sessionId);

    // Redirecting the logged-in user to the home page
    return response.redirect("/home");
}

module.exports = {
    handleUserSignup , 
    handleUserLogin
}