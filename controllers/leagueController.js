'use strict';

const api = require('../utils/api');
const leagueResult = require('../models/leagueResultSchema');

const getMatches = async (req, res) => {
    try {
        //console.log('got request', req);
        const results = await api.getLeagueMatches();
        res.json(results);
    } catch (err) {
        res.status(500).json(err.message);
    }
};

const getMatch = async (req, res) => {
    try {
        const filter = {id: parseInt(req.params.id)};
        const result = await leagueResult.findOne(filter);
        if (result) {
            res.json(result);
        } else {
            res.json({});
        }
    } catch (err) {
        res.status(500).json(err.message);
    }
};

module.exports = {
    getMatches,
    getMatch,
};