const axios = require('axios');
const { Pokemon } = require('../db');

async function getApiData() {
    try {
        let apiData = (await axios('https://pokeapi.co/api/v2/pokemon?limit=40')).data.results
        .map(async (e) => (await axios(e.url)).data)
        
        await Promise.all(apiData)
        .then(pokemons => {
            apiData = pokemons.map(e => {
                return {
                    id: e.id,
                    name: e.name,
                    hp: e.stats[0].base_stat,
                    attack: e.stats[1].base_stat,
                    defense: e.stats[2].base_stat,
                    speed: e.stats[3].base_stat,
                    height: e.height, 
                    weight: e.weight,
                    types: e.types.map(e => e.type.name),
                    image: e.sprites.other.dream_world.front_default
                }
            })
        })
        return apiData
        
    } catch (error) {
        return error.message
    }
};

module.exports = { getApiData };