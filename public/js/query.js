'use strict';

let data = [];
let xmlhttp = new XMLHttpRequest();
let url = 'http://localhost:3000/lol';
let ul = document.querySelector('ul');
let main = document.getElementById('main');

xmlhttp.onreadystatechange = () => {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        data = JSON.parse(xmlhttp.responseText);
        //console.log('dataa: ', data);
        Results(data);
    }
};
xmlhttp.open('GET', url, true);
xmlhttp.send();

const displayResults = (data) => {

        for (let i = 0; i < data.length; i++) {
            console.log('opponents:', data[i].opponents[0]);

            let divi = document.createElement('div');
            divi.className = 'w3-row-padding';

            let divi2 = document.createElement('div');
            divi2.className = 'w3-third w3-container w3-margin-bottom';
            let divi3 = document.createElement('div');
            divi3.className = 'w3-container w3-white';

            let team1 = document.createElement('p');
            let team2 = document.createElement('p');
            team1.innerText = (data[i].opponents !== 'undefined' && data[i].opponents[0] !== undefined) ? data[i].opponents[0].opponent.name : 'null';
            team2.innerText = (data[i].opponents !== 'undefined' && data[i].opponents[1] !== undefined) ? data[i].opponents[1].opponent.name : 'null';

            divi3.appendChild(team1);
            divi3.appendChild(team2);

            divi2.appendChild(divi3);

            divi.appendChild(divi2);

            main.appendChild(divi);
        }
};

/*
const displayResults = (data) => {
    for (const result of data) {
        //console.log('wiineri', result.winner);
        ul.innerHTML += `
        <li>
            <h3>${result.name}</h3>
            <p>Winner: ${(result.winner !== null) ? result.winner.name : 'null'}</p>
            <p>Date: ${new Date(result.begin_at)}</p>
            <p>Tournament: ${result.league.name}</p>
        </li>
        `;
    }
};
 */

const Results = (data) => {
    for (let i = 0; i < data.length; i++) {
        if (i % 3 === 0) {
            console.log('diviä');
            main.innerHTML += `${i > 0 ? '</div>' : ''}
            `;

        }
        main.innerHTML += `
            <div id="${data[i].id}" class="w3-third w3-container w3-margin-bottom" onclick="showDetailed(${data[i].id})">
                <div class="w3-container w3-white">
                    <p>${(data[i].opponents !== 'undefined' && data[i].opponents[0] !== undefined) ? data[i].opponents[0].opponent.name : 'null'}</p>
                    <p>${(data[i].opponents !== 'undefined' && data[i].opponents[1] !== undefined) ? data[i].opponents[1].opponent.name : 'null'}</p>
                </div>
            </div>
        `;
    }
    main.innerHTML += `</div>`;
};

const showDetailed = (id) => {
    console.log('aaa');
    console.log(id);
};