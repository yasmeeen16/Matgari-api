var express = require('express');
var Router = express.Router();
var BodyParser = require('body-parser');
var expressValidato = require('express-validator');
var BodyParserMid = BodyParser.urlencoded();//middle ware to get data from request body
const path = require('path');
var mongoose = require("mongoose");
// require("../Model/Portflio");
// require("../Model/vendorData");
// require("../Model/orders");
//
//
// var PackageModel = mongoose.model('Package');
// var OrderModel = mongoose.model('orders');
// Router.post('/addOrder',BodyParserMid,function(req,resp,next){
//   var packageId = req.body.packageId;
//   var clientId = req.body.clientId;
//   var phone = req.body.phone;
//
//     req.checkBody('phone','phone is empty').notEmpty();
//     req.checkBody('clientId','clientId is empty').notEmpty();
//     req.checkBody('packageId','packageId is empty').notEmpty();
//
//     let errors = req.validationErrors();
//     if(errors){
//       resp.json(errors);
//     }else{
//       PackageModel.find({_id:req.body.packageId},{vendorId:1},function(err, pack){
//         vendor_Id=pack[0].vendorId;
//           console.log(pack[0].vendorId);
//
//           var myOrder = new OrderModel({
//               clientId: req.body.clientId,
//               phone: req.body.phone,
//               packageId: req.body.packageId,
//               vendorId:pack[0].vendorId,
//             time:new Date()
//           });
//           myOrder.save(function(err,doc){
//             if(err){
//               resp.json(err);
//           }else{
//               resp.json(doc);
//           }
//           });
//       });
//
//     }
// });
// //dynamic routing
// Router.get('/GetOrders/:vendorId',function(req,resp,next){
//     console.log(req.param.vendorId);
//     OrderModel.find({vendorId:req.params.vendorId}, function(err, orders) {
//                       if(err){
//                           resp.json(err);
//                       }else if(orders.length > 0 ){
//                           resp.json({ orders:orders});
//                       }else{
//                           resp.json({ msg: "there is no orders ... "});
//                       }
//                   });
// });
// Router.get('/GetClientOrders/:clientId',function(req,resp,next){
//     console.log(req.param.clientId);
//     OrderModel.find({clientId:req.params.clientId}, function(err, orders) {
//                       if(err){
//                           resp.json(err);
//                       }else if(orders.length > 0 ){
//                           resp.json({ orders:orders});
//                       }else{
//                           resp.json({ msg: "there is no orders ... "});
//                       }
//                   });
// });
module.exports=Router;
