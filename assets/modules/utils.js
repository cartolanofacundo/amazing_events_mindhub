export const percentageOfAttendance = (event, property) => {
    return (event[property] / event.capacity) * 100;
}
export const promPercentageOfAttendance = (events, property) => {
    let percentageOfAttendanceAcum = 0;
    let quantity = 0
    for (let i = 0; i < events.length; i++) {
        percentageOfAttendanceAcum += percentageOfAttendance(events[i], property)
        quantity = i + 1;   
    }
    return percentageOfAttendanceAcum / quantity
}
export const getEventAttendance = (events, property, lowest) => {
    let resultEvent = {
        percentage: lowest ? 100 : 0,
        event: ''
    }
    for(let event of events){
        if(lowest){
            resultEvent = resultEvent.percentage > percentageOfAttendance(event, property) ? {percentage: percentageOfAttendance(event, property), event: event.name } : resultEvent
        }
        else{
            resultEvent = resultEvent.percentage < percentageOfAttendance(event, property) ? {percentage: percentageOfAttendance(event, property), event: event.name } : resultEvent
        }
    }
    return resultEvent
}
export const highestPercentageOfAttendance = (events, currentDate) => {
    let measurableEvents = events.filter((event) => new Date(event.date) <  new Date(currentDate))
    return getEventAttendance(measurableEvents, "assistance", false);
}
export const lowestPercentageOfAttendance = (events, currentDate) =>{
    let measurableEvents = events.filter((event) => new Date(event.date) <  new Date(currentDate))
    return getEventAttendance(measurableEvents, "assistance", true);
}
export const highestCapacityEvent = (events) => {
    let highestEvent = {
        capacity : 0,
        event: ""
    }
    for(let event of events){
        if(event.capacity > highestEvent.capacity){
            highestEvent.capacity = event.capacity;
            highestEvent.event = event.name
        }
    }
    return highestEvent
}
export const getCategories = (events) => {
    let categories = events.map((event) => event.category).reduce((acc, act) =>{
        if(!acc.includes(act)){
            acc.push(act);
        }
        return acc;
    },[])
    return categories;
}
export const getEvents = (events, currentDate,upcoming) => {
    let resultEvents= (upcoming)  
                ? events.filter((event) => new Date(event.date) >  new Date(currentDate))
                : events.filter((event) => new Date(event.date) <  new Date(currentDate))
    return resultEvents;
}

export const getRevenues = (events, property) =>{
    let revenues = 0;
    for(let event of events){
        revenues += event.price * event[property]
    }
    return revenues;
}
export const getRevenuesOfCategory = (events, currentDate, upcoming  ) =>{
    let revenues = []
    let property = upcoming ? "estimate" : "assistance"
    let measurableEvents = getEvents(events, currentDate, upcoming);
    let categories = getCategories(measurableEvents);
    for (let category of categories){ 
        let eventsCategory = measurableEvents.filter((event) => event.category === category)
        revenues.push({name: category, revenues:getRevenues(eventsCategory, property), promAttendance: promPercentageOfAttendance(eventsCategory, property).toFixed(1) } )
    }
    return revenues;
}