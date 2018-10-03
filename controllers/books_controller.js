const knex = require("../db/knex.js");

module.exports = {
  show: (req, res) => {
    knex("book")
      .where("book.id", req.params.id)
      .then(book => {
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
    knex("author").then(authors => {
      res.render("pages/books/new", { authors });
    });
  },
  create: (req, res) => {
    knex("book")
      .insert({
        title: req.body.title,
        img_url: req.body.img_url,
        description: req.body.description,
        author_id: req.body.author_id
      })
      .then(() => {
        res.redirect("/");
      });
  }
};
