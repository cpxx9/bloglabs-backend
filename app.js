require('dotenv/config');
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const path = require('node:path');
const { indexRouter } = require('./routes/indexRouter');
const { notFound } = require('./utils/auth');
const { errorController } = require('./errors/errorController');
const { corsOptions } = require('./config/corsOptions');

const PORT = process.env.PORT || 8000;

require('./config/passport')(passport);

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public')));

app.use('/api', indexRouter);
app.use('*', notFound);
app.use(errorController);

app.listen(PORT, () => {
  console.log(`API listening on port ${PORT}`);
});
