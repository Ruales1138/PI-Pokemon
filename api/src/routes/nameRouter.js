const { Router } = require('express');
const { getNames } = require('../controllers/pokemonController');

const router = Router();

router.get('/', async (req, res) => {
    try {
        const allNames = await getNames();
        res.send(allNames);
        
    } catch (error) {
        res.status(404).send(error.message)
    }
})

module.exports = router;