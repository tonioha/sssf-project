'use strict';

const leagueResult = require('../models/leagueResultSchema');

const getMatches = async (req, res) => {
    try {
        const results = await leagueResult.find();
        res.json(results);
    } catch (err) {
        res.status(500).json(e);
    }
};

module.exports = {
  getMatches,

};