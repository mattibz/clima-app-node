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
            
            return response.data.features.map( place => ({
                id:place.id,
                name:place.place_name,
                lng:place.center[0],
                lat:place.center[1]
            }));

        }catch(error){
            return [];
        }
    }

}

module.exports = Searcher;