var express = require('express');
var Router = express.Router();
var BodyParser = require('body-parser');
var expressValidato = require('express-validator');
var BodyParserMid = BodyParser.urlencoded();//middle ware to get data from request body
const path = require('path');
var mongoose = require("mongoose");
require("../Model/Portflio");
require("../Model/vendorData");

var multer = require("multer");//to upload file
var uploadMid = multer({dest:"./public/imgs"});
var PortflioModel = mongoose.model('Portflio');

Router.post('/addImageToPortflio',[BodyParserMid,uploadMid.single('img')],function(req,resp,next){

  var desc = req.body.desc;
  var img = req.file.path;
  var vendorId=req.body.vendorId;
  console.log(req.file.path);
  console.log(req.body);

    req.checkBody('desc','desc is empty').notEmpty();

    let errors = req.validationErrors();
    if(errors){
      resp.json(errors);
    }else{
      var myPortflio = new PortflioModel({
        vendorId:req.body.vendorId,
        desc:req.body.desc,
        imgName:req.file.path,
        time:new Date()
      });
      myPortflio.save(function(err,doc){
        if(err){
          resp.json(err);
      }else{
          console.log("saved")
          resp.json(doc);
      }
      });
    }
});
//dynamic routing
Router.get('/GetPortflio/:vendorId',function(req,resp,next){
    console.log(req.param.vendorId);
    PortflioModel.find({vendorId:req.params.vendorId}, function(err, Portflio) {
                      if(err){
                          resp.json(err);
                      }else if(Portflio.length > 0 ){
                          resp.json({ Portflio: Portflio});
                      }else{
                          resp.json({ msg: "This Portflio have no data .."});
                      }
                  });

});
module.exports=Router;
