require('dotenv').config()

const express = require('express');

const path = require("path");

const { connectMongoDB } = require('./connection');

const app = express();

const urlRouter = require("./routes/url.routes");

const staticRouter = require("./routes/staticRouter");

// const { urlModel } = require("./models/url");

const port = process.env.PORT;

connectMongoDB('mongodb://127.0.0.1:27017/URL_Shortener')
.then( () => {
    console.log('MongoDB Connected !');
    console.log('\n');
})
.catch( (err) => {
    console.log('Mongo Error' , err);
    console.log('\n');
});

app.set("view engine" , "ejs");

app.set("views" , path.resolve("./views"));

app.use(express.json());

app.use(express.urlencoded({extended : true}));


app.use('/url' , urlRouter);

app.use('/' , staticRouter);


// app.get('/:shortId' , async (req , res) => {
//     const shortId = req.params.shortId;
//     const entry = await urlModel.findOneAndUpdate( { shortId : shortId } , { $push : { visitHistory : { timestamp : Date.now() } } } );
//     res.redirect(entry.redirectUrl);
// });



app.listen(port , () => {
    console.log("Server Started !");
    console.log(`Server Running on port: ${port}`);
    console.log('\n');
} );