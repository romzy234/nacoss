var createError = require('http-errors');
const express = require('express');
// For view 
var path = require('path');
// For FORM input
var bodyParser = require('body-parser');
// Auth
const keys = require('./config/keys/keys');
var session = require('express-session');
var cookieParser = require('cookie-parser');
// Routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//Declearing Express As a APP
const app = express();
//Setting View Engines 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// path for public Url
app.use(express.static(path.join(__dirname, 'public')));
// For Auth
app.use(cookieParser());
app.use(session({secret: "heynacos",
    resave :false,
    saveUninitialized: true,
    cookie : {
        maxAge:(1000 * 60 * 100)
} }));
// Body parser For forms Actions 
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json()); 
//Setting veiw Engine 2
app.use(express.json({limit : '10mb'}));
app.use(express.static('views'));
//Lauching Application
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log('Express server listening on port', port)
  });

//Router and router 
  app.use('/', indexRouter);
  app.use('/admin', usersRouter); 