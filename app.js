const express = require("express");
const path = require("path");
const request = require("request");
const ejsMate = require("ejs-mate");
const mongoose = require('mongoose');
const User= require('./models/user');
const nodemailer= require('nodemailer');
const bodyParser = require('body-parser');


const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


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


  //Need to work here
  // res.send("You will start receiving alerts on "+ email + " for "+ pincode+ " shortly.");

  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'shemar.schamberger1@ethereal.email', // generated ethereal user
      pass: 'wPhc777M4TJgKHMbRT', // generated ethereal password
    },
  });

  const msg ={
    from: '"Vaccine Setu" <vaccinesetuindia@example.com>', // sender address
    to: `${email}`, // list of receivers
    subject: "Registeration Verification", // Subject line
    text:"You will start receiving alerts on "+ email + " for "+ pincode+ " shortly." , // plain text body
    // html: "<b>Hello world?</b>", // html body
  }

  // send mail with defined transport object
  let info = await transporter.sendMail(msg);

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  res.send("We have sent registration verification email on "+ email);

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
