'use strict';
const express = require('express');
const router = express.Router();
const csgoRoute = require('../controllers/csgoController');

router.get('/', csgoRoute.getMatches);
router.get('/:id', csgoRoute.getMatch);

module.exports = router;