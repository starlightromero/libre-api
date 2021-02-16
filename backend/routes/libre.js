const express = require('express');
const libreController = require('../controllers/libre');

const router = express.Router();

router.get('/', libreController.getAllSoftware);

router.get('/:softwareId', libreController.getSoftwareById);

router.post('/', libreController.addSoftware);

router.patch('/:softwareId', libreController.updateSoftware);

router.delete('/:softwareId', libreController.deleteSoftware);

router.get('/name/:softwareName', libreController.getSoftwareByName);

router.get('/category/:softwareCategory', libreController.getSoftwareByCategory);
