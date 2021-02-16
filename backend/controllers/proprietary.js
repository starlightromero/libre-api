const Proprietary = require('../models/libre');

exports.getAllSoftware = (req, res) => {
  Proprietary.find().then(
    (software) => res.join(software),
  ).catch((err) => {
    throw err.message;
  });
};

exports.getSoftwareById = (req, res) => {
  Proprietary.findById(
    req.params.softwareId,
  ).then(
    (software) => res.json(software),
  ).catch((err) => {
    throw err.message;
  });
};

exports.getSoftwareByName = (req, res) => {
  Proprietary.find(
    { name: req.params.softwareName },
  ).then(
    (software) => res.json(software),
  ).catch((err) => {
    throw err.message;
  });
};

exports.getSoftwareByCategory = (req, res) => {
  Proprietary.find(
    { category: req.params.softwareCategory },
  ).then(
    (software) => res.json(software),
  ).catch((err) => {
    throw err.message;
  });
};

exports.addSoftware = (req, res) => {
  const libre = new Proprietary(req.body);
  libre.save().then(
    (software) => res.status(200).json(software),
  ).catch((err) => {
    throw err.message;
  });
};

exports.updateSoftware = (req, res) => {
  Proprietary.findByIdAndUpdate(
    req.params.softwareId, req.body,
  ).then(
    () => Proprietary.findById(req.params.softwareId),
  ).then(
    (software) => res.json(software),
  ).catch((err) => {
    throw err.message;
  });
};

exports.deleteSoftware = (req, res) => {
  Proprietary.findByIdAndDelete(
    req.params.softwareId,
  ).then((software) => {
    if (software === null) {
      return res.json({ message: 'Software does not exist.' });
    }
    return res.json({
      message: 'Successfully deleted.',
      _id: req.params.softwareId,
    });
  }).catch((err) => {
    throw err.message;
  });
};
