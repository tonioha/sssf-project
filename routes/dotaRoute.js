'use strict';
const express = require('express');
const router = express.Router();
const dotaController = require('../controllers/dotaController');

router.get('/', dotaController.getMatches);
router.get('/:id', dotaController.getMatch);

module.exports = router;