const { getUser } = require("../services/auth.js");

function restrictToLoggedInUsersOnly(request , response , next)
{
    const userSessionID = request.cookies?.sessionID;

    if(!userSessionID)
    {
        return response.redirect("/login");
    }

    const user = getUser(userSessionID);

    if(!user)
    {
        return response.redirect("/login");
    }

    request.user = user;

    next();
} 

module.exports = { restrictToLoggedInUsersOnly };