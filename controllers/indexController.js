const displayHome = async (req, res) => {
  res.status(200).json({ status: 'success', data: 'index' });
};

module.exports = {
  displayHome,
};
