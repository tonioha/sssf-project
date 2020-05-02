'use strict';

let data = [];
let xmlhttp = new XMLHttpRequest();
let url = 'http://env-3595870.jelastic.metropolia.fi/';
let main = document.getElementById('matchgrid');


xmlhttp.onreadystatechange = () => {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        data = JSON.parse(xmlhttp.responseText);
        displayResults(data);
    }
};
xmlhttp.open('GET', url+'lol', true);
xmlhttp.send();


const displayResults = (data) => {
    for (let i = 0; i < data.length; i++) {
        if (i % 3 === 0) {
            main.innerHTML += `${i > 0 ? '</div>' : ''}
            `;

        }
        main.innerHTML += `
            <div id="${data[i].id}" class="w3-third w3-container w3-margin-bottom ${data[i].videogame.name} match" onclick="showDetailed(this)">
                <div class="w3-container w3-white">
                    <p>${(data[i].opponents !== 'undefined' && data[i].opponents[0] !== undefined) ? data[i].opponents[0].opponent.name : 'TBA'}</p>
                    <p>${(data[i].opponents !== 'undefined' && data[i].opponents[1] !== undefined) ? data[i].opponents[1].opponent.name : 'TBA'}</p>
                </div>
            </div>
        `;
    }
    main.innerHTML += `</div>`;
};

const showDetailed = async (e) => {
    const game = (e.attributes.class.value).toLowerCase();
    const id = parseInt(e.attributes.id.value);

    if (game.includes('lol')) {
        window.open(`${url}lol/match/${id}`, '_blank', 'toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=500,width=500,height=500');
    } else if (game.includes('dota 2')) {
        window.open(`${url}dota/match/${id}`, '_blank', 'toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=500,width=500,height=500');
    } else if (game.includes('cs:go')) {
        window.open(`${url}csgo/match/${id}`, '_blank', 'toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=500,width=500,height=500');
    } else if (game.includes('overwatch')) {
        window.open(`${url}ow/match/${id}`, '_blank', 'toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=500,width=500,height=500');
    }
};

const clearMatches = () => {
  while (main.firstChild) {
      main.firstChild.remove();
  }
};

const showLeagueResults = async () => {
    clearMatches();
    const resp = await fetch(url+'lol');
    const data = await resp.json();
    displayResults(data);
};

const showDotaResults = async () => {
    clearMatches();
    const resp = await fetch(url+'dota');
    const data = await resp.json();
    displayResults(data);
};

const showCsResults = async () => {
    clearMatches();
    const resp = await fetch(url+'csgo');
    const data = await resp.json();
    displayResults(data);
};

const showOwResults = async () => {
    clearMatches();
    const resp = await fetch(url+'ow');
    const data = await resp.json();
    displayResults(data);
};




