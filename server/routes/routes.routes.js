const express = require('express');
const router = express.Router();
const routesRepository = require('../repository/routes.repository')();

router.get('/generate', async (req, res, next) => {
    try {
        const routes = await routesRepository.fetchRoutes()
        res.send(routes);
    } catch (err) {
        next(err);
    }
})

router.post('/s', async (req, res, next) => {
    try {
        const routes = await routesRepository.sendEmail(req);
        console.log(routes, "sned email response")
        res.send(routes);
    } catch (err) {
        next(err);
    }
})

module.exports = router;