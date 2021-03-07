'use Strict';

// initialising roles string to empty

let rolesPlayed = "";

// initialising booleans to false as checkboxes start off unticked.

let topIsRole = false;
let jungleIsRole = false;
let midIsRole = false;
let adcIsRole = false;
let supportIsRole = false;
let champOwned = "false";
let champOnSale = "false";

let addChampBtn = document.querySelector('.btn');  // gets add button and stores it in this variable.


let changed_top = (checkbox) => {   // checks if top (league role) check box is ticked
    if (checkbox.checked) {
        topIsRole = true;
    } else {
        topIsRole = false;
    }

}

let changed_jungle = (checkbox) => {    // checks if jungle check box is ticked
    if (checkbox.checked) {
        jungleIsRole = true;
    } else {
        jungleIsRole = false;
    }


}

let changed_mid = (checkbox) => {     // checks if mid check box is ticked
    if (checkbox.checked) {
        midIsRole = true;
    } else {
        midIsRole = false;
    }


}

let changed_adc = (checkbox) => {   // checks if adc check box is ticked
    if (checkbox.checked) {
        adcIsRole = true;
    } else {
        adcIsRole = false;
    }


}

let changed_support = (checkbox) => {       // checks if support check box is ticked
    if (checkbox.checked) {
        supportIsRole = true;
    } else {
        supportIsRole = false;
    }


}

let champ_owned = (checkbox) => {        // checks if owned check box is ticked
    if (checkbox.checked) {
        champOwned = "true";
    } else {
        champOwned = "false";
    }


}

let champ_on_sale = (checkbox) => {        // checks if on sale check box is ticked
    if (checkbox.checked) {
        champOnSale = "true";
    } else {
        champOnSale = "false";
    }


}

let GetChampDetails = () => {
    rolesPlayed = "";   // resetting string to empty incase user enters multiple champions.
    let rolesChecked = 0; // used to make sure user checks atleast one role checkbox, so incomplete entries cannot be passed onto the controller.
    let champName = document.getElementById('champNameBox').value;
    let champCost = document.getElementById('Champion Cost').value;
    let champClass = document.getElementById('Champion Class').value;
    let champRelease = document.getElementById('champReleaseYear').value;

    champName = champName.toLowerCase();
    champClass = champClass.toLowerCase();

    // if statements to format the string in the way i want it displayed in backend and passed into DB like this.

    if (topIsRole == true && rolesPlayed == "") {
        rolesPlayed += "top";
        rolesChecked++;
    } else if (topIsRole == true) {
        rolesPlayed += ", top";
        rolesChecked++;
    }

    if (jungleIsRole == true && rolesPlayed == "") {
        rolesPlayed += "jungle";
        rolesChecked++;
    } else if (jungleIsRole == true) {
        rolesPlayed += ", jungle";
        rolesChecked++;
    }

    if (midIsRole == true && rolesPlayed == "") {
        rolesPlayed += "mid";
        rolesChecked++;
    } else if (midIsRole == true) {
        rolesPlayed += ", mid";
        rolesChecked++;
    }

    if (adcIsRole == true && rolesPlayed == "") {
        rolesPlayed += "adc";
        rolesChecked++;
    } else if (adcIsRole == true) {
        rolesPlayed += ", adc";
        rolesChecked++;
    }

    if (supportIsRole == true && rolesPlayed == "") {
        rolesPlayed += "support";
        rolesChecked++;
    } else if (supportIsRole == true) {
        rolesPlayed += ", support";
        rolesChecked++;
    }

    if (rolesChecked > 0 && champName != "" && champCost != "" && champClass != "" && champRelease != "") {  // if atleast one role selected, and no field empty then successfully send data.
       

        const newChamp = {
            "champName": champName,
            "champCost": champCost,
            "champClass": champClass,
            "champRoles": rolesPlayed,
            "champReleaseYear": champRelease,
            "champOwned": champOwned,
            "champOnSale": champOnSale
        };

        fetch(`http://localhost:8080/champions/create`, {
            method: `POST`, // Declaring the method
            headers: {
                "Content-type": "application/json" // Header
            },
            body: JSON.stringify(newChamp) // What data to post
        })
            .then((response) => {
                if (response.status !== 201) { // Status code of 201
                    console.log(`Status ${response.status}`);
                    return;
                } else {
                    console.log(`All good! ${response.status}`);
                }
                response.json()
                    .then((data) => console.log(`Request succesful with JSON response ${data}`))
                    .catch((error) => console.log(error))
            });

    } else if (rolesChecked == 0) {   // fields entered but no roles checked
        alert('Please select atleast one champion role.');
    } else {   // roles checked, but some fields not entered.
        alert('Please fill in all fields.');
    }
}

addChampBtn.addEventListener('click', GetChampDetails);


