/**
 * Created by lenovo-pc on 2017/2/23.
 */
var express = require('express');
var port = process.env.port || 5000;
var bodyParser = require('body-parser');
var path = require('path');
var logger = require('morgan');
var app = express();

var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);

var mongoose = require('mongoose');
var dbUrl = "mongodb://localhost/graduation";
mongoose.connect(dbUrl);

app.set('views','./views/pages');
app.set('view engine','jade');
app.use(express.static(path.join(__dirname,'/public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(cookieParser());
app.use(session({
    secret:'graduation',
    store:new mongoStore({
        url:dbUrl,
        collection:'sessions'
    })
}));

if(app.get('env')==='development'){
    app.set('showStackError',true);
    app.use(logger('dev'));
    app.locals.pretty = true;
    mongoose.set('debug',true);
}

require('./config/routes')(app);
app.locals.moment = require('moment');
app.listen(port);

console.log('success in '+port);

