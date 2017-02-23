let express = require('express');
let passport  = require('passport');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let morgan = require('morgan');
let nconf = require('nconf');
let session = require('express-session');

let bz_router = express.Router({mergeParams:true});
let api = require('./api.js');
let apiRouter = api.api;

let OICStrategy = require('passport-openid-connect').Strategy;
let User = require('passport-openid-connect').User;

const feideAPI = express.Router({mergeParams:true});

nconf.argv()
    .env('__')
    .file({ file: 'config.json' })
    .defaults({
      "session": {
        "secret": "000"
      },
      "dataporten": {
        "enableAuthentication": false
      }
    });


feideAPI.use(session({
  secret: nconf.get('session:secret'),
  resave: false,
  saveUninitialized: false
}));


let oic = new OICStrategy(nconf.get("dataporten"));

passport.use(oic);
passport.serializeUser(OICStrategy.serializeUser)
passport.deserializeUser(OICStrategy.deserializeUser)

feideAPI.use(passport.initialize());
feideAPI.use(passport.session());

feideAPI.get('/login', passport.authenticate('passport-openid-connect', {"successReturnToOrRedirect": "/"}));
feideAPI.get('/callback', passport.authenticate('passport-openid-connect', {"callback": true}),(req,res)=>{
  console.log("User logged in");
  res.redirect('/home');
});

feideAPI.get('/user', (req, res) => {
  console.log("Req user");
  res.json(req.user);
});

module.exports = feideAPI;