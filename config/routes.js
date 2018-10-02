//Update the name of the controller below and rename the file.
const dashboard = require("../controllers/dashboard_controller");
const sign_in = require("../controllers/sign_in_controller");
const books = require("../controllers/books_controller.js");
const clubs = require("../controllers/clubs_controller");

module.exports = function(app) {
  app.get("/", dashboard.index);
  app.get("/log_in", sign_in.index);
  app.post("/sign_in", sign_in.signIn);
  app.post("/sign_up", sign_in.signUp);
  app.get("/books/:id", books.show);

  app.use(authenticateUser);
  app.post("/clubs", clubs.create);
  app.get("/clubs/form/:book_id/:user_id", clubs.form);
  app.get("/clubs/:id", clubs.show);
  app.get("/clubs/delete_comment/:club_id/:comment_id", clubs.deleteComment);
  app.get("/clubs/join/:club_id/:user_id", clubs.join);
  app.get("/clubs/leave/:club_id/:user_id", clubs.leave);

  app.post("/comments", clubs.comment);
};

function authenticateUser(req, res, next) {
  if (!req.session.user) {
    res.redirect("/");
  } else {
    next();
  }
}
