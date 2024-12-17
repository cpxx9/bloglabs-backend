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
app.use(cors());

app.use('/api', indexRouter);
app.use('*', notFound);
app.use(errorController);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
