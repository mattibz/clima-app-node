require('dotenv').config();
const { readInput, inquirerMenu, next } = require('./helpers/assistant');
const Searcher = require('./models/searcher');

const execute = async () => {

    let opt;

    do{

        const searches = new Searcher();
        opt = await inquirerMenu();
        
        switch(opt){

            case 1:
                const place = await readInput('City: ');
                await searches.getCity(place);
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