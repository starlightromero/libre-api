const express = require('express');

const router = express.Router();

const proprietaryController = require('../controllers/proprietary');
const isAuth = require('../middleware/isAuth');

router.get('/name/:softwareName', proprietaryController.getSoftwareByName);

router.get('/category/:softwareCategory', proprietaryController.getSoftwareByCategory);

router.get('/:softwareId', proprietaryController.getSoftwareById);

router.patch('/:softwareId', isAuth, proprietaryController.updateSoftware);

router.delete('/:softwareId', isAuth, proprietaryController.deleteSoftware);

router.get('/', proprietaryController.getAllSoftware);

router.post('/', isAuth, proprietaryController.addSoftware);

module.exports = router;
