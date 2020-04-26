'use strict';

const api = require('../utils/api');
const csgoResult = require('../models/csgoResultSchema');

const getMatches = async (req, res) => {
    try {
        const results = await api.getCsgoMatches();
        res.json(results);
    } catch (err) {
        res.status(500).json(e);
    }
};

const getMatch = async (req, res) => {
    try {
        const filter = {id: parseInt(req.params.id)};
        const result = await csgoResult.findOne(filter);
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