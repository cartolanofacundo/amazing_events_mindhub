//DATA
let events = data.eventos.filter((event) => {
    let dateEvent = new Date(event.date);
    let actualDate = new Date(data.fechaActual);
    if(dateEvent < actualDate){
        return event
    }
});

let monthAbbreviation = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
insertCards(events, monthAbbreviation)


function insertCards(events, abr) {
    let $container = document.getElementById("cards-container")
    $container.innerHTML = createCards(events, abr);
}

function createCards(events, abr) {
    let template = ""
    for (let event of events) {
        template += `<div class="col-12 col-sm-12 col-md-5 col-lg-4 col-xl-4 mb-5">
                            <div class="card card-event shadow bg-body-tertiary ">
                                <div class="card-header p-0">
                                    <img src="${event.image}" class="card-img-top img-cardPastEvents" alt="${event.name}">
                                </div>
                                <div class="card-body d-flex justify-content-between card-bodyHome">
                                    <div class="pr-2 text-center w-25">
                                    <p class="fecha-mes card-text text-muted">${abr[new Date(event.date).getMonth()]}</p>
                                    <p class="fecha-dia card-text text-muted">${new Date(event.date).getDate() + 1}</p>
                                    </div>
                                    <div class="container">
                                    <h5 class="card-title">${event.name}</h5>
                                    <p class="card-text text-secondary">${event.description}</p>
                                    </div>
                                </div>
                                <div class="card-footer bg-light px-4 py-3 d-flex justify-content-between align-items-center">
                                    <div>
                                        <span class="price text-muted">$${event.price}</span>
                                    </div>
                                    <div>
                                        <a href="./eventDetails.html" class="btn btn-secondary">Event details</a>
                                    </div>
                                </div>
                            </div>
                        </div>`
    }
    return template
}

//chequear