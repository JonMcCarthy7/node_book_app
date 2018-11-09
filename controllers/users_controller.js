const knex = require("../db/knex.js");

module.exports = {
  index: (req, res) => {
    console.log(req.session.user);
    res.render("pages/users/index");
  }
};
