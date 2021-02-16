const Libre = require('../models/libre');

exports.getAllSoftware = (req, res) => {
  Libre.find().then(
    (software) => res.join(software),
  ).catch((err) => {
    throw err.message;
  });
};

exports.getSoftwareById = (req, res) => {
  Libre.findById(
    req.params.softwareId,
  ).then(
    (software) => res.json(software),
  ).catch((err) => {
    throw err.message;
  });
};

exports.getSoftwareByName = (req, res) => {
  Libre.find(
    { name: req.params.softwareName },
  ).then(
    (software) => res.json(software),
  ).catch((err) => {
    throw err.message;
  });
};

exports.getSoftwareByCategory = (req, res) => {
  Libre.find(
    { category: req.params.softwareCategory },
  ).then(
    (software) => res.json(software),
  ).catch((err) => {
    throw err.message;
  });
};

exports.addSoftware = (req, res) => {
  const libre = new Libre(req.body);
  libre.save().then(
    (software) => res.status(200).json(software),
  ).catch((err) => {
    throw err.message;
  });
};

exports.updateSoftware = (req, res) => {
  Libre.findByIdAndUpdate(
    req.params.softwareId, req.body,
  ).then(
    () => Libre.findById(req.params.softwareId),
  ).then(
    (software) => res.json(software),
  ).catch((err) => {
    throw err.message;
  });
};

exports.deleteSoftware = (req, res) => {
  Libre.findByIdAndDelete(
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
