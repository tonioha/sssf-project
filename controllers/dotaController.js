'use strict';

const dotaResult = require('../models/dotaResultSchema');

const getMatches = async (req, res) => {
    try {
        const results = await dotaResult.find();
        res.json(results);
    } catch (err) {
        res.status(500).json(e);
    }
};

module.exports = {
    getMatches,

};