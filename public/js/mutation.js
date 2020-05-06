let data = [];

const gameList = document.getElementById('games');
const matchIdList = document.getElementById('matchids');
const homeName = document.getElementById('opponenthomename');
const homeId = document.getElementById('opponenthomeid');
const awayName = document.getElementById('opponentawayname');
const awayId = document.getElementById('opponentawayid');
const matchName = document.getElementById('matchname');
const submitBtn = document.getElementById('submitbtn');
const deleteBtn = document.getElementById('deletebtn');
const addBtn = document.getElementById('submitbtnadd');
const matchIdAdd = document.getElementById('matchidadd');
const matchNameAdd = document.getElementById('matchnameadd');
const homeNameAdd = document.getElementById('opponenthomenameadd');
const homeIdAdd = document.getElementById('opponenthomeidadd');
const awayNameAdd = document.getElementById('opponentawaynameadd');
const awayIdAdd = document.getElementById('opponentawayidadd');

const clearList = () => {
    document.querySelectorAll('#matchids option').forEach(option => option.remove());
};

const populateFields = (data) => {
    for (let i = 0; i < data.length; i++) {
        matchIdList.innerHTML += `
            <option value="${data[i].id}">${data[i].id}</option>
        `
    }
    matchName.value = data[matchIdList.options.selectedIndex].name;
    if (data[matchIdList.options.selectedIndex].opponents.length > 0 && data[matchIdList.options.selectedIndex].opponents[0].opponent) {
        homeName.value = data[matchIdList.options.selectedIndex].opponents[0].opponent.name;
        homeId.value = data[matchIdList.options.selectedIndex].opponents[0].opponent.id;
    } else {
        homeName.value = '';
        homeId.value = '';
    }
    if (data[matchIdList.options.selectedIndex].opponents.length > 1 && data[matchIdList.options.selectedIndex].opponents[0].opponent) {
        awayName.value = data[matchIdList.options.selectedIndex].opponents[1].opponent.name;
        awayId.value = data[matchIdList.options.selectedIndex].opponents[1].opponent.id;
    } else {
        awayName.value = '';
        awayId.value = '';
    }
};

const showLeagueResults = async () => {
    clearList();
    const lolQuery = {
        query: `
{
  leaguematches {
    id
    begin_at
    opponents {
      opponent {
        name
        id
      }
    }
    videogame {
      name
    }
    winner_id
    games {
      winner {
        id
      }
    }
    name
  }
}
    `
    };
    const leagueData = await makeAQuery(lolQuery);
    data = leagueData.data.leaguematches;
    data.sort((a, b) => {
        return a.id - b.id;
    });
    populateFields(data);
};

const showDotaResults = async () => {
    clearList();
    const dotaQuery = {
        query: `
{
  dotamatches {
    id
    begin_at
    opponents {
      opponent {
        name
        id
      }
    }
    videogame {
      name
    }
    winner_id
    games {
      winner {
        id
      }
    }
    name
  }
}
    `
    };
    const dotaData = await makeAQuery(dotaQuery);
    data = dotaData.data.dotamatches;
    data.sort((a, b) => {
        return a.id - b.id;
    });
    populateFields(data);
};

const showCsResults = async () => {
    clearList();
    const csgoQuery = {
        query: `
{
  csgomatches {
    id
    begin_at
    opponents {
      opponent {
        name
        id
      }
    }
    videogame {
      name
    }
    winner_id
    games {
      winner {
        id
      }
    }
    name
  }
}
    `
    };
    const csData = await makeAQuery(csgoQuery);
    data = csData.data.csgomatches;
    data.sort((a, b) => {
        return a.id - b.id;
    });
    populateFields(data);
};

const showOwResults = async () => {
    clearList();
    const owQuery = {
        query: `
{
  owmatches {
    id
    begin_at
    opponents {
      opponent {
        name
        id
      }
    }
    videogame {
      name
    }
    winner_id
    games {
      winner {
        id
      }
    }
    name
  }
}
    `
    };
    const owData = await makeAQuery(owQuery);
    data = owData.data.owmatches;
    data.sort((a, b) => {
        return a.id - b.id;
    });
    populateFields(data);
};

