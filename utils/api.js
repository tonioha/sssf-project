'use strict';

const axios = require('axios');

const LEAGUE_BASE_URL = `https://api.pandascore.co/lol/`;
const CSGO_BASE_URL = `https://api.pandascore.co/csgo/`;
const DOTA_BASE_URL = `https://api.pandascore.co/dota2/`;
const OW_BASE_URL = `https://api.pandascore.co/ow/`;

const API_KEY = process.env.API_TOKEN;

const getLeagueMatches = async () => {
    const URL = `${LEAGUE_BASE_URL}matches/?token=${API_KEY}`;
    let data = [];
    await axios.get(URL)
        .then(res => {
            //console.log('res data: ', res.data);
            //console.log('res: ', res);
            data.push(res.data);
        })
        .catch(err => {
            console.log(err);
        });
    return data;
};

const getDotaMatches = async () => {
    const URL = `${DOTA_BASE_URL}matches/?token=${API_KEY}`;
    let data = [];
    await axios.get(URL)
        .then(res => {
            data.push(res.data);
        })
        .catch(err => {
            console.log(err);
        });
    return data;
};


module.exports = {
    getLeagueMatches,
    getDotaMatches,

};