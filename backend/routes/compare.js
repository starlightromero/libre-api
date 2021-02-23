const express = require('express');
const compareController = require('../controllers/compare');

const router = express.Router();

router.get('/:softwareCategory', compareController.findSoftwareByCategory);

router.post('/', compareController.findSoftwareByName);

module.exports = router;
