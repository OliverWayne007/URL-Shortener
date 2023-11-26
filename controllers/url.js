const mongoose = require("mongoose");

const urlModel = require("../models/url").urlModel;

const shortid = require("shortid");

const handleGenerateNewShortURL = async (req , res) => {
    const shortID = shortid();
    const body = req.body;
    if(!body || !body.redirectURL)
    {
        return res.status(400).json( { Error : "Please provide all the required fields !" } );
    }
    const redirectURL = body.redirectURL;
    await urlModel.create({
        shortId : shortID , 
        redirectUrl : redirectURL , 
        visitHistory : []
    });
    // return res.status(200).json( { Status : "Short URL Generated Successfully !" , ShortID : shortID } );
    return res.render("home" , { shortID : shortID });
}

const handleGetAnalytics = async (req , res) => {
    const shortID = req.params.shortID;
    const document = await urlModel.findOne({shortId : shortID});
    if(!document)
    {
        return res.status(400).json( { Error : "No such Short ID exists !" } );
    }
    const totalClicks = document.visitHistory.length;
    const analytics = document.visitHistory;
    return res.status(200).json( { TotalClicks : totalClicks , Analytics : analytics } );
}

const handleGetAllUrls = async (req , res) => {
    const allUrls = await urlModel.find({});
    // return res.send(`
    // <html>
    // <head>
    // <title> Getting All Urls </title>
    // </head>
    // <body>
    // <ol>
    // ${ allUrls.map( (url) => { return `<li> ${url.shortId} ---> ${url.redirectUrl} ---> ${url.visitHistory.length} </li>` } ).join('') }
    // </ol>
    // </body>
    // </html>
    // `);
    return res.render("home" , { allUrls : allUrls} );
}

const handleGetShortId = async (req , res) => {
    const shortId = req.params.shortId;
    const entry = await urlModel.findOneAndUpdate( { shortId : shortId } , { $push : { visitHistory : { timestamp : Date.now() } } } );
    res.redirect(entry.redirectUrl);
}

module.exports = {
    handleGenerateNewShortURL , 
    handleGetAnalytics , 
    handleGetAllUrls , 
    handleGetShortId
};