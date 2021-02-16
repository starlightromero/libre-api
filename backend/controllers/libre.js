// CREATE software
// READ all software
// READ one software by name
// READ all software by category
// UPDATE software
// DELETE software

const Libre = require('../models/libre');

exports.addNewSoftware = (req, res) => {
  const libre = new Libre(req.body);
  libre.save().then(
    (result) => res.status(200).json(result),
  );
};
