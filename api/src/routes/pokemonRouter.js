const { Router } = require('express');
const { Pokemon } = require('../db');
const { getApiData } = require('../controllers/pokemonController');

const router = Router();

router.get('/', async (req, res) => {
    const allData = await getApiData();
    res.send(allData)
})

module.exports = router;