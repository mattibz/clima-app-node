require('dotenv').config();
const { readInput, inquirerMenu, next,listPlaces } = require('./helpers/assistant');
const Searcher = require('./models/searcher');

const execute = async () => {

    let opt;

    do{

        const searches = new Searcher();
        opt = await inquirerMenu();
        
        switch(opt){

            case 1:
                //show message
                const place = await readInput('City: ');

                //search places
                const places = await searches.getCity(place);

                //select place
                const palce_select_id = await listPlaces(places);
                const place_select = places.find( place => place.id === palce_select_id);
                

                //info
                console.clear();
                console.log(' - Information de la ciudad seleccionada -\n'.green);
                console.log('Ciudad: '.green,place_select.name);
                console.log('Lat: '.green,place_select.lat);
                console.log('Lng: '.green,place_select.lng);
                console.log('Temperatura: '.green);
                console.log('Max: '.green);
                console.log('Min: '.green);
            break;

            case 2:
            break;

            case 3:
            break;
        }

        if(opt !== 0 ) await next();

    }while(opt !== 0)

}

execute();