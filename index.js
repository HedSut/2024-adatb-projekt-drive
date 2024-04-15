const express = require("express");
const fileUpload = require('express-fileupload');
const path = require("path");
const cparser = require("cookie-parser");
const explorerRouter = require("./routers/route-explorer");
const indexRouter = require("./routers/route-index");
const loginRouter = require("./routers/route-login");
const registerRouter = require("./routers/route-register");
const dbinit = require("./config/db");

const PORT = process.env.PORT || 8080;
const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(cparser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public/scripts")));
app.use(express.urlencoded({extended: false}));
app.use(fileUpload());
app.use(explorerRouter);
app.use(indexRouter);
app.use(loginRouter);
app.use(registerRouter);

new dbinit().initdb();

app.listen(PORT, () => {
    console.log("App listening at: http://localhost:8080/")
})
