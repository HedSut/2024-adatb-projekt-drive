const express = require("express");
const path = require("path");
const cparser = require("cookie-parser");
const routeGets = require("./routers/route-gets");
const routePosts = require("./routers/route-posts");
const dbinit = require("./config/db");

const PORT = process.env.PORT || 8080;
const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(cparser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public/scripts")));
app.use(express.urlencoded({extended: false}));
app.use(routeGets);
app.use(routePosts);

// Útvonalak hozzáadása

app.get('/index', (req, res) => {
  res.render('index');
});

app.get('/profile', (req, res) => {
  res.render('profile');
});

app.get('/file', (req, res) => {
  res.render('file');
});

app.get('/explorer', (req, res) => {
  res.render('explorer');
});

app.get('/login', (req, res) => {
  res.render('login');
});
app.get('/registration', (req, res) => {
    res.render('registration');
  });

// További útvonalakat ide lehet hozzáadni...

new dbinit().initdb();

app.listen(PORT, () => {
    console.log("App listening at: http://localhost:8080/")
})
