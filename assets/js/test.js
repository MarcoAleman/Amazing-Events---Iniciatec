function getStats(url, container) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            let stats = {};
            let allEvents = data.events;
            let pastEvents = allEvents.filter(e => e.date < data.currentDate);
            let upEvents = allEvents.filter(e => e.date > data.currentDate);
            allEvents.sort((a, b) => a.capacity - b.capacity);
            pastEvents.sort((a, b) => (a.assistance / a.capacity) - (b.assistance / b.capacity));

            stats.lowAssistance = pastEvents[0];
            stats.highAssistance = pastEvents[29];
            stats.highCapacity = allEvents[49];
            console.table(stats)

            let pastCat = allCategories(pastEvents);
            let upCat = allCategories(upEvents);
            //console.table(pastCat)
            //console.table(upCat)
            
            let pastStast = [];

            pastEvents.forEach(event => {
                //filtraria por cada categoria y sacaria el total de venta y % de assitencia
                pastCat.forEach(category => {
                    if(category == event.category) {
                        console.log('entra');
                    }
                })

            })
        })
}