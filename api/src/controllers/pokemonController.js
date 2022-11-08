const axios = require('axios');
const { where } = require('sequelize');
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

async function getDbData() {
    try {
        let dbData = await Pokemon.findAll();
        return dbData;
        
    } catch (error) {
        return error.message
    }
};

async function getAllData() {
    try {
        let apiData = await getApiData();
        let dbData = await getDbData();
    
        let allData = apiData.concat(dbData);
        return allData;
        
    } catch (error) {
        return error.message
    }
};

async function getDataByName(name) {
    try {
        let existing = (await axios('https://pokeapi.co/api/v2/pokemon?limit=1154')).data.results.map(e => e.name)
        if(existing.includes(name)) {
            let e = (await axios(`https://pokeapi.co/api/v2/pokemon/${name}`)).data
            let apiData = {
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
            return apiData;
        }
        else {
            let dbData = await Pokemon.findOne({ where: { name: name } })
            return dbData
        }
        
    } catch (error) {
        return error.message
    }
};

async function getDataById(id) {
    try {
        if(id.length < 10) {
            let e = (await axios(`https://pokeapi.co/api/v2/pokemon/${parseInt(id)}`)).data
            let apiData = {
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
            return apiData;
        }
        else {
            let dbData = await Pokemon.findByPk(id)
            return dbData
        }
        
    } catch (error) {
        return error.message
    }
};
getDataById(2)

module.exports = { getAllData, getDataByName, getDataById };