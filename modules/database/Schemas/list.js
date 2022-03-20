const mongoose = require('mongoose');
var Schema = mongoose.Schema
const listSchema = Schema({
    InAndOut : {type : String, required : true},
    userId :{type : Schema.Types.ObjectId, ref : 'member'},
    listDate : {type : String, required : true},
    listTime : {type : String, required : true},
    mainCategory : {type : Schema.Types.ObjectId, ref : 'mainCategory'},
    subCategory : {type : Schema.Types.ObjectId, ref : 'subCategory'},
    contents : {type : String, required : true, trim : true},
    payment : {type : Schema.Types.ObjectId, ref : 'subPayment'},
    paymentDst : {type : Schema.Types.ObjectId, ref : 'subPayment', default : '0'},
    price : {type : Number, required : true},
    OutOfList : {type : Boolean, required : true, default : false}

});

module.exports = mongoose.model('list',listSchema);;