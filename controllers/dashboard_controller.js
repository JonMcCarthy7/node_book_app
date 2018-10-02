const knex = require("../db/knex.js");

module.exports = {
  // CHANGE ME TO AN ACTUAL FUNCTION
  index: function(req, res) {
    knex("book")
      .orderBy("created_at", "desc")
      .then(books => {
        res.render("pages/dashboard/index", { books });
      });
  }
};
