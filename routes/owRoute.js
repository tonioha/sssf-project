'use strict';
const express = require('express');
const router = express.Router();
const owController = require('../controllers/owController');

router.get('/', owController.getMatches);
router.get('/:id', owController.getMatch);

module.exports = router;