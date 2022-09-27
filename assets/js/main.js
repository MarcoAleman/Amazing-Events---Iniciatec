/* -------------------------------------------------------------------------------------------- */
/* --------------------------------------FUNCTIONS--------------------------------------------- */
/* -------------------------------------------------------------------------------------------- */
function qs(element){
    return document.querySelector(element);
}

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

let searchFilter = (input, array, container)=> {
    input.addEventListener('keyup', e => {
        let querySearch = input.value.toLowerCase().trim();
        let newArray = array.filter((item) => {
            return item.name.toLowerCase().includes(querySearch)
        })
        printCards(newArray, container);
    })
}
/* ------------------------------------------------------------------------------------------ */
/* ------------------------------------------------------------------------------------------ */
let allEvents = data.events;
let currentDate = data.currentDate;
let path = location.pathname;
let cardContainer = qs('.collection-cards');
let inputSearch = qs('.form-control');

let pastEvents = allEvents.filter(e =>{
    return e.date < currentDate;
})

let upEvents = allEvents.filter(e =>{
    return e.date > currentDate;
})

//Implemetacion
switch(true){
    case path.includes('index'):
        printCards(allEvents, cardContainer);
        searchFilter(inputSearch, allEvents, cardContainer);
        break;
    case path.includes('past'):
        printCards(pastEvents, cardContainer);
        searchFilter(inputSearch, pastEvents, cardContainer);
        break;
    case path.includes('upcoming'):
        printCards(upEvents, cardContainer);
        searchFilter(inputSearch, upEvents, cardContainer);
        break;
}

// Details
let detalles = qs('#detail');
let queryString = location.search;
let params = new URLSearchParams(queryString);
let id = params.get('id');

if(detalles){
    let eventDetail = allEvents.find(event => event._id == id);
    printDetail(eventDetail, detalles)
}

/* ------------------------------------------------------------------------------------------ */
/* Filtrar Caregorias */

let categories = [];

allEvents.forEach(element => {
    categories.push(element.category);
})

categories = categories.filter((item, i) => {
    return categories.indexOf(item) === i;
})

let categoryContainer = qs('.conteiner-checkbox');

if(categoryContainer != null){
    categories.forEach((category, i)=> {
        let checkbox = document.createElement('div');
        checkbox.className = "form-check form-check-inline"
        checkbox.innerHTML = `
        <input class="form-check-input" type="checkbox" id="cat${i}" value="${category}">
        <label class="form-check-label" for="cat${i}">${category}</label>`
        categoryContainer.appendChild(checkbox);
    })
}

let inputs = document.querySelectorAll('.form-check-input');
console.log(inputs);
/* ------------------------------------------------------------------------------------------ */
/* Compruebo si los checkbox estan marcados*/
/* let input = document.querySelectorAll('.form-check-input');
console.log(input);

input.forEach(item => {
    console.log(item.checked);
})

input.addEventListener('input', e =>{

}) */