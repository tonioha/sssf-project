'use strict';

const api = require('../utils/api');
const leagueResult = require('../models/leagueResultSchema');

const getMatches = async (req, res) => {
    try {
        let results;
        if (req.query.team_id) {
            const id = parseInt(req.query.team_id);
            results = await leagueResult.find({"opponents.opponent.id": id});
            await res.json(results);
        } else {
            results = await api.getLeagueMatches();
            await res.json(results);
        }
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