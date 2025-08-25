const express = require("express");

const router = express.Router();

const urlControllers = require("../controllers/url.js");

router.post('/' , urlControllers.handleGenerateNewShortURL);

router.get('/analytics/:shortID' , urlControllers.handleGetAnalytics);

router.get('/test' , urlControllers.handleGetAllUrls);

router.get('/:shortId' , urlControllers.handleGetShortId);

module.exports = router; 