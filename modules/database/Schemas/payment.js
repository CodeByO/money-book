const mongoose = require('mongoose');
var Schema = mongoose.Schema
const mainPaymentSchema = Schema({
    userId : {type : Schema.Types.ObjectId, ref : 'member'},
    main : {type: String, required : true, trim : true},
    sub : [{type : Schema.Types.ObjectId, ref : 'subPayment'}]
});
const subPaymentSchema = Schema({
    userId : {type : Schema.Types.ObjectId, ref : 'member'},
    sub : {type: String, required : true, trim : true},
    Balance : {type : Number, required : true},
    OutOfList : {type: Boolean, required : true, default:false},
    

})
var MainPayment = mongoose.model('mainPayment',mainPaymentSchema);
var SubPayment = mongoose.model('subPayment',subPaymentSchema);
module.exports = {MainPayment, SubPayment};