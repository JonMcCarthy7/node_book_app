//Update the name of the controller below and rename the file.
const dashboard = require("../controllers/dashboard_controller");
const sign_in = require("../controllers/sign_in_controller");
const books = require("../controllers/books_controller.js");
const clubs = require("../controllers/clubs_controller");
const authors = require("../controllers/authors_controller");
const users = require("../controllers/users_controller");

module.exports = function(app) {
  app.use((req, res, next) => setLocals(req, res, next, app));

  app.get("/log_in", sign_in.index);
  app.get("/log_out", sign_in.signOut);
  app.post("/sign_in", sign_in.signIn);
  app.post("/sign_up", sign_in.signUp);
  app.get("/", dashboard.index);
  app.get("/books/:id", books.show);

  app.use(authenticateUser);

  app.post("/clubs", clubs.create);
  app.get("/clubs/form/:book_id/:user_id", clubs.form);
  app.get("/clubs/:id", clubs.show);
  app.get("/clubs/join/:club_id/:user_id", clubs.join);
  app.get("/clubs/leave/:club_id/:user_id", clubs.leave);
  app.post("/comments", clubs.comment);
  app.get("/clubs/delete_comment/:club_id/:comment_id", clubs.deleteComment);

  app.get("/users/index", users.index);

  app.use(authenticateAdmin);

  app.get("/book/new", books.new);
  app.post("/books", books.create);
  app.get("/authors", authors.show);
  app.get("/authors/new", authors.new);
  app.post("/authors", authors.create);
};

function authenticateUser(req, res, next) {
  if (!req.session.user) {
    res.redirect("/");
  } else {
    next();
  }
}

function setLocals(req, res, next, app) {
  if (req.session.user) {
    app.locals = {
      admin: req.session.user.role === "admin" ? true : false,
      user: req.session.user
    };
  } else {
    app.locals = { admin: false, user: false };
  }
  next();
}

function authenticateAdmin(req, res, next) {
  if (req.session.user.role !== "admin") {
    res.redirect("/");
  } else {
    app.locals = { user: req.session.user };
    next();
  }
}
