'use strict';
require('dotenv').config();

const express = require('express');

const db = require('./utils/db');
const leagueRoute = require('./routes/leagueRoute');
const dotaRoute = require('./routes/dotaRoute');
const csgoRoute = require('./routes/csgoRoute');
const owRoute = require('./routes/owRoute');


const app = express();

app.use('/lol', leagueRoute);
app.use('/dota', dotaRoute);
app.use('/csgo', csgoRoute);
app.use('/ow', owRoute);
app.use('/', (req, res) => {
    res.send('My page');
});

db.on('connected', () => {
    app.listen(3000, () => {
        console.log(`Listening localhost, port 3000`);
    });
});