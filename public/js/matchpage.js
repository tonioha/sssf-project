'use strict';

let data = [];
let xmlhttp = new XMLHttpRequest();
let url = window.location.href.replace('match/', '');
let home = document.querySelector('.home');
let away = document.querySelector('.away');


xmlhttp.onreadystatechange = () => {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        data = JSON.parse(xmlhttp.responseText);
        console.log('dataa: ', data);
        showResult(data);
    }
};
xmlhttp.open('GET', url, true);
xmlhttp.send();

const showResult = (data) => {
    home.innerText = data.opponents[0].opponent.name;
    away.innerText = data.opponents[1].opponent.name;
};