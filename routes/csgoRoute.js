'use strict';
const express = require('express');
const router = express.Router();
const csgoRoute = require('../controllers/csgoController');

router.get('/', csgoRoute.getMatches);

module.exports = router;