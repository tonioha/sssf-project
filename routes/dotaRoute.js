'use strict';
const express = require('express');
const router = express.Router();
const dotaController = require('../controllers/dotaController');
const path = require('path');

router.get('/', dotaController.getMatches);
router.get('/:id', dotaController.getMatch);
router.get('/match/:id', (req, res) => {
    res.sendFile(path.join(__dirname + '/../public/match.html'));
});

module.exports = router;