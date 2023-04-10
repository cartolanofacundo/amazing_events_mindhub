//DATA
let events = data.eventos;
let monthAbbreviation = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
let categoriesGlobal = [];
const $searchButton = document.getElementById("searchSubmit");

insertCards(events, monthAbbreviation)
createCategories();
//eventListeners
$searchButton.addEventListener("click", (e) => {
    e.preventDefault();
    let filterString = document.getElementById("searchInput").value
    filterEvents([],filterString, events)
})



//funciones de filtrado
function filterEvents(categories, filterString, events){
    insertCards(filterEventsText(events, filterString), monthAbbreviation)
}
function filterEventsCategory(categories, events){
    const eventsFilter = events.filter(event => {
        for(let category of categories){
            if(category.value === event.category && category.show){
                return event;
            }
        }
    });
    return eventsFilter;
}
function filterEventsText(events, filterString) {
    let filteredTextEvents = events
    if(filterString && filterString !== ""){
        filteredTextEvents = events.filter((event) => foundText(event.name, event.description, filterString))
    }
    return filteredTextEvents;
}
function foundText(name,description,filterString  ) {
    if (name.toLowerCase().includes(filterString.toLowerCase()) || description.toLowerCase().includes(filterString.toLowerCase())) {
        return true;
    } else {
        return false;
    }
}







//funciones de cards

function insertCards(events, abr) {
    let $container = document.getElementById("cards-container")
    $container.innerHTML = createCards(events, abr);
}

function createCards(events, abr) {
    //query selector
    let template = ""
    for (let event of events) {
        template += `<div class="col-12 col-sm-12 col-md-5 col-lg-4 col-xl-4 mb-5">
                            <div class="card card-event shadow bg-body-tertiary">
                                <div class="card-header p-0">
                                    <img src="${event.image}" class="card-img-top" alt="${event.name}">
                                </div>
                                <div class="card-body d-flex justify-content-between card-bodyHome">
                                    <div class="pr-2 text-center w-25">
                                    <p class="fecha-mes card-text">${abr[new Date(event.date).getMonth()]}</p>
                                    <p class="fecha-dia card-text">${new Date(event.date).getDate() + 1}</p>
                                    </div>
                                    <div class="container">
                                    <h5 class="card-title">${event.name}</h5>
                                    <p class="card-text text-secondary">${event.description}</p>
                                    </div>
                                </div>
                                <div class="card-footer bg-light px-4 py-3 d-flex justify-content-between align-items-center">
                                    <div>
                                        <span class="price">$${event.price}</span>
                                    </div>
                                    <div>
                                        <a href="./assets/pages/eventDetails.html" class="btn btn-outline-primary btn-details">Event details</a>
                                    </div>
                                </div>
                            </div>
                        </div>`
    }
    return template
}

//funciones de categorias

function createCategories(){
    let id = 0;
    let categories = events.map((event) => event.category).reduce((acc, act) =>{
        if(!acc.includes(act)){
            acc.push(act);
        }
        return acc;
    },[])
    categories = categories.map((category) => {
        id++;
       return {
            id: id,
            value: category,
            show: false
        }
    })
    categoriesGlobal = categories;
    printCategories(categories)
}
function printCategories(categories){
    let template = ""
    for(let category of categories){
        console.log(category.value)
        let id = category.value.replace(/\s+/g, '')
        template += `<div>
                        <input type="checkbox" class="btn-check" id="${category.id}" autocomplete="off" value="${category.value}" ${category.show ? "checked" : ""}>
                        <label class="btn btn-outline-secondary me-2 my-2" for="${id}" onclick="showCategory(${category.id})">${category.value}</label>
                        </div>`
    }
    document.getElementById("categoryContainer").innerHTML = template
}

function showCategory(value){
    for(let category of categoriesGlobal){
        console.log("value" + value);
        console.log("category" + category.id)
        if(value === category.id){
            console.log("entre")
            category.show = !category.show
        }
    }
    printCategories(categoriesGlobal)
    filterEvents(categoriesGlobal);
}