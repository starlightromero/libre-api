const express = require('express');

const router = express.Router();

const compareController = require('../controllers/compare');

router.get('/name/:softwareName', compareController.findSoftwareByName);

router.get('/category/:softwareCategory', compareController.findSoftwareByCategory);

module.exports = router;
