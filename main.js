"use strict"

function renderCoffee(coffee) {
    var html = '<div class="coffee">';
    html += '<div class="tableData">' + coffee.id + '</div>';
    html += '<div class="tableData">' + coffee.name + '</div>';
    html += '<div class="tableData">' + coffee.roast + '</div>';
    html += '</div>';

    return html;
}

// printing coffees in ascending order
//    setting i = 0 instead of i >= 0
//    set i < coffees.length instead of i = coffees.length
//    set i++ instead of i--
function renderCoffees(coffees) {
    var html = '';
    for(var i = 0; i < coffees.length; i++) {
        html += renderCoffee(coffees[i]);
    }
    return html;
}

function updateCoffees(e) {
    e.preventDefault(); // don't submit the form, we just want to update the data
    var selectedRoast = roastSelection.value;
    var filteredCoffees = [];
    coffees.forEach(function(coffee) {
        if (coffee.roast === selectedRoast) {
            filteredCoffees.push(coffee);
        }
        else if (selectedRoast === 'all')
            filteredCoffees.push(coffee);
});
    tbody.innerHTML = renderCoffees(filteredCoffees);
}

// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
var coffees = [
    {id: 1, name: 'Light City', roast: 'light'},
    {id: 2, name: 'Half City', roast: 'light'},
    {id: 3, name: 'Cinnamon', roast: 'light'},
    {id: 4, name: 'City', roast: 'medium'},
    {id: 5, name: 'American', roast: 'medium'},
    {id: 6, name: 'Breakfast', roast: 'medium'},
    {id: 7, name: 'High', roast: 'dark'},
    {id: 8, name: 'Continental', roast: 'dark'},
    {id: 9, name: 'New Orleans', roast: 'dark'},
    {id: 10, name: 'European', roast: 'dark'},
    {id: 11, name: 'Espresso', roast: 'dark'},
    {id: 12, name: 'Viennese', roast: 'dark'},
    {id: 13, name: 'Italian', roast: 'dark'},
    {id: 14, name: 'French', roast: 'dark'},
];


var tbody = document.querySelector('#coffees');
var submitButton = document.querySelector('#submit');
var roastSelection = document.querySelector('#roast-selection');

tbody.innerHTML = renderCoffees(coffees);

submitButton.addEventListener('click', updateCoffees);

//Adds all option
function addAllRoast () {
    //Creates new element
    let allOptionTag = document.createElement("option");
    let newAll = document.createTextNode("all");
    allOptionTag.appendChild(newAll);
    //References existing elements to receive new element
    let roastSelection = document.getElementById("roast-selection");
    let lightOption = roastSelection.firstElementChild;
    //Inserts new element into referenced existing element
    roastSelection.insertBefore(allOptionTag, lightOption);
}
addAllRoast();



// setting function selectedCoffee for interaction with submit
function selectedCoffee() {
    let selectedRoast = roastSelection.value;
    let filteredCoffees = [];
    let coffeeName= document.getElementById("coffee-name");
    coffees.forEach(function(coffee) {
        if (selectedRoast === "all") {
            if (coffee.name.toLowerCase().includes(coffeeName.value.toLowerCase())) {
                filteredCoffees.push(coffee);
            }
        } else if (coffee.roast === selectedRoast) {
            if (coffee.name.toLowerCase().includes(coffeeName.value.toLowerCase())) {
                filteredCoffees.push(coffee);
            }

        }
    });
    tbody.innerHTML = renderCoffees(filteredCoffees);
}
selectedCoffee();