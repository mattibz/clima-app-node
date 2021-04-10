require('dotenv').config();
const { readInput, inquirerMenu, next,listPlaces } = require('./helpers/assistant');
const Searcher = require('./models/searcher');

const execute = async () => {

    let opt;

    const searches = new Searcher();

    do{

       // const searches = new Searcher();
        opt = await inquirerMenu();
        
        switch(opt){

            case 1:
                //show message
                const place = await readInput('City: ');

                //search places
                const places = await searches.getCity(place);

                //select place
                const palce_select_id = await listPlaces(places);
                if(palce_select_id === '0') continue;

                const place_select = places.find( place => place.id === palce_select_id);

                searches.addHistory(place_select.name);

                //getweather by place
                const weather_status = await searches.getWeather(place_select.lat,place_select.lng);
               
                //info
                console.clear();
                console.log(' - Information de la ciudad seleccionada -\n'.green);
                console.log('Ciudad: '.green,place_select.name);
                console.log('Lat: '.green,place_select.lat);
                console.log('Lng: '.green,place_select.lng);
                console.log('Temperatura: '.green,weather_status.temp);
                console.log('Max: '.green,weather_status.max);
                console.log('Min: '.green,weather_status.min);
                console.log('Desc: '.green,weather_status.desc);
            break;

            case 2:
                //console.log(`${searches.formatHistory}`);

                searches.formatHistory.forEach( (place,i) => {

                    const idx = `${i +1 }. `.yellow;

                    console.log(`${idx} ${place}`);

                });
                    
            break;

            case 3:
            break;
        }

        if(opt !== 0 ) await next();

    }while(opt !== 0)

}

execute();