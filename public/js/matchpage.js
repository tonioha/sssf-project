'use strict';

let data = [];
let xmlhttp = new XMLHttpRequest();
let url = window.location.href.replace('match/', '');
let home = document.querySelector('.home');
let away = document.querySelector('.away');
let homepic = document.querySelector('.homepic');
let awaypic = document.querySelector('.awaypic');
let bestof = document.querySelector('.bestof');
let score = document.querySelector('.result');
let date = document.querySelector('.date');


xmlhttp.onreadystatechange = () => {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        data = JSON.parse(xmlhttp.responseText);
        showResult(data);
    }
};
xmlhttp.open('GET', url, true);
xmlhttp.send();

const showResult = (data) => {
    if (data.opponents.length > 0 && data.opponents[0].opponent) {
        home.innerText = data.opponents[0].opponent.name;
        homepic.src = data.opponents[0].opponent.image_url;
    }
    if (data.opponents.length > 0 && data.opponents[1].opponent) {
        away.innerText = data.opponents[1].opponent.name;
        awaypic.src = data.opponents[1].opponent.image_url;
    }
    bestof.innerText = `Best of ${data.number_of_games}`;
    if (data.games.length > 0 && data.opponents.length > 0) {
        addScores(data);
    }
    const pvm = new Date(data.begin_at);
    date.innerText = `${pvm.getDate()}.${pvm.getMonth()+1}.${pvm.getFullYear()}`;
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