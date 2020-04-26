'use strict';

const api = require('../utils/api');
const owResult = require('../models/owResultSchema');

const getMatches = async (req, res) => {
    try {
        const results = await api.getOwMatches();
        res.json(results);
    } catch (err) {
        res.status(500).json(e);
    }
};

const getMatch = async (req, res) => {
    try {
        const filter = {id: parseInt(req.params.id)};
        const result = await owResult.findOne(filter);
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