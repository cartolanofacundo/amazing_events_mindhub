export const createCategories = (events, id = 0, showBool = false, $container) => {
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
            show: showBool
        }
    })
    printCategories($container,categories)
    return categories;
}
function printCategories($container,categories){
    let template = ""
    for(let category of categories){
        template += `<div>
                        <input type="checkbox" class="btn-check" id="${category.id}" autocomplete="off" value="${category.value}" >
                        <label class="btn btn-outline-secondary me-2 my-2" for="${category.id}">${category.value}</label>
                        </div>`
    }
    $container.innerHTML = template
}