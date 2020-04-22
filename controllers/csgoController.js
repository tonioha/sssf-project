'use strict';

const api = require('../utils/api');

const getMatches = async (req, res) => {
    try {
        const results = await api.getCsgoMatches();
        res.json(results);
    } catch (err) {
        res.status(500).json(e);
    }
};

module.exports = {
    getMatches,

};