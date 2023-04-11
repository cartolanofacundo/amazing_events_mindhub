//imports
import { insertCards } from "../assets/modules/createCard.js";
import { data } from "../assets/data/data.js"
import { createCategories } from "../assets/modules/createCategory.js";
import { filterEvents } from "../assets/modules/useFilter.js";
//DATA
let events = data.eventos
let filterString = "";
let filterCategories = [];
const $categoriesContainer = document.getElementById("categoriesContainer")
const $searchButton = document.getElementById("searchSubmit");
const $cardsContainer = document.getElementById("cards-container")


createCategories(events, $categoriesContainer);
insertCards($cardsContainer, events, false);

//eventListeners
$searchButton.addEventListener("click", (e) => {
    e.preventDefault();
    filterString = document.getElementById("searchInput").value
    insertCards($cardsContainer,filterEvents(filterCategories, filterString, events), false)
})

$categoriesContainer.addEventListener("change", () => {
    const selectedCategories = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(check => check.value)
    filterCategories = selectedCategories;
    insertCards($cardsContainer,filterEvents(filterCategories, filterString, events), false)
})
