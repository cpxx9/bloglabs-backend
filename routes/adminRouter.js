const { Router } = require('express');

const adminRouter = Router();

adminRouter.get('/', (req, res) =>
  res.status(200).json({ success: true, data: 'admins only' })
);

module.exports = { adminRouter };
