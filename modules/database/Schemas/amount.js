const mongoose = require('mongoose');
var Schema = mongoose.Schema
const amountSchema = Schema({
    
    userId :{type : Schema.Types.ObjectId, ref : 'member'},
    Date : {type : String, required : true},
    nowIn : {type : Number, required : true, default : 0},
    nowOut : {type : Number, required : true, default : 0},
    nowAmount : {type : Number, required : true, default : 0},

});


module.exports = mongoose.model('amount',amountSchema);