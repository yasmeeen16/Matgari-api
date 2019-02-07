//Create http server
var express = require('express');

var server = express();
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var expressValidator = require('express-validator');
server.use(expressValidator());
var path = require("path");
//database connection
const CONNECTION_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/Matgary';
mongoose.promise = global.promise;
mongoose.connect(CONNECTION_URI
  ,{ useNewUrlParser: true }
);

const PORT = process.env.PORT || 8090 ;
server.set('views', path.join(__dirname, 'views'));
server.set("view engine","ejs");
server.set("views","./views");
server.use(express.static(path.join(__dirname, 'public')));

var AuthRouts = require('./controller/authClient');
server.use('/authClient',AuthRouts);
require('./Model/clientData');


var AuthRoutsVendor = require('./controller/authVendor');
server.use('/authVendor',AuthRoutsVendor);
require('./Model/vendorData');



var RouteCategory = require('./controller/category');
server.use('/category',RouteCategory);
require('./Model/Category');

var RouteProduct = require('./controller/product');
server.use('/product',RouteProduct);
require('./Model/product');

var RoutesubCategory = require('./controller/subCategory');
server.use('/subcategory',RoutesubCategory);
require('./Model/subCategory');

var RoutePortflio = require('./controller/portflio');
server.use('/portflio',RoutePortflio);
require('./Model/Portflio');

var RoutePortflio = require('./controller/orders');
server.use('/orders',RoutePortflio);
require('./Model/orders');

server.listen(PORT,function(){
  console.log('server listen at port number '+PORT);
});
