const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const path = require("path");
const cparser = require("cookie-parser");
const routeGuests = require("./routers/route-guests");
const dbinit = require("./config/db");

const PORT = process.env.PORT || 8080;
const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(cparser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: false}));
app.use(routeGuests);

new dbinit().initdb();

app.listen(PORT, () => {
    console.log("App listening at: http://localhost:8080/")
})
