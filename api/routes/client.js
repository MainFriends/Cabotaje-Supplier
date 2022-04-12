const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const userExtractor = require('../middlewares/userExtractor');
const verifyRolePersons = require('../middlewares/verifyRolePersons');

router.get('/client', [userExtractor, verifyRolePersons], clientController.getClients);
router.get('/client/:codClient', [userExtractor, verifyRolePersons], clientController.getClient);
router.post('/client', [userExtractor, verifyRolePersons], clientController.addClient);
router.put('/client/:codClient', [userExtractor, verifyRolePersons] ,clientController.updateClient);
router.delete('/client/:codClient', [userExtractor, verifyRolePersons],clientController.deleteClient);

module.exports = router;