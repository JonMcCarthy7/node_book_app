const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 8000;
const expressLayouts = require("express-ejs-layouts");
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("layout", "pages/layout");
app.use(expressLayouts);
require("./config/session")(app);

let routes_setter = require("./config/routes.js");
routes_setter(app);

app.listen(port, function() {
  console.log("Listening on", port);
});
