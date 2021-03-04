const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/user');

exports.signUpUser = (req, res) => {
  const { username, password } = req.body;
  User
    .findOne({ username })
    .then((user) => {
      if (user) {
        return res.status(409).json({
          message: 'User already exists!',
        });
      }
      return bcrypt.hash(password, 12);
    })
    .then((hashedPassword) => {
      const user = new User({
        username: req.body.username,
        password: hashedPassword,
      });
      return user.save();
    })
    .then((user) => {
      const token = jwt.sign({
        username: user.username,
        userId: user._id.toString(),
      }, process.env.SECRET_KEY, {
        expiresIn: '1h',
      });
      return res.status(200).json({
        message: 'Sign up successful!',
        user: {
          username: user.username,
        },
        token,
      });
    })
    .catch(() => {
      throw new Error('Unable to create user.');
    });
};

exports.signInUser = (req, res) => {
  const { username, password } = req.body;
  let loadedUser;
  User
    .findOne({ username })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: 'User does not exists!',
        });
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        return res.status(401).json({
          message: 'Incorrect password',
        });
      }
      const token = jwt.sign({
        username: loadedUser.username,
        userId: loadedUser._id.toString(),
      }, process.env.SECRET_KEY, {
        expiresIn: '1h',
      });
      return res.status(200).json({ token });
    })
    .catch((err) => { throw err.message; });
};

exports.getUser = (req, res) => {
  User
    .findById(req.params.id)
    .lean()
    .populate('codeSubs')
    .then((user) => res.status(200).json({ user }))
    .catch(() => { throw new Error('User not found.'); });
};

exports.updateUser = (req, res) => {
  User
    .findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((user) => res.status(200).json({ user }))
    .catch((err) => { throw err.message; });
};

exports.deleteUser = (req, res) => {
  User
    .findByIdAndDelete(req.params.id)
    .then(() => res.status(204))
    .catch((err) => { throw err.message; });
};

exports.signOutUser = (req, res) => {
  res.clearCookie('nToken');
  return res.status(200);
};
