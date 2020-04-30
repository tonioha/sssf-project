'use strict';
const express = require('express');
const router = express.Router();
const csgoRoute = require('../controllers/csgoController');
const path = require('path');

router.get('/', csgoRoute.getMatches);
router.get('/:id', csgoRoute.getMatch);
router.get('/match/:id', (req, res) => {
    res.sendFile(path.join(__dirname + '/../public/match.html'));
});

module.exports = router;