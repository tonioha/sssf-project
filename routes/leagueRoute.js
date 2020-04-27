'use strict';
const express = require('express');
const router = express.Router();
const leagueController = require('../controllers/leagueController');
const path = require('path');

router.get('/', leagueController.getMatches);
router.get('/:id', leagueController.getMatch);
router.get('/match/:id', (req, res) => {
    res.sendFile(path.join(__dirname + '/../public/match.html'));
});

module.exports = router;