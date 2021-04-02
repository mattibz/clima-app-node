const axios = require('axios');

class Searcher {

    constructor(){
        
    }

    get paramsMapbox(){
        return{
            'access_token':process.env.MAPBOX_KEY,
            'limit':5,
            'language':'es'
        }
    }
    async getCity(place = ''){

        try{
            
            const instance = axios.create({
                baseURL:`https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
                params:this.paramsMapbox
            });



            const response = await instance.get();
            console.log(response.data);

        }catch(error){
            return [];
        }
    }

}

module.exports = Searcher;