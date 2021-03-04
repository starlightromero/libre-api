const Libre = require('../models/libre');
const Proprietary = require('../models/proprietary');

exports.findSoftwareByName = (req, res) => {
  Proprietary
    .findOne({ name: req.params.softwareName })
    .then((proprietarySoftware) => Libre.find({ category: proprietarySoftware.category }))
    .then((software) => res.status(200).json(software))
    .catch((err) => {
      throw err.message;
    });
};

exports.findSoftwareByCategory = (req, res) => {
  Libre
    .find({ category: req.params.softwareCategory })
    .then((software) => res.status(200).json(software))
    .catch((err) => {
      throw err.message;
    });
};
