let xmlhttp = new XMLHttpRequest();
let url = 'https://env-3595870.jelastic.metropolia.fi/';
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

xmlhttp.onreadystatechange = () => {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        const resp = JSON.parse(xmlhttp.responseText);
        data = resp.data.leaguematches;
        data.sort((a, b) => {
            return a.id - b.id;
        });
        populateFields(data);
    }
};
xmlhttp.open('POST', url + 'graphql', true);
xmlhttp.setRequestHeader('Content-Type', 'application/json');
xmlhttp.send(JSON.stringify(lolQuery));

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

const showLeagueResults = async () => {
    clearList();
    const resp = await fetch(url + 'graphql', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(lolQuery)
    });
    const leagueData = await resp.json();
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
    const resp = await fetch(url + 'graphql', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(dotaQuery)
    });
    const dotaData = await resp.json();
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
    const resp = await fetch(url + 'graphql', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(csgoQuery)
    });
    const csData = await resp.json();
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
    const resp = await fetch(url + 'graphql', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(owQuery)
    });
    const owData = await resp.json();
    data = owData.data.owmatches;
    data.sort((a, b) => {
        return a.id - b.id;
    });
    populateFields(data);
};

const submitFormModify = async (e) => {
    e.preventDefault();
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


    const resp = await fetch(url + 'graphql', {
        method: 'POST',
        headers: {'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')},
        body: JSON.stringify(modifyQuery)
    });
    const respJson = await resp.json();
    data[matchIdList.options.selectedIndex] = respJson.data.modifyMatch;

};

const submitFormDelete = async (e) => {
    e.preventDefault();
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

    const resp = await fetch(url + 'graphql', {
        method: 'POST',
        headers: {'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')},
        body: JSON.stringify(deleteQuery)
    });
    //const respJson = await resp.json();
    data.splice(matchIdList.options.selectedIndex, 1);
    await clearList();
    populateFields(data);
};

const clearList = () => {
    document.querySelectorAll('#matchids option').forEach(option => option.remove());
};

submitBtn.addEventListener("click", submitFormModify);
deleteBtn.addEventListener("click", submitFormDelete);




