var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Portflio = new Schema ({
  _id: { type: Schema.ObjectId, auto: true },
  vendorId:{
         type:Schema.Types.ObjectId,
         ref:"vendorData"
     },
  time:{
    type:Date,
    Default:Date.now()
  },

  imgName:String ,
  desc:String


});

mongoose.model("Portflio",Portflio);
