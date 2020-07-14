"use strict"

// replacing and refactoring the outdated code
function renderCoffee(coffee) {
    var html = '<div class="coffee row col-6" id="coffee">';
    html += '<div hidden>' + "" + coffee.id + '</div>';
    html += '<h5>' + coffee.name + '</h5>';
    html += '<p>' + coffee.roast + '</p>';
    html += '</div>';
    return html;

}

// printing coffees in ascending order
//    setting i = 0 instead of i >= 0
//    set i < coffees.length instead of i = coffees.length
//    set i++ instead of i--
function renderCoffees(coffees) {
    var html = '';
    for (var i = 0; i < coffees.length; i++) {
        html += renderCoffee(coffees[i]);
    }
    return html;
}

// edited updateCoffees function to reflect needs of the instructions
function updateCoffees(e) {
    if (e) {
        e.preventDefault(); // don't submit the form, we just want to update the data
    }
    let selectedRoast = roastSelection.value;
    let filteredCoffees = [];
    let coffeeName = document.getElementById("coffee-name");
    coffees.forEach(function (coffee) {
        if (coffee.roast === selectedRoast) {
            if (coffee.name.toLowerCase().includes(coffeeName.value.toLowerCase())) {
                filteredCoffees.push(coffee);
            }
        } else if (selectedRoast === 'all') {
            if (coffee.name.toLowerCase().includes(coffeeName.value.toLowerCase())) {
                filteredCoffees.push(coffee);
            }
        }
    });
    tbody.innerHTML = renderCoffees(filteredCoffees);
}

// using dom events to allow user to add new coffee types to the page
function addNewCoffee(e) {
    e.preventDefault(); // don't submit the form, we just want to update the data
    let coffeeName = newCoffeeName.value;
    let newSelectedRoast = newRoastSelection.value;
    if (coffeeName !== '') {
        coffees.push({id: coffees.length + 1, name: coffeeName, roast: newSelectedRoast})
        updateCoffees(e);

        // adding local storage to store inside of coffees array as string
        localStorage.setItem("coffees", JSON.stringify(coffees));
    }
    newCoffeeName.value = "";
}

// adding event so when page loads the function will run and display new coffee to screen
window.addEventListener('DOMContentLoaded', function (event) {
    // getting items from local storage and setting as variable
    let coffeeStorage = localStorage.getItem("coffees");
    if (coffeeStorage != null) {
        // parsing coffeeStorage to an object
        coffees = JSON.parse(coffeeStorage);
        updateCoffees();
    }
});


// left array as is there wasnt a need to change anything
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


// query selectors for the DOM
var tbody = document.querySelector('#coffees');
var inputText = document.querySelector('#coffee-name');
var roastSelection = document.querySelector('#roast-selection');
var submitButton = document.querySelector('#submit');
var newRoastSelection = document.querySelector('#new-roast-selection');
var newCoffeeName = document.querySelector('#new-coffee-name');

tbody.innerHTML = renderCoffees(coffees);
// added event listeners for the DOM
inputText.addEventListener('input', updateCoffees);
roastSelection.addEventListener('change', updateCoffees);
submitButton.addEventListener('click', addNewCoffee);
