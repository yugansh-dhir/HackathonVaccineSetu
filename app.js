const express = require("express");
const path = require("path");
const request = require("request");
const ejsMate = require("ejs-mate");
const mongoose = require('mongoose');
const User= require('./models/user');
const app = express();


mongoose.connect('mongodb://localhost:27017/vaccineHackathon', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

// const express = require("express");
// const path = require("path");
// const request = require("request");
// const ejsMate = require("ejs-mate");
// const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
// const { query } = require("express");
// const mapBoxToken = process.env.MAPBOX_TOKEN;
// const geocoder = mbxGeocoding({ accessToken: mapBoxToken });
// const fetch = require("node-fetch");
// const fs = require("fs-extra");
// const centresLoc = require("./seeds/centres.json");

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.render("search");
});

app.get("/results", function (req, res) {
  var pinQuery = req.query.pincode;
  var dateQuery = req.query.date;
  var gotDate = new Date(dateQuery);
  var fullDate =
    gotDate.getDate() + "-" + gotDate.getMonth() + "-" + gotDate.getFullYear();
  console.log(fullDate);
  var url =
    "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=" +
    pinQuery +
    "&date=" +
    fullDate;
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(body);
      res.render("results", { data: data });
      console.log(data);
      // console.log(body);
    } else {
      res.render("error");
      console.log(error);
    }
  });
});

app.get("/covidUpdates", function (req, res) {
  res.render("tempCovidUpdates");
});

app.get("/vaccineUpdates", function (req, res) {
  res.render("vaccineUpdates");
});

app.use(express.urlencoded({extended:true}));

app.get("/alerts", function (req, res) {
  res.render("alerts");
});

app.post("/alerts",async(req, res)=>{
  const{email, pincode}= req.body;
  const user = new User({
    email,
    pincode
  })
  await user.save();
  
  res.send("You will start receiving alerts on "+ email + " for "+ pincode+ " shortly.");
});

app.get("*", function (req, res) {
  res.redirect("/");
});

app.get("*", function (req, res) {
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, process.env.IP, function () {
  console.log("Vaccine Availabity app is running now!");
});
