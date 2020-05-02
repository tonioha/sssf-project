const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLSchema,
    GraphQLNonNull,
    GraphQLInputObjectType,


} = require('graphql');

const authController = require('../controllers/authController');

const csgo = require('../models/csgoResultSchema');
const league = require('../models/leagueResultSchema');
const dota = require('../models/dotaResultSchema');
const ow = require('../models/owResultSchema');
const user = require('../models/userSchema');

const bcrypt = require('bcrypt');
const saltRound = 12;

const resultType = new GraphQLObjectType({
    name: 'resulttype',
    fields: () => ({
        id: {type: GraphQLID},
        begin_at: {type: GraphQLString},
        draw: {type: GraphQLBoolean},
        end_at: {type: GraphQLString, defaultValue: 'null'},
        forfeit: {type: GraphQLBoolean},
        league_id: {type: GraphQLInt},
        match_type: {type: GraphQLString},
        modified_at: {type: GraphQLString},
        name: {type: GraphQLString},
        number_of_games: {type: GraphQLInt},
        original_scheduled_at: {type: GraphQLString},
        rescheduled: {type: GraphQLBoolean},
        scheduled_at: {type: GraphQLString},
        serie_id: {type: GraphQLInt},
        slug: {type: GraphQLString},
        status: {type: GraphQLString},
        tournament_id: {type: GraphQLInt},
        videogame_version: {type: videogameversionType},
        winner: {type: winnerType},
        winner_id: {type: GraphQLInt},
        games: {type: new GraphQLList(gamesType)},
        league: {type: leagueResultType},
        serie: {type: serieType},
        tournament: {type: tournamentType},
        videogame: {type: videogameType},
        opponents: {type: new GraphQLList(opponentsType)}
    })
});

const opponentsType = new GraphQLObjectType({
    name: 'opponentstype',
    fields: () => ({
        type: {type: GraphQLString},
        opponent: {type: opponentType}
    })
});

const videogameversionType = new GraphQLObjectType({
    name: 'videogameversiontype',
    fields: () => ({
        current: {type: GraphQLBoolean},
        name: {type: GraphQLString}
    })
});

const winnerType = new GraphQLObjectType({
    name: 'winnertype',
    fields: () => ({
        acronym: {type: GraphQLString},
        id: {type: GraphQLID},
        image_url: {type: GraphQLString},
        location: {type: GraphQLString},
        modified_at: {type: GraphQLString},
        name: {type: GraphQLString},
        slug: {type: GraphQLString}
    })
});

const gamesType = new GraphQLObjectType({
    name: 'gamestype',
    fields: () => ({
        begin_at: {type: GraphQLString},
        end_at: {type: GraphQLString},
        finished: {type: GraphQLBoolean},
        forfeit: {type: GraphQLBoolean},
        id: {type: GraphQLID},
        length: {type: GraphQLInt},
        match_id: {type: GraphQLInt},
        position: {type: GraphQLInt},
        status: {type: GraphQLString},
        winner: {type: gamewinnerType},
        winner_type: {type: GraphQLString}
    })
});

const gamewinnerType = new GraphQLObjectType({
    name: 'gamewinnertype',
    fields: () => ({
        id: {type: GraphQLID},
        type: {type: GraphQLString}
    })
});

const leagueResultType = new GraphQLObjectType({
    name: 'leaguetype',
    fields: () => ({
        id: {type: GraphQLID},
        image_url: {type: GraphQLString},
        modified_at: {type: GraphQLString},
        name: {type: GraphQLString},
        slug: {type: GraphQLString},
        url: {type: GraphQLString}
    })
});

const serieType = new GraphQLObjectType({
    name: 'serietype',
    fields: () => ({
        begin_at: {type: GraphQLString},
        description: {type: GraphQLString},
        end_at: {type: GraphQLString},
        full_name: {type: GraphQLString},
        id: {type: GraphQLID},
        league_id: {type: GraphQLInt},
        modified_at: {type: GraphQLString},
        name: {type: GraphQLString},
        season: {type: GraphQLString},
        slug: {type: GraphQLString},
        winner_id: {type: GraphQLInt},
        winner_type: {type: GraphQLString},
        year: {type: GraphQLInt}
    })
});

const tournamentType = new GraphQLObjectType({
    name: 'tournamenttype',
    fields: () => ({
        begin_at: {type: GraphQLString},
        end_at: {type: GraphQLString},
        id: {type: GraphQLID},
        league_id: {type: GraphQLInt},
        modified_at: {type: GraphQLString},
        name: {type: GraphQLString},
        prizepool: {type: GraphQLString},
        serie_id: {type: GraphQLInt},
        slug: {type: GraphQLString},
        winner_in: {type: GraphQLInt},
        winner_type: {type: GraphQLString}
    })
});

