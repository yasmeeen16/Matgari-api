var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Category = new Schema ({
  _id: { type: Schema.ObjectId, auto: true },
  Ename:String,
  Aname:String,
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
  //package: [{ type: Schema.Types.ObjectId, ref: 'Package' }]
});

mongoose.model("Category",Category);
