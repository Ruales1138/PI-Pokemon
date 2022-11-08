const { Router } = require('express');
const { Pokemon } = require('../db');
const { getAllData, getDataByName, getDataById } = require('../controllers/pokemonController');

const router = Router();

router.get('/', async (req, res) => {
    try {
        const { name } = req.query;
        if(name) {
            const dataByName = await getDataByName(name);
            res.send(dataByName);
        } 
        else {
            const allData = await getAllData();
            res.send(allData)
        }
        
    } catch (error) {
        res.status(404).send(error.message)
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const dataById = await getDataById(id)
        res.send(dataById) 
        
    } catch (error) {
        res.status(404).send(error.message)
    }
})

router.post('/', async (req, res) => {
    try {
        const { name, types } = req.body;
        if(name) {
            const newPokemon = await Pokemon.create(req.body);
            await newPokemon.addTypes(types)
            res.send(newPokemon)
        }
        else res.status(404).send(error.message)
        
    } catch (error) {
        res.status(404).send(error.message)
    }
})

module.exports = router;