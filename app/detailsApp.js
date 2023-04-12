import { data } from "../assets/data/data.js";
const events = data.eventos;
const actualDate = data.fechaActual
const abr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const $container = document.getElementById("detailsContainer")
printEventDetails();

function createTemplate(event) {
    let isUpcoming = new Date(event.date) > new Date(actualDate)
    return `<div class="container-fluid cover-container">
                        <img src="${event.image}" class="img-fluid cover-image" alt="${event.name}">
                    </div>
                    <div class="details-container d-flex flex-column justify-content-center align-items-center">
                        <div class="rounded-4 col-12 col-md-9 col-lg-9 col-xl-9 col-xxl-9 bg-light border p-3 card-details-container">
                            <div class="header-description d-flex justify-content-between align-items-start">
                                <div class="date-container me-4 border px-4 py-2 text-center rounded">
                                    <p class="m-0 fs-4 day">${new Date(event.date).getDate() + 1}</p>
                                    <p class="m-0 fs-5 month">${abr[new Date(event.date).getMonth()]}</p>
                                </div>
                            <div class="title-container flex-grow-1 d-flex justify-content-between flex-column align-items-start">
                                <h4 class="m-0 mb-1">${event.name}</h4>
                                <p class="text-secondary m-0 mb-2"><i class="bi bi-geo-alt"></i> ${event.place}</p>
                                <span class="badge rounded-pill text-bg-secondary"><i class="bi bi-tag-fill"></i> ${event.category}</span>
                            </div>
                            <div class="function-container d-flex align-items-center pt-1">
                                <button class="btn btn-outline-secondary contact-btn"><i class="bi bi-envelope"></i> Contact</button>
                                <div class="vr mx-2 divider"></div>
                                <button class="btn ${isUpcoming ? "btn-details-buy" : "btn-secondary"} btn-hidden" ${isUpcoming ? "": "disabled"}><i class="bi bi-bag-fill"></i> Buy Ticket</button>
                            </div>
                    </div>
                    <div class="body-description rounded bg-body-secondary mt-4 d-flex p-3 align-items-center">
                        <div class="ps-2 flex-grow-1">
                            <div>
                                <h5>$${event.price}</h5>
                                <h6 class="text-secondary">Price</h6>                
                        </div>
                    </div>
                    <div class="vr mx-2 "></div>
                    <div class="flex-grow-1 d-flex justify-content-center">
                        <div>
                            <h5>${event.capacity}</h5>
                            <h6 class="text-secondary">Capacity</h6>
                        </div>
                    </div>
                    <div class="vr mx-2"></div>
                    <div class="flex-grow-1 pe-2 d-flex justify-content-end">
                        <div>
                            <h5>${isUpcoming ? event.estimate : event.assistance}</h5>
                            <h6 class="text-secondary">${isUpcoming ? "Estimate" : "Assistance"}</h6>
                        </div>
                    </div>
                </div>
                <div class="footer-description mt-4 p-1">
                    <h6>Description</h6>
                    <p class="text-secondary">${event.description}</p>
                </div>
                <button class="btn col-12 mt-3 ${isUpcoming ? "btn-details-buy-footer" : "btn-secondary"}" ${isUpcoming ? "": "disabled"}><i class="bi bi-bag-fill"></i> Buy Ticket</button>
            </div>
        </div>`
}
function getEvent(events){
    let urlParams = location.search;
    let params = new URLSearchParams(urlParams);
    let id = params.get("id");
    let returnEvent = {}
    for(let event of events){
        let eventId = event.name.replace(/\s+/g, '').toLowerCase()
        if(eventId === id){
            return event;
        }
    }
    return returnEvent;
}
function printEventDetails(){
    $container.innerHTML = createTemplate(getEvent(events))    
}
