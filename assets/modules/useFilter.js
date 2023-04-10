export const filterEvents = (categories, filterString, events) => {
    let resultEvents = events;
    resultEvents = categoryFiltering(categories, resultEvents);
    resultEvents = textFiltering(filterString, resultEvents);
    return resultEvents
}
export const categoryFiltering = (categories, events) => {
    let resultEvents = events
    console.log(categories.includes(events[0].category))
    if(categories.length === 0){
        return resultEvents;
    }
    resultEvents = events.filter((event) => categories.includes(event.category))
    return resultEvents
}
export const textFiltering = (filterString, events) => {
    let filteredTextEvents = events
    console.log(events)
    if (filterString && filterString !== "") {
        filteredTextEvents = events.filter((event) => event.name.toLowerCase().includes(filterString.toLowerCase()) || event.description.toLowerCase().includes(filterString.toLowerCase()))
    }
    return filteredTextEvents;
}