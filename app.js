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

const allowlist = [
  'http://localhost:3000',
  'http://blog.cjplabs.com',
  'http://127.0.0.1:3000',
];
const corsOptions = {
  origin: (origin, callback) => {
    if (allowlist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));

app.use('/api', indexRouter);
app.use('*', notFound);
app.use(errorController);

app.listen(PORT, () => {
  console.log(`API listening on port ${PORT}`);
});
