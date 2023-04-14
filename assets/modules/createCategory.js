import { getCategories } from "./utils.js";


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
    let template = categories.map((category) => createTemplate(category)).join("")
    return template
}
function createTemplate(category){
    let id = category.replace(/\s+/g, '').toLowerCase();
    let template = `<div>
                        <input type="checkbox" class="btn-check" id="${id}" autocomplete="off" value="${category}" >
                        <label class="btn btn-outline-secondary me-2 my-2" for="${id}">${category}</label>
                        </div>`
    return template
}