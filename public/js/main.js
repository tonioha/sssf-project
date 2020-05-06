'use strict';

let wLocation = window.location.href;
let main = document.getElementById('matchgrid');
const qBtn = document.getElementById('querybutton');

const clearMatches = () => {
    while (main.firstChild) {
        main.firstChild.remove();
    }
};

const displayResults = (data) => {
    for (let i = 0; i < data.length; i++) {
        const pvm = new Date(parseInt(data[i].begin_at));
        const date = (pvm instanceof Date && isFinite(pvm)) ? `${pvm.getDate()}.${pvm.getMonth()+1}.${pvm.getFullYear()}` : 'Date not available';
        if (i % 3 === 0) {
            main.innerHTML += `${i > 0 ? '</div>' : ''}
            `;

        }
        main.innerHTML += `
            <div id="${data[i].id}" class="w3-third w3-container w3-margin-bottom ${data[i].videogame.name} match" onclick="showDetailed(this)">
                <div class="w3-container w3-white">
                    <div class="opphome">${(data[i].opponents !== 'undefined' && data[i].opponents[0] !== undefined) ? data[i].opponents[0].opponent.name : 'TBA'}</div>
                    <div class="date">${date}</div>
                    <div class="oppaway">${(data[i].opponents !== 'undefined' && data[i].opponents[1] !== undefined) ? data[i].opponents[1].opponent.name : 'TBA'}</div>                
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
        window.open(`${wLocation}lol/match/${id}`, '_blank', 'toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=500,width=500,height=500');
    } else if (game.includes('dota 2')) {
        window.open(`${wLocation}dota/match/${id}`, '_blank', 'toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=500,width=500,height=500');
    } else if (game.includes('cs:go')) {
        window.open(`${wLocation}csgo/match/${id}`, '_blank', 'toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=500,width=500,height=500');
    } else if (game.includes('overwatch')) {
        window.open(`${wLocation}ow/match/${id}`, '_blank', 'toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=500,width=500,height=500');
    }
};

const showLeagueResults = async () => {
    clearMatches();
    const lolQuery = {
        query: `
{
  leaguematches {
    id
    begin_at
    opponents {
      opponent {
        name
      }
    }
    videogame {
      name
    }
  }
}
    `
    };
    const leagueData = await makeAQuery(lolQuery);
    displayResults(leagueData.data.leaguematches);
};

const showDotaResults = async () => {
    clearMatches();
    const dotaQuery = {
        query: `
        {
    dotamatches {
        id
        begin_at
        opponents {
        opponent {
            name
        }
    }
        videogame {
        name
            }
        }
    }
    `};
    const dotaData = await makeAQuery(dotaQuery);
    displayResults(dotaData.data.dotamatches);
};

const showCsResults = async () => {
    clearMatches();
    const csgoQuery = {
        query: `
        {
    csgomatches {
        id
        begin_at
        opponents {
        opponent {
            name
        }
    }
        videogame {
        name
            }
        }
    }
    `};
    const csData = await makeAQuery(csgoQuery);
    displayResults(csData.data.csgomatches);
};

const showOwResults = async () => {
    clearMatches();
    const owQuery = {
        query: `
        {
    owmatches {
        id
        begin_at
        opponents {
        opponent {
            name
        }
    }
        videogame {
        name
            }
        }
    }
    `};
    const owData = await makeAQuery(owQuery);
    displayResults(owData.data.owmatches);
};

showLeagueResults();

qBtn.addEventListener('click', () => {
    window.open(`${wLocation}mutation.html`);
});

window.onload = () => {
    const token = localStorage.getItem('token');
    if (token !== null) {
        document.getElementById('loginbutton').style.display = 'none';
        document.getElementById('querybutton').style.display = 'inline-block';
    }
};



