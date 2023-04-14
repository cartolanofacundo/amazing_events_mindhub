import { getCategories } from "./utils.js";

getCategories
export const createCategories = (events, $container) => {
    let categories = getCategories(events);
    printCategories($container,categories)
    return categories;
}
function printCategories($container,categories){
    let template = createButtonCategories(categories)
    $container.innerHTML = template    
}
function createButtonCategories(categories){
    let template = ""
    for(let category of categories){
        let id = category.replace(/\s+/g, '').toLowerCase();
        template += `<div>
                        <input type="checkbox" class="btn-check" id="${id}" autocomplete="off" value="${category}" >
                        <label class="btn btn-outline-secondary me-2 my-2" for="${id}">${category}</label>
                        </div>`
    }
    return template
}