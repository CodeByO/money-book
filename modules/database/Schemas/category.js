const mongoose = require('mongoose');
var Schema = mongoose.Schema
const mainCategorySchema = Schema({
    userId : {type : Schema.Types.ObjectId, ref : 'member'},
    InAndOut : {type : String, required : true},
    main : {type: String, required : true, trim : true},
    sub : [{type : Schema.Types.ObjectId, ref : 'subCateogry'}]
});
const subCategorySchema = Schema({
    userId : {type : Schema.Types.ObjectId, ref : 'member'},
    sub : {type: String, required : true, default:"기타", trim : true},
    OutOfList : {type: Boolean, required : true, default:false},
    

})
var MainCategory = mongoose.model('mainCategory',mainCategorySchema);
var SubCategory = mongoose.model('subCateogry',subCategorySchema);
module.exports = {MainCategory, SubCategory};

