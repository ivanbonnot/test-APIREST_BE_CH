const { Router } = require("express")
const mock = require('../../controllers/mock/fakermock')
const productsRouterTest = Router();

productsRouterTest.get('/', async (req, res) => {
    const productos = await mock.getAll();

    res.json(productos);
})


module.exports = productsRouterTest;

