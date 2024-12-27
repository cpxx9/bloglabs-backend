const allowlist = [
  'http://localhost:3000',
  'http://blog.cjplabs.com',
  'http://127.0.0.1:3000',
];
module.exports.corsOptions = {
  origin: (origin, callback) => {
    if (allowlist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
};
