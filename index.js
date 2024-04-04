const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const path = require("path");
const cparser = require("cookie-parser");

const PORT = process.env.PORT || 8080;
const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(cparser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: false}));


app.listen(PORT, () => {
    console.log("App listening at: http://localhost:8080/")
})
