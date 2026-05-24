function getHome(req, res) {
  res.json({
    message: "Bookstore API is running successfully!",
  });
}

module.exports = {
  getHome,
};