const videogameType = new GraphQLObjectType({
    name: 'videogametype',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        slug: {type: GraphQLString}
    })
});


const opponentType = new GraphQLObjectType({
    name: 'opponentype',
    fields: () => ({
        acronym: {type: GraphQLString},
        id: {type: GraphQLID},
        image_url: {type: GraphQLString},
        location: {type: GraphQLString},
        modified_at: {type: GraphQLString},
        name: {type: GraphQLString},
        slug: {type: GraphQLString}
    })
});

const userType = new GraphQLObjectType({
    name: 'user',
    fields: () => ({
        id: {type: GraphQLID},
        username: {type: GraphQLString},
        token: {type: GraphQLString}
    }),
});

const InputVideogameversionType = new GraphQLInputObjectType({
    name: 'InputVideogameversiontype',
    fields: () => ({
        current: {type: GraphQLBoolean},
        name: {type: GraphQLString}
    })
});

const InputWinnerType = new GraphQLInputObjectType({
    name: 'InputWinnertype',
    fields: () => ({
        acronym: {type: GraphQLString},
        id: {type: GraphQLID},
        image_url: {type: GraphQLString},
        location: {type: GraphQLString},
        modified_at: {type: GraphQLString},
        name: {type: GraphQLString},
        slug: {type: GraphQLString}
    })
});

const InputGamesType = new GraphQLInputObjectType({
    name: 'InputGamestype',
    fields: () => ({
        begin_at: {type: GraphQLString},
        end_at: {type: GraphQLString},
        finished: {type: GraphQLBoolean},
        forfeit: {type: GraphQLBoolean},
        id: {type: GraphQLID},
        length: {type: GraphQLInt},
        match_id: {type: GraphQLInt},
        position: {type: GraphQLInt},
        status: {type: GraphQLString},
        winner: {type: InputGamewinnerType},
        winner_type: {type: GraphQLString}
    })
});

const InputGamewinnerType = new GraphQLInputObjectType({
    name: 'InputGamewinnertype',
    fields: () => ({
        id: {type: GraphQLID},
        type: {type: GraphQLString}
    })
});

const InputLeagueResultType = new GraphQLInputObjectType({
    name: 'InputLeaguetype',
    fields: () => ({
        id: {type: GraphQLID},
        image_url: {type: GraphQLString},
        modified_at: {type: GraphQLString},
        name: {type: GraphQLString},
        slug: {type: GraphQLString},
        url: {type: GraphQLString}
    })
});

const InputSerieType = new GraphQLInputObjectType({
    name: 'InputSerietype',
    fields: () => ({
        begin_at: {type: GraphQLString},
        description: {type: GraphQLString},
        end_at: {type: GraphQLString},
        full_name: {type: GraphQLString},
        id: {type: GraphQLID},
        league_id: {type: GraphQLInt},
        modified_at: {type: GraphQLString},
        name: {type: GraphQLString},
        season: {type: GraphQLString},
        slug: {type: GraphQLString},
        winner_id: {type: GraphQLInt},
        winner_type: {type: GraphQLString},
        year: {type: GraphQLInt}
    })
});

const InputTournamentType = new GraphQLInputObjectType({
    name: 'InputTournamenttype',
    fields: () => ({
        begin_at: {type: GraphQLString},
        end_at: {type: GraphQLString},
        id: {type: GraphQLID},
        league_id: {type: GraphQLInt},
        modified_at: {type: GraphQLString},
        name: {type: GraphQLString},
        prizepool: {type: GraphQLString},
        serie_id: {type: GraphQLInt},
        slug: {type: GraphQLString},
        winner_in: {type: GraphQLInt},
        winner_type: {type: GraphQLString}
    })
});

const InputVideogameType = new GraphQLInputObjectType({
    name: 'InputVideogametype',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        slug: {type: GraphQLString}
    })
});

