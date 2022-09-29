/* -------------------------------------------------------------------------------------------- */
/* --------------------------------------FUNCTIONS--------------------------------------------- */
/* -------------------------------------------------------------------------------------------- */
function qs(element){
    return document.querySelector(element);
}
//todo mensaje de error si el array esta vacio
let printCards = (array, container)=>{
    container.innerHTML = '';
    array.forEach((event, i)=>{
        let card = document.createElement('div')
        card.className = "card m-2"
        card.style.width = '18rem'
        card.innerHTML = `
            <img src=${array[i].image} class="card-img-top" alt="...">
            <div class="card-body  text-center">
                <h5 class="card-title">${array[i].name}</h5>
                <p class="card-text">${array[i].description}</p>
                <a href="#" class="btn btn-outline-success">Buy</a>
                <a href="detail.html?id=${array[i]._id}" class="btn c3">Details</a>
            </div>`
        container.appendChild(card);
    })
}

let printDetail = (event, container)=>{
    let detail = document.createElement('div');
    detail.className = 'card mb-3';
    detail.innerHTML = `
        <div class="row g-0">
            <div class="col-md-4 img-card">
                <img src="${event.image}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${event.name}</h5>
                    <p class="card-text">${event.description}</p>
                    <p>Date: ${event.date} <span class="float-r">Category: ${event.category}</span></p>
                    <p>Price: $${event.price} <span class="float-r">Place: ${event.place}</span></p>
                    <a href="#" class="btn btn-outline-success text-center">Buy</a>
                </div>
            </div>
        </div>`
    container.appendChild(detail);
}

const allCategories = (data) =>{
    let categories = [];
    data.forEach(event => categories.push(event.category))
    categories = categories.filter((item, i) => categories.indexOf(item) === i)
    return categories;
}

const printCategories = (data, container) => {
    let categories = allCategories(data);
    categories.forEach((category, i)=> {
        let checkbox = document.createElement('div');
        checkbox.className = "form-check form-check-inline"
        checkbox.innerHTML = `
        <input class="form-check-input" type="checkbox" id="cat${i}" value="${category}">
        <label class="form-check-label" for="cat${i}">${category}</label>`
        container.appendChild(checkbox);
    })
}

const filterBySearch = (input, data) => {
    let querySearch = input.value.toLowerCase().trim();
    let result = data.filter((event) => {
        return event.name.toLowerCase().includes(querySearch);
    })
    return result;
}

const filterByCategory = (data) => {
    let checkBoxes = document.querySelectorAll('.form-check-input');
    let arrayChecks = Array.from(checkBoxes);
    let checkOn = arrayChecks.filter( checkBox => checkBox.checked);
    let categoryOn = checkOn.map(check => check.value);

    if(categoryOn.length == 0){
        return data;
    }

    let result = data.filter(event => categoryOn.includes(event.category));
    return result;
}

const allFilters = () =>{
    let resultByText = filterBySearch(inputSearch, allEvents);
    let resultByCategory = filterByCategory(resultByText);
    printCards(resultByCategory, cardContainer);
}
/* ------------------------------------------------------------------------------------------ */
/* ------------------------------------------------------------------------------------------ */
let allEvents = data.events;
let currentDate = data.currentDate;
let pastEvents = allEvents.filter(e => e.date < currentDate);
let upEvents = allEvents.filter(e => e.date > currentDate);
let path = location.pathname;
let cardContainer = qs('.collection-cards');
let categoryContainer = qs('.conteiner-checkbox');
let inputSearch = qs('.form-control');


//Implemetacion
switch(true){
    case path.includes('index'):
        //printCategories(allEvents, categoryContainer);
        printCards(allEvents, cardContainer);
        break;
    case path.includes('past'):
        //printCategories(allEvents, categoryContainer);
        printCards(pastEvents, cardContainer);
        break;
    case path.includes('upcoming'):
        //printCategories(allEvents, categoryContainer);
        printCards(upEvents, cardContainer);
        break;
    case path.includes('contact'):
        break;
    case path.includes('detail'):
}

/* Filtrar Caregorias */
if(categoryContainer != null){
    printCategories(allEvents, categoryContainer);
}
let checks = document.querySelectorAll('.form-check-input');

// Details
let detailContainer = qs('#detail');
let queryString = location.search;
let params = new URLSearchParams(queryString);
let id = params.get('id');

if(detailContainer){
    let eventDetail = allEvents.find(event => event._id == id);
    printDetail(eventDetail, detailContainer)
}

/* ------------------------------------------------------------------------------------------ */
/* ------------------------------------------------------------------- */
//Agregando cosas
inputSearch.addEventListener('keyup', e => {
    allFilters()
})

checks.forEach((item, i) => {
    item.addEventListener('input', e => {
        allFilters()
    })
})
//Aca como podria evitarme el foreach
//checks.addEventListener('input', e => {})