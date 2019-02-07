var express = require('express');
var Router = express.Router();
var BodyParser = require('body-parser');
var expressValidato = require('express-validator');
var BodyParserMid = BodyParser.urlencoded();//middle ware to get data from request body
var bcrypt = require('bcrypt');
var mongoose = require("mongoose");
var passwordHash = require('password-hash'); //for generatet hashed password and verifiy
var jwt = require('jsonwebtoken');
require("../Model/vendorData");

var multer = require("multer"); //to upload file
var uploadMid = multer({dest:"./public/imgs"});
var vendorModel = mongoose.model('vendorData');
var path = require('path');
var fs = require('fs');


Router.post('/login',BodyParserMid,function(req,resp){
  var email = req.body.email;
  var password = req.body.password;

  req.checkBody('email','email is empty').notEmpty();
  req.checkBody('email','email is not email').isEmail();
  req.checkBody('password','password is empty').notEmpty();
  let errors = req.validationErrors();
  if(errors){
    return resp.status(409).json({
      message:"enter your data"
    });
  }else{
      vendorModel.findOne({ email: req.body.email }, function(err, vendor) {
          if(err){
            return resp.status(409).json({
              message:"error"
            });
          }
          if(vendor!=null){
            // return resp.status(409).json({
            //   message:"success"
            //});
            console.log(req.body.password);
            console.log(vendor.password);
            if(passwordHash.verify(req.body.password , vendor.password))
                {
                    const jsontoken = jwt.sign({vendor: vendor},'mysecret-key');
                      resp.json({ vendor: vendor, token:jsontoken});

                }else {
                    resp.json([{err:"password not valid"},false]);
                }
          }else{
            return resp.status(409).json({
              message:"vendor not found"
            });
          }
      });
  }
});



Router.post('/register',[BodyParserMid,uploadMid.single('img')],function(req,resp,next){
    vendorModel.findOne({ email: req.body.email }, function(err, vendor) {
        if(vendor){
          return resp.status(409).json({
            message:"email is existed"
          });
        }else{
          var name = req.body.name;
          var email = req.body.email;
          var phone = req.body.phone;
          var img = req.body.img;
          var address = req.body.address;
          var status = req.body.Status;
          var password = req.body.password;
          var confPassword = req.body.confPassword;


          req.checkBody('name','name is empty').notEmpty();
          req.checkBody('email','email is empty').notEmpty();
          req.checkBody('email','email is empty').isEmail();
          req.checkBody('phone','phone is empty').notEmpty();
          req.checkBody('password','password is empty').notEmpty();
          req.checkBody('confPassword','password is not matched').equals(req.body.password);


          let errors = req.validationErrors();
          if(errors){
            console.log('validation error');
          }else{
            //fs.renameSync(req.file.path,req.file.destination+"/"+req.file.originalname);
            console.log(req.file);
            var vendorDataModel = mongoose.model("vendorData");
            var vendor = new vendorDataModel({
              name:req.body.name,
              email:req.body.email,
              phone:req.body.phone,
              password:req.body.password,
              img:req.file.path,
              address:req.body.address,
              Status:req.body.status,
              time:new Date()
            });

            var hashedPassword = passwordHash.generate(req.body.password);
                vendor.password = hashedPassword;
                vendor.save(function(err,doc){
                  if(err){
                    console.log(err);
                  }

                  //console.log(req.file.path);
                  const jsontoken = jwt.sign({vendor: vendor},'mysecret-key');
                        resp.json({ vendor: vendor, token:jsontoken });
                });
          }
        }
    });//end of   clientModel.findOne
});

module.exports=Router;
