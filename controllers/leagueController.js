'use strict';

const api = require('../utils/api');

const getMatches = async (req, res) => {
    try {
        //console.log('got request', req);
        const results = await api.getLeagueMatches();
        res.json(results);
    } catch (err) {
        res.status(500).json(e);
    }
};

module.exports = {
  getMatches,

};