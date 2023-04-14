//imports
import { insertCards } from "../assets/modules/createCard.js";
import { createCategories } from "../assets/modules/createCategory.js";
import { filterEvents } from "../assets/modules/useFilter.js";
import { getEvents } from "../assets/modules/utils.js";
//DATA
let currentDate = undefined
let events = []
let filterString = "";
const urlDetails = "./eventDetails.html?id="
let filterCategories = [];
const $categoriesContainer = document.getElementById("categoriesContainer")
const $searchButton = document.getElementById("searchSubmit");
const $cardsContainer = document.getElementById("cards-container")
fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then((response) => response.json())
    .then((data) => {
        currentDate = data.currentDate;
        events = getEvents(data.events, currentDate, true)
        createCategories(events, $categoriesContainer);
        insertCards($cardsContainer, events, false, urlDetails)
    })

//eventListeners
$searchButton.addEventListener("click", (e) => {
    e.preventDefault();
    filterString = document.getElementById("searchInput").value
    insertCards($cardsContainer, filterEvents(filterCategories, filterString, events), false, urlDetails)
})

$categoriesContainer.addEventListener("change", () => {
    const selectedCategories = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(check => check.value)
    filterCategories = selectedCategories;
    insertCards($cardsContainer, filterEvents(filterCategories, filterString, events), false, urlDetails)
})

