'use Strict';

let showAllBtn = document.querySelector('#show-all');
let showAllCostBtn = document.querySelector('#show-allCost');
let showAllClassBtn = document.querySelector('#show-allClass');
let showAllCostClassBtn = document.querySelector('#show-allCostClass');
let showChampIdBtn = document.querySelector('#show-champId');

let displayDiv = document.querySelector('.champ-output');
// let numOfTableRows = 0;

let ReadAllChamps = () => {
    fetch(`http://localhost:8080/champions/readAll`)
        .then((response) => {
            if (response.status !== 200) {
                console.log(`Status ${response.status}`);
                return;
            }
            response.json()
                .then((data) => {
                    console.log(data);
                    for(let i of data){
                    postData(i);
                    }
                })
                .catch((error) => console.log(error));

        })
}

let ReadAllChampsCost = () => {
    let champCost = document.getElementById('Champion Cost').value;
    fetch(`http://localhost:8080/champions/read/champByCost/${champCost}`)
        .then((response) => {
            if (response.status !== 200) {
                console.log(`Status ${response.status}`);
                return;
            }
            response.json()
                .then((data) => {
                    console.log(data);
                    for(let i of data){
                    postData(i);
                    }
                })
                .catch((error) => console.log(error));

        })
}

let ReadAllChampsClass = () => {
    let champClass = document.getElementById('Champion Class').value;

    fetch(`http://localhost:8080/champions/read/champByClass/${champClass}`)
        .then((response) => {
            if (response.status !== 200) {
                console.log(`Status ${response.status}`);
                return;
            }
            response.json()
                .then((data) => {
                    console.log(data);
                    for(let i of data){
                    postData(i);
                    }
                })
                .catch((error) => console.log(error));

        })
}

let ReadAllChampsCostClass = () => {
    let champCost = document.getElementById('Champion Cost').value;
    let champClass = document.getElementById('Champion Class').value;

    fetch(`http://localhost:8080/champions/read/champByClassAndCost/${champClass}/${champCost}`)
        .then((response) => {
            if (response.status !== 200) {
                console.log(`Status ${response.status}`);
                return;
            }
            response.json()
                .then((data) => {
                    console.log(data);
                    for(let i of data){
                    postData(i);
                    }
                })
                .catch((error) => console.log(error));

        })
}

let ReadChampId = () => {
    let id = document.getElementById('champIdBox').value;
    fetch(`http://localhost:8080/champions/read/champById/${id}`)
        .then((response) => {
            if (response.status !== 200) {
                console.log(`Status ${response.status}`);
                return;
            }
            response.json()
                .then((data) => {
                    console.log(data);
                    
                    postData(data);
                    
                })
                .catch((error) => console.log(error));

        })
}

let postData = (data) => {
    
    let newRow = document.createElement('tr');
    let champName = document.createElement('td');
    let champCost = document.createElement('td');
    let champClass = document.createElement('td');
    let champRoles = document.createElement('td');
    let champReleaseYear = document.createElement('td');
    let champOwned = document.createElement('td');
    let champOnSale = document.createElement('td');

    champName.innerHTML = data.champName;
    champCost.innerHTML = data.champCost;
    champClass.innerHTML = data.champClass;
    champRoles.innerHTML = data.champRoles;
    champReleaseYear.innerHTML = data.champReleaseYear;
    champOwned.innerHTML = data.champOwned;
    champOnSale.innerHTML = data.champOnSale;

    displayDiv.appendChild(newRow);
    displayDiv.appendChild(champName);
    displayDiv.appendChild(champCost);
    displayDiv.appendChild(champClass);
    displayDiv.appendChild(champRoles);
    displayDiv.appendChild(champReleaseYear);
    displayDiv.appendChild(champOwned);
    displayDiv.appendChild(champOnSale);
    
    // numOfTableRows++;
    // console.log(numOfTableRows);
}

// let clearTable = () => {

//     for(i = 1; i < numOfTableRows; i++){
//         document.getElementById('champ-table').deleteRow(1);
//     }

//     numOfTableRows = 0;  // resetting variable value.
// }

// document.addEventListener("DOMContentLoaded", ReadAllChamps);
// showAllBtn.addEventListener('click', clearTable);
// showAllCostBtn.addEventListener('click', clearTable);
showAllBtn.addEventListener('click', ReadAllChamps);
showAllCostBtn.addEventListener('click', ReadAllChampsCost);
showAllClassBtn.addEventListener('click', ReadAllChampsClass);
showAllCostClassBtn.addEventListener('click', ReadAllChampsCostClass);
showChampIdBtn.addEventListener('click', ReadChampId);
