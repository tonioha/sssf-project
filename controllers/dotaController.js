'use strict';

const api = require('../utils/api');
const dotaResult = require('../models/dotaResultSchema');

const getMatches = async (req, res) => {
    try {
        const results = await api.getDotaMatches();
        res.json(results);
    } catch (err) {
        res.status(500).json(e);
    }
};

const getMatch = async (req, res) => {
    try {
        const filter = {id: parseInt(req.params.id)};
        const result = await dotaResult.findOne(filter);
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