var express = require('express')
var app = express();
var bodyParser = require('body-parser');
const cors = require('cors');
require('./modules/auth/passport')(app)
const db = require('./modules/database/mongo');


let fs = require('fs');


app.use(express.json());
app.use(cors({
    credentials: true
}));
db();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(express.static(__dirname+'/money-book/build'))

app.listen(8081,function(){
    console.log('server start');
})


var login = require('./modules/routes/login');
app.use(login);

var list  = require('./modules/routes/list');
app.use(list);

var category = require('./modules/routes/category');
app.use(category);

var ApiList  = require('./modules/api/list');
app.use(ApiList);

var ApiCategory = require('./modules/api/category');
app.use(ApiCategory);

var ApiPayment = require('./modules/api/payment');
app.use(ApiPayment);

var ApiDayAmount = require('./modules/api/DayAmount');
app.use(ApiDayAmount);

var search = require('./modules/api/search');
app.use(search);

var outoflist = require('./modules/routes/outoflist');
app.use(outoflist);

app.get('*', function(req,res){
    res.sendFile(__dirname + '/money-book/build/index.html')
})
