//imports
import { insertCards } from "../assets/modules/createCard.js";
import { createCategories } from "../assets/modules/createCategory.js";
import { filterEvents } from "../assets/modules/useFilter.js";
//DATA
let events = []
const urlDetails = "./pages/eventDetails.html?id="
let filterString = "";
let filterCategories = [];
const $categoriesContainer = document.getElementById("categoriesContainer")
const $searchButton = document.getElementById("searchSubmit");
const $cardsContainer = document.getElementById("cards-container")

fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then((response) => response.json())
    .then((data) => {
        events = data.events
        createCategories(events, $categoriesContainer);
        insertCards($cardsContainer, events, false, urlDetails)
    })

//eventListeners
$searchButton.addEventListener("click", (e) => {
    e.preventDefault();
    filterString = document.getElementById("searchInput").value
    insertCards($cardsContainer,filterEvents(filterCategories, filterString, events), false, urlDetails)
})

$categoriesContainer.addEventListener("change", () => {
    const selectedCategories = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(check => check.value)
    filterCategories = selectedCategories;
    insertCards($cardsContainer,filterEvents(filterCategories, filterString, events), false, urlDetails)
})
