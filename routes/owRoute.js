'use strict';
const express = require('express');
const router = express.Router();
const owController = require('../controllers/owController');
const path = require('path');

router.get('/', owController.getMatches);
router.get('/:id', owController.getMatch);
router.get('/match/:id', (req, res) => {
    res.sendFile(path.join(__dirname + '/../public/match.html'));
});

module.exports = router;