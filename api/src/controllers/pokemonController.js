const axios = require('axios');
const { Pokemon, Type } = require('../db');

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
        let dbData = await Pokemon.findAll({
            include: [{
                model: Type,
                attributes: ["name"],
                through: { attributes:[] }
            }]
        });
        dbData = dbData.map(e => {
            let arrayTypes = [];
            e.types.map(e => arrayTypes.push(e.name.toString()))
            return {
                id: e.id,
                name: e.name,
                hp: e.hp,
                attack: e.attack,
                defense: e.defense,
                speed: e.speed,
                height: e.height, 
                weight: e.weight,
                types: arrayTypes
            }
        })

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
            let apiData = [{
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
            }]
            return apiData;
        }
        else {
            let e = await Pokemon.findOne({ 
                where: { 
                    name: name 
                }, 
                include: {
                    model: Type,
                    attributes: ["name"],
                    through: { attributes:[] }
                }
            })
            let arrayTypes = [];
            e.types.map(e => arrayTypes.push(e.name.toString()))
            let dbData = [{
                id: e.id,
                name: e.name,
                hp: e.hp,
                attack: e.attack,
                defense: e.defense,
                speed: e.speed,
                height: e.height, 
                weight: e.weight,
                types: arrayTypes
            }]
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
            let e = await Pokemon.findOne({ 
                where: { 
                    id: id 
                }, 
                include: {
                    model: Type,
                    attributes: ["name"],
                    through: { attributes:[] }
                }
            })
            let arrayTypes = [];
            e.types.map(e => arrayTypes.push(e.name.toString()))
            let dbData = {
                id: e.id,
                name: e.name,
                hp: e.hp,
                attack: e.attack,
                defense: e.defense,
                speed: e.speed,
                height: e.height, 
                weight: e.weight,
                types: arrayTypes
            }
            return dbData
        }
        
    } catch (error) {
        return error.message
    }
};

async function getTypes() {
    try {
        let types = (await axios('https://pokeapi.co/api/v2/type')).data.results
        .map(e => ({ name: e.name }))
        await Type.bulkCreate(types)
        
    } catch (error) {
        return error.message
    }
};

async function getNames() {
    try {
        let names = (await axios('https://pokeapi.co/api/v2/pokemon?limit=1154')).data.results
        .map(e => ({ name: e.name }))
        return names
        
    } catch (error) {
        return error.message
    }
};

module.exports = { getAllData, getDataByName, getDataById, getTypes, getNames };