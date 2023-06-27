import { highestCapacityEvent, highestPercentageOfAttendance, lowestPercentageOfAttendance, getRevenuesOfCategory } from "../assets/modules/utils.js";

let events = [];
let currentDate = undefined;
const $generalStatistics = document.getElementById("generalStatistics")
const $upcomingStatistics = document.getElementById("upcomingEvents")
const $pastStatistics = document.getElementById("pastEvents")

fetch("https://mindhub-xj03.onrender.com/api/amazing")
.then((response) => response.json())
.then((data) =>{
    events = data.events
    currentDate = data.currentDate;
    insertData(events);
})


function insertData(events){
    insertGeneralStatistics(events);
    insertCategoriesStatistics(events);
}

function insertGeneralStatistics(events){
    let template = "";
    let highetsAttendance = highestPercentageOfAttendance(events, currentDate);
    let lowestAttendance = lowestPercentageOfAttendance(events, currentDate);
    let highestCapacity = highestCapacityEvent(events)
    template += `<td>${highetsAttendance.event} with: ${highetsAttendance.percentage.toFixed(1)}%</td>`
    template += `<td>${lowestAttendance.event} with: ${lowestAttendance.percentage.toFixed(1)}%</td>`
    template += `<td>${highestCapacity.event} with: ${highestCapacity.capacity}</td>`
    $generalStatistics.innerHTML = template
}
function insertCategoriesStatistics(events){
    const upcomingData = getRevenuesOfCategory(events, currentDate, true)
    const pastData = getRevenuesOfCategory(events, currentDate, false)
    renderTable(upcomingData, $upcomingStatistics )
    renderTable(pastData, $pastStatistics)
}
function renderTable(data,$container ){
    const $fragment = document.createDocumentFragment();
    for(let element of data){
        $fragment.appendChild(createRow(element));
    }
    $container.appendChild($fragment);
}

function createRow(element){
    const $tr = document.createElement("tr");
    for(let property in element){
        const $td = document.createElement("td");
        const $content = document.createTextNode(element[property])
        $td.appendChild($content);
        $tr.appendChild($td);
    }
    return $tr
}