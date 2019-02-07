var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orders = new Schema ({
  _id: { type: Schema.ObjectId, auto: true },
  clientId:{
         type:Schema.ObjectId,
         ref:"clientData"
     },
  phone:String,
  vendorId:{
    type:Schema.ObjectId,
    ref:"vendorData"
  },
  packageId:{
    type: Schema.ObjectId,
    ref: "Package"
  },
  time:{
    type:Date,
    Default:Date.now()
  }
});

mongoose.model("orders",orders);
