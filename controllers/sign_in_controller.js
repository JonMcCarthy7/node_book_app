const knex = require("../db/knex.js");

module.exports = {
  index: function(req, res) {
    res.render("pages/sign_in_up");
  },

  signUp: (req, res) => {
    if (req.body.password === req.body.reqPassword) {
      knex("user")
        .insert({
          user_name: req.body.user_name,
          email: req.body.email,
          password: req.body.password
        })
        .then(() => {
          res.redirect("/");
        });
    } else {
      res.redirect("/");
    }
  },

  signIn: (req, res) => {
    knex("user")
      .where("email", req.body.email)
      .then(results => {
        let user = results[0];
        if (user.password === req.body.password) {
          req.session.user = user;
          req.session.save(() => {
            res.redirect("/");
          });
        } else {
          res.redirect("/log_in");
        }
      });
  },
  signOut: (req, res) => {
    req.session.user = false;
    req.session.save(() => {
      console.log(req.session.user);

      res.render("pages/sign_in_up");
    });
  }
};
