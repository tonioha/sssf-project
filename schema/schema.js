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


const csgo = require('../models/csgoResultSchema');
const league = require('../models/leagueResultSchema');
const dota = require('../models/dotaResultSchema');
const ow = require('../models/owResultSchema');

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
       opponents: {type: new GraphQLList(opponentType)}
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
           resolve(parent, args) {
               return league.findOne({id: parseInt(args.id)});
           },
       },
       leaguematches: {
           type: new GraphQLList(resultType),
           description: 'Get all League of Legends matches',
           args: {
               // TODO: Queries with args
           },
           resolve: (parent, args) => {
               return league.find();
           },
       },
       dotamatch: {
           type: resultType,
           description: 'Get Dota 2 match by id',
           args: {id: {type: GraphQLID}},
           resolve(parent, args) {
               return dota.findOne({id: parseInt(args.id)});
           },
       },
       dotamatches: {
           type: new GraphQLList(resultType),
           description: 'Get all Dota 2 matches',
           args: {
               // TODO: Queries with args
           },
           resolve: (parent, args) => {
               return dota.find();
           },
       },
       csgomatch: {
           type: resultType,
           description: 'Get CS:GO match by id',
           args: {id: {type: GraphQLID}},
           resolve(parent, args) {
               return csgo.findOne({id: parseInt(args.id)});
           },
       },
       csgomatches: {
           type: new GraphQLList(resultType),
           description: 'Get all CS:GO matches',
           args: {
               // TODO: Queries with args
           },
           resolve: (parent, args) => {
               return csgo.find();
           },
       },
       owmatch: {
           type: resultType,
           description: 'Get Overwatch match by id',
           args: {id: {type: GraphQLID}},
           resolve(parent, args) {
               return ow.findOne({id: parseInt(args.id)});
           },
       },
       owmatches: {
           type: new GraphQLList(resultType),
           description: 'Get all Overwatch matches',
           args: {
               // TODO: Queries with args
           },
           resolve: (parent, args) => {
               return ow.find();
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
            resolve: async (parent, args) => {
                try {
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
                        throw new Error('Bad videogame name');
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
            resolve: async (parent, args) => {
                try {
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
                        throw new Error('Bad videogame gategory');
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