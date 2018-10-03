const knex = require("../db/knex.js");

module.exports = {
  show: (req, res) => {
    knex("book").then(book => {
      knex("author")
        .where("author.id", req.params.id)
        .then(author => {
          knex("book")
            .join("club", "club.book_id", "book.id")
            .where("book.id", req.params.id)
            .then(clubs => {
              res.render("pages/books/show", {
                book: book[0],
                author: author[0],
                clubs,
                cur_user: req.session.user
              });
            });
        });
    });
  },
  new: (req, res) => {
    res.render("pages/authors/new");
  },
  create: (req, res) => {
    knex("author")
      .insert({
        name: req.body.name,
        bio: req.body.bio,
        img_url: req.body.img_url
      })
      .then(result => {
        res.redirect("/");
      });
  }
};