if (gameList.options.selectedIndex === 0) {
    showLeagueResults();
} else if (gameList.options.selectedIndex === 1) {
    showDotaResults();
} else if (gameList.options.selectedIndex === 2) {
    showCsResults();
} else if (gameList.options.selectedIndex === 3) {
    showOwResults();
}

matchIdList.addEventListener('change', () => {
    matchName.value = data[matchIdList.options.selectedIndex].name;
    if (data[matchIdList.options.selectedIndex].opponents.length > 0 && data[matchIdList.options.selectedIndex].opponents[0].opponent) {
        homeName.value = data[matchIdList.options.selectedIndex].opponents[0].opponent.name;
        homeId.value = data[matchIdList.options.selectedIndex].opponents[0].opponent.id;
    } else {
        homeName.value = '';
        homeId.value = '';
    }
    if (data[matchIdList.options.selectedIndex].opponents.length > 1 && data[matchIdList.options.selectedIndex].opponents[1].opponent) {
        awayName.value = data[matchIdList.options.selectedIndex].opponents[1].opponent.name;
        awayId.value = data[matchIdList.options.selectedIndex].opponents[1].opponent.id;
    } else {
        awayName.value = '';
        awayId.value = '';
    }
});

gameList.addEventListener('change', () => {
    const index = gameList.options.selectedIndex;
    if (index === 0) {
        showLeagueResults();
    } else if (index === 1) {
        showDotaResults();
    } else if (index === 2) {
        showCsResults();
    } else if (index === 3) {
        showOwResults();
    }
});

const submitFormModify = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (token === null) {
        alert('Log in first');
        return;
    }
    const game = gameList.value;
    const matchid = parseInt(matchIdList.value);
    const mName = matchName.value;
    const hName = homeName.value;
    const hId = parseInt(homeId.value);
    const aName = awayName.value;
    const aId = parseInt(awayId.value);

    if (!mName || !hName || !hId || !aName || !aId) {
        alert('Check fields');
        return;
    }

    const modifyQuery = {
        query: `
            mutation {
            modifyMatch(id:${matchid}, videogame: {name:"${game}"},
            opponents: [
        {opponent: {id:${hId}, name:"${hName}"}},
      {opponent: {id: ${aId}, name:"${aName}"}}
    ],
    name:"${mName}" 
     ) {
    id
    begin_at
    opponents {
      opponent {
        name
        id
      }
    }
    videogame {
      name
    }
    winner_id
    name
  }
}
        `
    };

    const resp = await makeATokenQuery(modifyQuery);
    if (resp.errors) {
        alert('Something went wrong.');
        return;
    }
    data[matchIdList.options.selectedIndex] = resp.data.modifyMatch;
};

const submitFormDelete = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (token === null) {
        alert('Log in first');
        return;
    }
    const game = gameList.value;
    const matchid = parseInt(matchIdList.value);

    const deleteQuery = {
        query: `
            mutation {
            deleteMatch(id:${matchid}, game:"${game}") {
                id
             }
        }
        `
    };

    const resp = await makeATokenQuery(deleteQuery);
    if (resp.errors) {
        alert('Something went wrong.');
        return;
    }
    data.splice(matchIdList.options.selectedIndex, 1);
    await clearList();
    populateFields(data);
};

const submitFormAdd = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (token === null) {
        alert('Log in first');
        return;
    }
    const game = document.getElementById('gamesadd').value;
    const matchid = parseInt(matchIdAdd.value);
    const mName = matchNameAdd.value;
    const hName = homeNameAdd.value;
    const hId = parseInt(homeIdAdd.value);
    const aName = awayNameAdd.value;
    const aId = parseInt(awayIdAdd.value);

    if (!matchid || !mName || !hName || !hId || !aName || !aId) {
        alert('Check fields');
        return;
    }

    const addQuery = {
        query: `
        mutation {
            addMatch(id: ${matchid}, name:"${mName}", opponents: [{opponent:{id:${hId},name:"${hName}"}}, 
        {opponent:{id:${aId}, name:"${aName}"}}],
        videogame: {name:"${game}"}) {
        id
        }
    }
        `
    };
    const resp = await makeATokenQuery(addQuery);
    if (resp.errors) {
        alert('Match id already found in database');
        return;
    }
    showLeagueResults();
};

submitBtn.addEventListener('click', submitFormModify);
deleteBtn.addEventListener('click', submitFormDelete);
addBtn.addEventListener('click', submitFormAdd);




