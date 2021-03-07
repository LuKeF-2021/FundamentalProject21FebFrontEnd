'use Strict';

let deleteChampIdBtn = document.querySelector('#del-byid')  // gets delete by id button
let deleteChampNameBtn = document.querySelector('#del-byname');  // gets delete by name button
let displayDiv = document.querySelector('.champ-output');

let GetChampId = () => {
    let champId = document.getElementById('champIdBox').value;

    if (champId == "") {
        alert('Please enter the ID of the champ you wish to delete.')
    } else {

        fetch(`http://localhost:8080/champions/delete/${champId}`, {
            method: `DELETE`
        })
            .then((data) => console.log(`Champ Deleted!`))
            .catch((error) => console.log(error));


    }

}

let GetChampName = () => {
    let champName = document.getElementById('champNameBox').value;

    champName = champName.toLowerCase();

    if (champName == "") {
        alert('Please enter the name of the champ you wish to delete.')
    } else {

        fetch(`http://localhost:8080/champions/delete/byChamp/${champName}`, {
            method: `DELETE`
        })
            .then((data) => console.log(`Champ Deleted!`))
            .catch((error) => console.log(error));


    }
    
}

deleteChampIdBtn.addEventListener('click', GetChampId);
deleteChampNameBtn.addEventListener('click', GetChampName);


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

}

document.addEventListener("DOMContentLoaded", ReadAllChamps);

