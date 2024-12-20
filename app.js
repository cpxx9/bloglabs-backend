require('dotenv/config');
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const { indexRouter } = require('./routes/indexRouter');
const { notFound } = require('./utils/auth');
const { errorController } = require('./errors/errorController');

const app = express();
const PORT = process.env.PORT || 8000;

require('./config/passport')(passport);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowlist = ['http://localhost:3000', 'http://blog.cjplabs.com'];
const corsOptionsDelegate = (req, callback) => {
  let corsOptions;
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

app.use(cors(corsOptionsDelegate));

app.use('/api', indexRouter);
app.use('*', notFound);
app.use(errorController);

app.listen(PORT, () => {
  console.log(`API listening on port ${PORT}`);
});
