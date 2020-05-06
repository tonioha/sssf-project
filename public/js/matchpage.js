'use strict';

const windowUrl = location.pathname;
const home = document.querySelector('.home');
const away = document.querySelector('.away');
const homepic = document.querySelector('.homepic');
const awaypic = document.querySelector('.awaypic');
const bestof = document.querySelector('.bestof');
const score = document.querySelector('.result');
const date = document.querySelector('.date');
const splitUrl = location.pathname.split('/');
const matchId = splitUrl[splitUrl.length-1];

const showLeagueResults = async () => {
    const lolQuery = {
        query: `
{
  leaguematch(id: ${matchId}) {
    id
    number_of_games
    begin_at
    opponents {
      opponent {
        name
        image_url
        id
      }
    }
    videogame {
      name
    }
    games {
      winner{
        id
      }
    }
  }
}
    `
    };
    const leagueData = await makeAQuery(lolQuery);
    showResult(leagueData.data.leaguematch);
};

const showDotaResults = async () => {
    const dotaQuery = {
        query: `
{
  dotamatch(id: ${matchId}) {
    id
    number_of_games
    begin_at
    opponents {
      opponent {
        name
        image_url
        id
      }
    }
    videogame {
      name
    }
    games {
      winner{
        id
      }
    }
  }
}
    `};
    const dotaData = await makeAQuery(dotaQuery);
    showResult(dotaData.data.dotamatch);
};

const showCsResults = async () => {
    const csgoQuery = {
        query: `
{
  csgomatch(id: ${matchId}) {
    id
    number_of_games
    begin_at
    opponents {
      opponent {
        name
        image_url
        id
      }
    }
    videogame {
      name
    }
    games {
      winner{
        id
      }
    }
  }
}
    `};
    const csData = await makeAQuery(csgoQuery);
    showResult(csData.data.csgomatch);
};

const showOwResults = async () => {
    const owQuery = {
        query: `
{
  owmatch(id: ${matchId}) {
    id
    number_of_games
    begin_at
    opponents {
      opponent {
        name
        image_url
        id
      }
    }
    videogame {
      name
    }
    games {
      winner{
        id
      }
    }
  }
}
    `};
    const owData = await makeAQuery(owQuery);
    showResult(owData.data.owmatch);
};

if (windowUrl.includes('lol')) {
    showLeagueResults();
} else if (windowUrl.includes('dota')) {
    showDotaResults();
} else if (windowUrl.includes('csgo')) {
    showCsResults();
} else if (windowUrl.includes('ow')) {
    showOwResults();
}

const showResult = (data) => {
    if (data.opponents.length > 0 && data.opponents[0].opponent) {
        home.innerText = data.opponents[0].opponent.name;
        homepic.src = data.opponents[0].opponent.image_url;
    }
    if (data.opponents.length > 1 && data.opponents[1].opponent) {
        away.innerText = data.opponents[1].opponent.name;
        awaypic.src = data.opponents[1].opponent.image_url;
    }
    bestof.innerText = `Best of ${data.number_of_games}`;
    if (data.games.length > 0 && data.opponents.length > 1) {
        addScores(data);
    }
    const pvm = new Date(parseInt(data.begin_at));
    let dateString = (pvm instanceof Date && isFinite(pvm)) ? `${pvm.getDate()}.${pvm.getMonth()+1}.${pvm.getFullYear()}` : 'Date not available';
    date.innerText = `${dateString}`;
};

const addScores = (data) => {
    const homeId = data.opponents[0].opponent.id;
    const awayId = data.opponents[1].opponent.id;
    let homeScore = 0;
    let awayScore = 0;
    for (const result of data.games) {
        if (result.winner.id === homeId) {
            homeScore++;
        } else if (result.winner.id === awayId) {
            awayScore++;
        }
    }
    score.innerText = `${homeScore} - ${awayScore}`;
};


