const mongoose = require('mongoose');

const imagesSchema = new mongoose.Schema({
    userId : {type: String, required : true, trim : true},
    name : [{type: String, required : true}],
    path : [{type: String, required : true}]
});

module.exports = mongoose.model('image',imagesSchema);