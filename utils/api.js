'use strict';

const axios = require('axios');
const dotaResult = require('../models/dotaResultSchema');
const leagueResult = require('../models/leagueResultSchema');

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
    saveLeagueResultsToDb(data);
    // return data;
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
    saveDotaResultsToDb(data);
    // return data;
};

const saveDotaResultsToDb = async (data) => {
    // console.log('winner', data[0][46].winner);
    const dotaresults = await Promise.all(data[0].map(async rslt => {
        let newDresult = new dotaResult(rslt);
        const savedResult = await newDresult.save();
        console.log(`Succesfully added result to db with id: ${savedResult._id}`)
    }));
    console.log('length ', dotaresults.length);
    //const dotarslt = await dotaResult.create(data[0][0]);
    //console.log(`Succesfully added result to db with id: ${dotarslt._id}`);
};

const saveLeagueResultsToDb = async (data) => {
    // console.log('winner', data[0][46].winner);
    const leagueresults = await Promise.all(data[0].map(async rslt => {
        let newLresult = new leagueResult(rslt);
        const savedResult = await newLresult.save();
        console.log(`Succesfully added result to db with id: ${savedResult._id}`)
    }));
    console.log('length ', leagueresults.length);
    //const dotarslt = await dotaResult.create(data[0][0]);
    //console.log(`Succesfully added result to db with id: ${dotarslt._id}`);
};


module.exports = {
    getLeagueMatches,
    getDotaMatches,

};