const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const resultSchema = new Schema({
    begin_at: Date,
    detailed_stats: Boolean,
    draw: Boolean,
    end_at: {type: Date, default: null},
    forfeit: Boolean,
    game_advantage: {type: Boolean, default: null},
    id: Number,
    league_id: Number,
    live_embed_url: {type: String, default: null},
    live_url: {type: String, default: null},
    match_type: String,
    modified_at: Date,
    name: String,
    number_of_games: Number,
    original_scheduled_at: Date,
    rescheduled: Boolean,
    scheduled_at: Date,
    serie_id: Number,
    slug: String,
    status: String,
    tournament_id: Number,
    videogame_version: {type: String, default: null},
    winner: {type: String, default: null},
    winner_id: {type: Number, default: null}
    // TODO: arrays and objects and refs
});

module.exports = mongoose.model('DotaResult', resultSchema);