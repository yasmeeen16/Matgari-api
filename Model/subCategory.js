var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var subCategory = new Schema ({
  _id: { type: Schema.ObjectId, auto: true },
  catId:{
         type:Schema.ObjectId,
         ref:"Category"
     },
  Aname:String,
  Ename:String,
  img:String,
  offer:{
    AName:String,
    EName:String,
    img:String

  },
  time:{
    type:Date,
    Default:Date.now()
  }
});

mongoose.model("subCategory",subCategory);
