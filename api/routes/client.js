const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

router.get('/client', clientController.getClients);
router.get('/client/:codClient', clientController.getClient);
router.post('/client', clientController.addClient);
router.put('/client/:codClient' ,clientController.updateClient);
router.delete('/client/:codClient',clientController.deleteClient);

module.exports = router;