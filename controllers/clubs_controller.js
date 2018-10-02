const knex = require("../db/knex.js");

module.exports = {
  show: (req, res) => {
    console.log("THE CUR SES USER", req.session.user);

    knex("club")
      .where("club.id", req.params.id)
      .then(club => {
        knex("book")
          .where("book.id", club[0].book_id)
          .then(book => {
            knex("user")
              .join("club_users", "user.id", "club_users.user_id")
              .join("club", "club.id", "club_users.club_id")
              .where("user.id", req.session.user.id)
              .andWhere("club_users.club_id", club[0].id)
              .then(users => {
                knex("comment")
                  .where("comment.club_id", req.params.id)
                  .orderBy("created_at", "desc")
                  .then(comments => {
                    console.log("THIS IS THE USERS", users.length);

                    res.render("pages/clubs/show", {
                      club: club[0],
                      book: book[0],
                      users,
                      comments,
                      cur_user: req.session.user
                    });
                  });
              });
          });
      });
  },
  form: (req, res) => {
    res.render("pages/clubs/form", {
      book_id: req.params.book_id,
      user_id: req.params.user_id
    });
  },
  create: (req, res) => {
    knex("club")
      .insert(
        {
          name: req.body.name,
          description: req.body.description,
          img_url: req.body.img_url,
          book_id: req.body.book_id
        },
        "*"
      )
      .then(club => {
        knex("club_users")
          .insert({
            club_id: club[0].id,
            user_id: req.body.user_id
          })
          .then(() => {
            res.redirect(`/clubs/${club[0].id}`);
          });
      });
  },
  comment: (req, res) => {
    knex("comment")
      .insert({
        content: req.body.content,
        user_id: req.body.user_id,
        club_id: req.body.club_id,
        commenter: req.body.user_name
      })
      .then(() => {
        res.redirect(`/clubs/${req.body.club_id}`);
      });
  },
  deleteComment: (req, res) => {
    knex("comment")
      .del()
      .where("id", req.params.comment_id)
      .then(() => {
        res.redirect(`/clubs/${req.params.club_id}`);
      });
  },
  join: (req, res) => {
    knex("club_users")
      .insert({
        club_id: req.params.club_id,
        user_id: req.params.user_id
      })
      .then(() => {
        res.redirect(`/clubs/${req.params.club_id}`);
      });
  },
  leave: (req, res) => {
    knex("club_users")
      .del()
      .where("club_users.user_id", req.params.user_id)
      .andWhere("club_users.club_id", req.params.club_id)
      .then(() => {
        res.redirect(`/clubs/${req.params.club_id}`);
      });
  }
};
