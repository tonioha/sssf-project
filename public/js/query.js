'use strict';

let data = [];
let xmlhttp = new XMLHttpRequest();
let url = 'http://localhost:3000/lol';
let ul = document.querySelector('ul');

xmlhttp.onreadystatechange = () => {
  if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
      data = JSON.parse(xmlhttp.responseText);
      //console.log('dataa: ', data);
      displayResults(data);
  }
};
xmlhttp.open('GET', url, true);
xmlhttp.send();

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