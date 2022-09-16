let collection = document.querySelector('#index');

let array = data.eventos;

if(collection != null){
    for(let i = 0; i < array.length; i++){
        let card = document.createElement('div')
        card.className = "card m-2"
        card.style.width = '18rem'
        card.innerHTML = `
        <img src=${array[i].image} class="card-img-top" alt="...">
        <div class="card-body  text-center">
            <h5 class="card-title">${array[i].name}</h5>
            <p class="card-text">${array[i].description}</p>
            <a href="#" class="btn btn-outline-success">Buy</a>
            <a href="detail.html" class="btn c3">Details</a>
        </div>`
        collection.appendChild(card)
    }

}


//Past Events
let pastEvents = document.querySelector('#past-events');
let upcomingEvents = document.querySelector('#upcoming-events');
let date = data.fechaActual;

if(pastEvents != null){
    array.forEach((event, i)=> {
        if(array[i].date < date){
            let card = document.createElement('div')
            card.className = "card m-2"
            card.style.width = '18rem'
            card.innerHTML = `
            <img src=${array[i].image} class="card-img-top" alt="...">
            <div class="card-body  text-center">
                <h5 class="card-title">${array[i].name}</h5>
                <p class="card-text">${array[i].description}</p>
                <a href="#" class="btn btn-outline-success">Buy</a>
                <a href="detail.html" class="btn c3">Details</a>
            </div>`
            pastEvents.appendChild(card)
        }
    })
}

if(upcomingEvents != null){
    array.forEach((event, i)=> {
        if(array[i].date > date){
            let card = document.createElement('div')
            card.className = "card m-2"
            card.style.width = '18rem'
            card.innerHTML = `
            <img src=${array[i].image} class="card-img-top" alt="...">
            <div class="card-body  text-center">
                <h5 class="card-title">${array[i].name}</h5>
                <p class="card-text">${array[i].description}</p>
                <a href="#" class="btn btn-outline-success">Buy</a>
                <a href="detail.html" class="btn c3">Details</a>
            </div>`
            upcomingEvents.appendChild(card)
        }
    })
}
