const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

const libreRoutes = require('./routes/libre');
const proprietaryRoutes = require('./routes/proprietary');

app.use('/libre', libreRoutes);
app.use('/proprietary', proprietaryRoutes);

mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
).then(() => {
  app.listen(3000);
}).catch((err) => {
  throw new Error(err);
});
