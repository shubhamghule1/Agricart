//DECLARATION
var express 		= require('express');
var bodyParser 		= require('body-parser');
var exSession 		= require('express-session');
var cookieParser 	= require('cookie-parser');
var register        = require('./controllers/register');
var login			= require('./controllers/login');
var logout			= require('./controllers/logout');
var adminDashboard  = require('./controllers/adminDashboard');
var userDashboard  = require('./controllers/userDashboard');
var paymentSuccess  = require('./controllers/paymentSuccessful');
var anh             = require('./controllers/adminAddNewFertilizer');

var viewfertilizers      = require('./controllers/viewfertilizers');
var adminAllUsers    = require('./controllers/adminAllUsers');
var adminAllManufacturer    = require('./controllers/adminAllManufacturer');
var adminaddnewuser    = require('./controllers/adminAddNewUser');

var addNewManufacturer= require('./controllers/adminAddNewManufacturer');

var orders        = require('./controllers/adminAllOrders');

var app  			= express();
var port 			= 3000;


//CONFIGURATION
app.set('view engine', 'ejs');

//MIDDLEWARES
app.use(express.static('public'));
app.use(exSession({secret: 'my top secret code', saveUninitialized: true, resave: false, cookie: {maxAge: 3600000 } }));
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
// app.use('/login', login);
app.use('/', login);
app.use('/register', register);
app.use('/assets',express.static('assets'));
app.use('/userdashboard', userDashboard);
app.use('/admindashboard', adminDashboard);
app.use('/logout', logout);
app.use('/addnewmedicine', anh);
// app.use('userDashboard/viewfertilizers', viewfertilizers);
app.use('userDashboard/viewfertilizers', userDashboard);
app.use('/viewfertilizers', viewfertilizers);
app.use('userDashboard/viewfertilizers',express.static('assets'));
app.use('/userdashboard/assets/',express.static('assets'));
app.use('/viewfertilizers',express.static('assets'));
app.use('/ordermed/:id',express.static('assets'));
app.use('/viewfertilizers/edit/:id',express.static('assets'));
app.use('/userDashboard/product/:id', express.static('assets'));
app.use('/allusers', adminAllUsers);

app.use('/userDashboard/:id/checkout/:id', express.static('assets'));
// app.use('/userDashboard/:id/checkout/:id', purchase);

app.use('/paymentsuccessful', express.static('assets'));
app.use('/paymentsuccessful', paymentSuccess);

app.use('/allmanufacturers', adminAllManufacturer);
app.use('/allmanufacturers/edit/:id',express.static('assets'));
app.use('/addnewuser', adminaddnewuser);

app.use('/addnewmanufacturer', addNewManufacturer);
app.use('/orders', orders);
app.use('/orders',express.static('assets'));
app.use('/allusers/edit/:id',express.static('assets'));



//SERVER STARTUP
app.listen(port, ()=>console.log('server started at'+port+"..."));