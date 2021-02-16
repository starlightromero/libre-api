const express = require('express');
const proprietaryController = require('../controllers/proprietary');

const router = express.Router();

router.get('/', proprietaryController.getAllSoftware);

router.get('/:softwareId', proprietaryController.getSoftwareById);

router.post('/', proprietaryController.addSoftware);

router.patch('/:softwareId', proprietaryController.updateSoftware);

router.delete('/:softwareId', proprietaryController.deleteSoftware);

router.get('/name/:softwareName', proprietaryController.getSoftwareByName);

router.get('/category/:softwareCategory', proprietaryController.getSoftwareByCategory);
