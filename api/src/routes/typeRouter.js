const { Router } = require('express');
const { Type } = require('../db');

const router = Router();

router.get('/', async (req, res) => {
    try {
        const types = await Type.findAll();
        res.send(types)
        
    } catch (error) {
        res.status(404).send(error.message)
    }
})

module.exports = router;