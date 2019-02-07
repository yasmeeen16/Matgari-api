var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var clientData = new Schema ({
  _id: { type: Schema.ObjectId, auto: true },
  name:{type: String , require: true},
  email:{type: String , require: true},
  phone:{type: String , require: true},
  password:{type: String , require: true},
  time:{
    type:Date,
    Default:Date.now()
  }
});
//register model for client
mongoose.model("clientData",clientData);
