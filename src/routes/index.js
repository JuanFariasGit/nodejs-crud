const express = require('express');
const router = express.Router();
const homeController  = require('../controllers/homeController');
const clientController = require('../controllers/clientController');

router.get('/', homeController.index);

router.get('/clients', clientController.getClients);

module.exports = router;