'use strict';

const api = require('../utils/api');

const getMatches = async (req, res) => {
    try {
        const data = await api.getLeagueMatches();
        res.json(data);
    } catch (err) {
        res.status(500).json(e);
    }
};

module.exports = {
  getMatches,

};