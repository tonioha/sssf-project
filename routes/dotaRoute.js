'use strict';
const express = require('express');
const router = express.Router();
const dotaController = require('../controllers/dotaController');

router.get('/', dotaController.getMatches);

module.exports = router;