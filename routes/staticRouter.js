const urlModel = require("../models/url").urlModel;

const express = require("express");

const router = express.Router();

router.get('/' , async (req , res) => {
    const allUrls = await urlModel.find({});
    return res.render("home" , { allUrls : allUrls });
});

module.exports = router;