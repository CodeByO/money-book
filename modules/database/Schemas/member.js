const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    userId : {type: String, required : true, unique : true, trim : true},
    password : {type: String, required : true, trim : true},
    name : {type : String, required : true, trim : true},
    age : {type : Number, required : true},
    salt : {type : String , required : true}
},{
    timestamps : true
});

module.exports = mongoose.model('member',memberSchema);