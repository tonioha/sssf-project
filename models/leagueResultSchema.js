const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const resultSchema = new Schema({
    begin_at: Date,
    draw: Boolean,
    end_at: {type: Date, default: null},
    forfeit: Boolean,
    id: {type: Number, unique: true},
    league_id: Number,
    match_type: String,
    modified_at: Date,
    name: String,
    number_of_games: {type: Number, default: 3},
    original_scheduled_at: Date,
    rescheduled: Boolean,
    scheduled_at: Date,
    serie_id: Number,
    slug: String,
    status: String,
    tournament_id: Number,
    videogame_version: {
        current: Boolean,
        name: String
    },
    winner: {
        acronym: {type: String, default: null},
        id: {type: Number, default: null},
        image_url: {type: String, default: null},
        location: {type: String, default: null},
        modified_at: {type: Date, default: null},
        name: {type: String, default: null},
        slug: {type: String, default: null}
    },
    winner_id: {type: Number, default: null},
    games: [
        {
            begin_at: {type: Date, default: null},
            end_at: {type: Date, default: null},
            finished: Boolean,
            forfeit: Boolean,
            id: Number,
            length: Number,
            match_id: Number,
            position: Number,
            status: String,
            winner: {
                id: {type: Number, default: null},
                type: {type: String, default: null}
            },
            winner_type: {type: String, default: null}
        }
    ],
    league: {
        id: Number,
        image_url: String,
        modified_at: Date,
        name: String,
        slug: String,
        url: {type: String, default: null}
    },
    serie: {
        begin_at: Date,
        description: {type: String, default: null},
        end_at: {type: Date, default: null},
        full_name: String,
        id: Number,
        league_id: Number,
        modified_at: Date,
        name: {type: String, default: null},
        season: {type: String, default: null},
        slug: String,
        winner_id: {type: Number, default: null},
        winner_type: {type: String, default: null},
        year: Number
    },
    tournament: {
        begin_at: Date,
        end_at: {type: Date, default: null},
        id: Number,
        league_id: Number,
        modified_at: Date,
        name: String,
        prizepool: String,
        serie_id: Number,
        slug: String,
        winner_id: {type: Number, default: null},
        winner_type: {type: String, default: null}
    },
    videogame: {
        id: Number,
        name: String,
        slug: String
    },
    opponents: [
        {
            opponent: {
                acronym: {type: String, default: null},
                id: {type: Number, default: 0},
                image_url: {type: String, default: null},
                location: {type: String, default: null},
                modified_at: {type: Date, default: null},
                name: {type: String, default: 'TBA'},
                slug: {type: String, default: null}
            },
            type: {type: String, default: null}
        }
    ]
});

module.exports = mongoose.model('LeagueResult', resultSchema);