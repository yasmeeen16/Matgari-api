var express = require('express');
var Router = express.Router();
var BodyParser = require('body-parser');
var expressValidato = require('express-validator');
var BodyParserMid = BodyParser.urlencoded();//middle ware to get data from request body
const path = require('path');
var mongoose = require("mongoose");

require("../Model/Category");

var categoryDataModel = mongoose.model("Category");


var multer = require("multer");//to upload file
var uploadMid = multer({dest:"./public/imgs"});
// Router.get('/addCategory',function(req,resp,next){
//   //resp.json({msg:"add"});
//   resp.render("content/addcatt.ejs");
// });
Router.post('/addCategory',[BodyParserMid,uploadMid.single('img')],function(req,resp,next){

  var Ename = req.body.Ename;
  var Aname = req.body.Aname;
  var img = req.body.img;

      categoryDataModel.find({Ename:req.body.Ename ,Aname:req.body.Aname}, function(err, category) {
                            if(category.length > 0){
                              resp.json({ msg : "duplicate category" });
                            }else{
                              var myCategory = new categoryDataModel({
                                Ename:req.body.Ename,
                                Aname: req.body.Aname,
                                img:req.file.filename,
                                time:new Date()
                              });
                              myCategory.save(function(err,doc){
                                if(err){
                                  resp.json(err);
                              }else{
                                  console.log("saved")
                                  resp.json(doc);
                              }
                              });

                            }

});

});
var categoryModel = mongoose.model("Category");
Router.get('/allCategory',function(req,resp,next){

    categoryModel.find({}, function(err, categories) {
                      resp.render("content/listCat.ejs",{  categories:  categories});
                      //resp.json({  categories:  categories});
                  });

});
module.exports=Router;