const InputOpponentType = new GraphQLInputObjectType({
    name: 'InputOpponentype',
    fields: () => ({
        acronym: {type: GraphQLString},
        id: {type: GraphQLID},
        image_url: {type: GraphQLString},
        location: {type: GraphQLString},
        modified_at: {type: GraphQLString},
        name: {type: GraphQLString},
        slug: {type: GraphQLString}
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        leaguematch: {
            type: resultType,
            description: 'Get League of Legends match by id',
            args: {id: {type: GraphQLID}},
            resolve: async (parent, args) => {
                try {
                    return await league.findOne({id: parseInt(args.id)});
                } catch (err) {
                    throw new Error(err);
                }
            },
        },
        leaguematches: {
            type: new GraphQLList(resultType),
            description: 'Get all League of Legends matches',
            args: {
                serie_id: {type: GraphQLInt},
                tournament_id: {type: GraphQLInt},
                winner_id: {type: GraphQLInt},
                league_id: {type: GraphQLInt},
                team_id: {type: GraphQLInt}
            },
            resolve: async (parent, args) => {
                try {
                    let query = {};
                    if (args.serie_id) {
                        query.serie_id = args.serie_id;
                    }
                    if (args.tournament_id) {
                        query.tournament_id = args.tournament_id;
                    }
                    if (args.winner_id) {
                        query.winner_id = args.winner_id;
                    }
                    if (args.league_id) {
                        query.league_id = args.league_id;
                    }
                    if (args.team_id) {
                        query['opponents.opponent.id'] = args.team_id;
                    }
                    return await league.find(query);
                } catch (err) {
                    throw new Error(err);
                }
            },
        },
        dotamatch: {
            type: resultType,
            description: 'Get Dota 2 match by id',
            args: {id: {type: GraphQLID}},
            resolve: async (parent, args) => {
                try {
                    return await dota.findOne({id: parseInt(args.id)});
                } catch (err) {
                    throw new Error(err);
                }
            },
        },
        dotamatches: {
            type: new GraphQLList(resultType),
            description: 'Get all Dota 2 matches',
            args: {
                serie_id: {type: GraphQLInt},
                tournament_id: {type: GraphQLInt},
                winner_id: {type: GraphQLInt},
                league_id: {type: GraphQLInt},
                team_id: {type: GraphQLInt}
            },
            resolve: async (parent, args) => {
                try {
                    let query = {};
                    if (args.serie_id) {
                        query.serie_id = args.serie_id;
                    }
                    if (args.tournament_id) {
                        query.tournament_id = args.tournament_id;
                    }
                    if (args.winner_id) {
                        query.winner_id = args.winner_id;
                    }
                    if (args.league_id) {
                        query.league_id = args.league_id;
                    }
                    if (args.team_id) {
                        query['opponents.opponent.id'] = args.team_id;
                    }
                    return await dota.find(query);
                } catch (err) {
                    throw new Error(err);
                }
            },
        },
        csgomatch: {
            type: resultType,
            description: 'Get CS:GO match by id',
            args: {id: {type: GraphQLID}},
            resolve: async (parent, args) => {
                try {
                    return await csgo.findOne({id: parseInt(args.id)});
                } catch (err) {
                    throw new Error(err);
                }
            },
        },
        csgomatches: {
            type: new GraphQLList(resultType),
            description: 'Get all CS:GO matches',
            args: {
                serie_id: {type: GraphQLInt},
                tournament_id: {type: GraphQLInt},
                winner_id: {type: GraphQLInt},
                league_id: {type: GraphQLInt},
                team_id: {type: GraphQLInt}
            },
            resolve: async (parent, args) => {
                try {
                    let query = {};
                    if (args.serie_id) {
                        query.serie_id = args.serie_id;
                    }
                    if (args.tournament_id) {
                        query.tournament_id = args.tournament_id;
                    }
                    if (args.winner_id) {
                        query.winner_id = args.winner_id;
                    }
                    if (args.league_id) {
                        query.league_id = args.league_id;
                    }
                    if (args.team_id) {
                        query['opponents.opponent.id'] = args.team_id;
                    }
                    return await csgo.find(query);
                } catch (err) {
                    throw new Error(err);
                }
            },
        },
        owmatch: {
            type: resultType,
            description: 'Get Overwatch match by id',
            args: {id: {type: GraphQLID}},
            resolve: async (parent, args) => {
                try {
                    return await ow.findOne({id: parseInt(args.id)});
                } catch (err) {
                    throw new Error(err);
                }
            },
        },
        owmatches: {
            type: new GraphQLList(resultType),
            description: 'Get all Overwatch matches',
            args: {
                serie_id: {type: GraphQLInt},
                tournament_id: {type: GraphQLInt},
                winner_id: {type: GraphQLInt},
                league_id: {type: GraphQLInt},
                team_id: {type: GraphQLInt}
            },
            resolve: async (parent, args) => {
                try {
                    let query = {};
                    if (args.serie_id) {
                        query.serie_id = args.serie_id;
                    }
                    if (args.tournament_id) {
                        query.tournament_id = args.tournament_id;
                    }
                    if (args.winner_id) {
                        query.winner_id = args.winner_id;
                    }
                    if (args.league_id) {
                        query.league_id = args.league_id;
                    }
                    if (args.team_id) {
                        query['opponents.opponent.id'] = args.team_id;
                    }
                    return await ow.find(query);
                } catch (err) {
                    throw new Error(err);
                }
            },
        },
        login: {
            type: userType,
            description: 'Login with username and password to receive token.',
            args: {
                username: {type: new GraphQLNonNull(GraphQLString)},
                password: {type: new GraphQLNonNull(GraphQLString)},
            },
            resolve: async (parent, args, {req, res}) => {
                req.body = args; // inject args to request body for passport
                try {
                    const authResponse = await authController.login(req, res);
                    return {
                        id: authResponse.user._id,
                        ...authResponse.user,
                        token: authResponse.token,
                    };
                } catch (err) {
                    throw new Error(err);
                }
            },
        },
    }
});


const Mutation = new GraphQLObjectType({
    name: 'MutationType',
    fields: () => ({
        addMatch: {
            type: resultType,
            description: 'Add match or update an existing match',
            args: {
                id: {type: new GraphQLNonNull(GraphQLID)},
                begin_at: {type: new GraphQLNonNull(GraphQLString)},
                draw: {type: GraphQLBoolean},
                end_at: {type: GraphQLString},
                forfeit: {type: GraphQLBoolean},
                league_id: {type: new GraphQLNonNull(GraphQLInt)},
                match_type: {type: GraphQLString},
                modified_at: {type: GraphQLString},
                name: {type: GraphQLString},
                number_of_games: {type: GraphQLInt},
                original_scheduled_at: {type: GraphQLString},
                rescheduled: {type: GraphQLBoolean},
                scheduled_at: {type: GraphQLString},
                serie_id: {type: new GraphQLNonNull(GraphQLInt)},
                slug: {type: GraphQLString},
                status: {type: GraphQLString},
                tournament_id: {type: new GraphQLNonNull(GraphQLInt)},
                videogame_version: {type: InputVideogameversionType},
                winner: {type: InputWinnerType},
                winner_id: {type: GraphQLInt},
                games: {type: new GraphQLList(InputGamesType)},
                league: {type: new GraphQLNonNull(InputLeagueResultType)},
                serie: {type: new GraphQLNonNull(InputSerieType)},
                tournament: {type: new GraphQLNonNull(InputTournamentType)},
                videogame: {type: new GraphQLNonNull(InputVideogameType)},
                opponents: {type: new GraphQLList(InputOpponentType)}
            },
            resolve: async (parent, args, {req, res}) => {
                try {
                    await authController.checkAuth(req, res);
                    const game = args.videogame.name.toLowerCase();
                    const filter = {id: args.id};
                    if (game.includes('lol')) {
                        return await league.findOneAndUpdate(filter, args, {
                            new: true,
                            upsert: true
                        });
                    } else if (game.includes('dota-2')) {
                        return await dota.findOneAndUpdate(filter, args, {
                            new: true,
                            upsert: true
                        });
                    } else if (game.includes('cs:go')) {
                        return await csgo.findOneAndUpdate(filter, args, {
                            new: true,
                            upsert: true
                        });
                    } else if (game.includes('overwatch')) {
                        return await ow.findOneAndUpdate(filter, args, {
                            new: true,
                            upsert: true
                        });
                    } else {
                        throw new Error('Bad videogame category');
                    }
                } catch (err) {
                    throw new Error(err);
                }
            }
        },
        deleteMatch: {
            type: resultType,
            description: 'Delete a match from database. Provide match id and game category (lol, dota-2, overwatch, or cs:go)',
            args: {
                id: {type: new GraphQLNonNull(GraphQLID)},
                game: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve: async (parent, args, {req, res}) => {
                try {
                    await authController.checkAuth(req, res);
                    const game = args.game.toLowerCase();
                    const filter = {id: args.id}
                    if (game.includes('lol')) {
                        return await league.findOneAndDelete(filter);
                    } else if (game.includes('dota-2')) {
                        return await dota.findOneAndDelete(filter);
                    } else if (game.includes('cs:go')) {
                        return await csgo.findOneAndDelete(filter);
                    } else if (game.includes('overwatch')) {
                        return await ow.findOneAndDelete(filter);
                    } else {
                        throw new Error('Bad videogame category');
                    }
                } catch (err) {
                    throw new Error(err);
                }
            }
        },
        registerUser: {
            type: userType,
            description: 'Register user.',
            args: {
                username: {type: new GraphQLNonNull(GraphQLString)},
                password: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve: async (parent, args, {req, res}) => {
                try {
                    const hash = await bcrypt.hash(args.password, saltRound);
                    const userWithHash = {
                        username: args.username,
                        password: hash
                    };
                    const newUser = new user(userWithHash);
                    const result = await newUser.save();
                    if (result !== null) {
                        // automatic login
                        req.body = args; // inject args to request body for passport
                        console.log('args:', args);
                        const authResponse = await authController.login(req, res);
                        console.log('ar', authResponse);
                        return {
                            id: authResponse.user._id,
                            ...authResponse.user,
                            token: authResponse.token,
                        };
                    } else {
                        throw new Error('insert fail');
                    }
                } catch (err) {
                    throw new Error(err);
                }
            }
        }
    })
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});