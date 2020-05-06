'use strict';

const axios = require('axios');
const dotaResult = require('../models/dotaResultSchema');
const leagueResult = require('../models/leagueResultSchema');
const csgoResult = require('../models/csgoResultSchema');
const owResult = require('../models/owResultSchema');

const LEAGUE_BASE_URL = `https://api.pandascore.co/lol/`;
const CSGO_BASE_URL = `https://api.pandascore.co/csgo/`;
const DOTA_BASE_URL = `https://api.pandascore.co/dota2/`;
const OW_BASE_URL = `https://api.pandascore.co/ow/`;

const API_KEY = process.env.API_TOKEN;


const getDotaMatches = async () => {
    let results = await dotaResult.find();
    if(!results.length) {
        await queryDotaMatches();
        results = await dotaResult.find();
    }
    return results;
};

const getLeagueMatches = async () => {
    let results = await leagueResult.find();
    if(!results.length) {
        await queryLeagueMatches();
        results = await leagueResult.find();
    }
    return results;
};

const getCsgoMatches = async () => {
    let results = await csgoResult.find();
    if(!results.length) {
        await queryCsgoMatches();
        results = await csgoResult.find();
    }
    return results;
};

const getOwMatches = async () => {
    let results = await owResult.find();
    if(!results.length) {
        await queryOwMatches();
        results = await owResult.find();
    }
    return results;
};

const queryLeagueMatches = async () => {
    const URL = `${LEAGUE_BASE_URL}matches/?token=${API_KEY}`;
    await axios.get(URL)
        .then(res => {
            saveLeagueResultsToDb(res.data);
        })
        .catch(err => {
            console.log(err);
        });
};

const queryDotaMatches = async () => {
    const URL = `${DOTA_BASE_URL}matches/?token=${API_KEY}`;
    console.log('getting data');
    await axios.get(URL)
        .then(res => {
            saveDotaResultsToDb(res.data);
        })
        .catch(err => {
            console.log(err);
        });
};

const queryCsgoMatches = async () => {
    const URL = `${CSGO_BASE_URL}matches/?token=${API_KEY}`;
    await axios.get(URL)
        .then(res => {
            saveCsgoResultsToDb(res.data);
        })
        .catch(err => {
            console.log(err);
        });
};

const queryOwMatches = async () => {
    const URL = `${OW_BASE_URL}matches/?token=${API_KEY}`;
    await axios.get(URL)
        .then(res => {
            saveOwResultsToDb(res.data);
        })
        .catch(err => {
            console.log(err);
        });
};

const saveDotaResultsToDb = async (data) => {
    console.log('here dota');
    const dotaresults = await Promise.all(data.map(async rslt => {
        let newDresult = new dotaResult(rslt);
        const filter = {id: newDresult.id};
        const savedResult = await dotaResult.findOneAndUpdate(filter, rslt, {
            new: true,
            upsert: true
        });
        console.log(`Succesfully added result to db with id: ${savedResult._id}`)
    }));
    console.log('length ', dotaresults.length);
};

const saveLeagueResultsToDb = async (data) => {
    const leagueresults = await Promise.all(data.map(async rslt => {
        let newLresult = new leagueResult(rslt);
        const filter = {id: newLresult.id};
        const savedResult = await leagueResult.findOneAndUpdate(filter, rslt, {
            new: true,
            upsert: true
        });
        console.log(`Succesfully added result to db with id: ${savedResult._id}`)
    }));
    console.log('length ', leagueresults.length);
};

const saveCsgoResultsToDb = async (data) => {
    const csresults = await Promise.all(data.map(async rslt => {
        let newCSresult = new csgoResult(rslt);
        const filter = {id: newCSresult.id};
        const savedResult = await csgoResult.findOneAndUpdate(filter, rslt, {
            new: true,
            upsert: true
        });
        console.log(`Succesfully added result to db with id: ${savedResult._id}`)
    }));
    console.log('length ', csresults.length);
};

const saveOwResultsToDb = async (data) => {
    const owresults = await Promise.all(data.map(async rslt => {
        let newOWresult = new owResult(rslt);
        const filter = {id: newOWresult.id};
        const savedResult = await owResult.findOneAndUpdate(filter, rslt, {
            new: true,
            upsert: true
        });
        console.log(`Succesfully added result to db with id: ${savedResult._id}`)
    }));
    console.log('length ', owresults.length);
};


module.exports = {
    getLeagueMatches,
    getDotaMatches,
    getCsgoMatches,
    getOwMatches,
};