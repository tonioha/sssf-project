'use strict';
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./utils/db');
const leagueRoute = require('./routes/leagueRoute');
const dotaRoute = require('./routes/dotaRoute');
const csgoRoute = require('./routes/csgoRoute');
const owRoute = require('./routes/owRoute');


const app = express();

app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded


app.use('/lol', leagueRoute);
app.use('/dota', dotaRoute);
app.use('/csgo', csgoRoute);
app.use('/ow', owRoute);

/*
app.use('/', (req, res) => {
    res.send('My page');
});
 */

db.on('connected', () => {
    app.listen(3000, () => {
        console.log(`Listening localhost, port 3000`);
    });
});