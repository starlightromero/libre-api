const express = require('express');

const router = express.Router();

const libreController = require('../controllers/libre');
const isAuth = require('../middleware/isAuth');

router.get('/name/:softwareName', libreController.getSoftwareByName);

router.get('/category/:softwareCategory', libreController.getSoftwareByCategory);

router.get('/license/:softwareLicense', libreController.getSoftwareByLicense);

router.get('/:softwareId', libreController.getSoftwareById);

router.patch('/:softwareId', isAuth, libreController.updateSoftware);

router.delete('/:softwareId', isAuth, libreController.deleteSoftware);

router.get('/', libreController.getAllSoftware);

router.post('/', isAuth, libreController.addSoftware);

module.exports = router;
